---
title: "Cache Rules Everything: A Practical Guide to Prompt Caching for Enterprise AI"
date: 2026-03-13
excerpt: "Part two in our series on context engineering. Prompt caching is the mechanism that makes long-running AI agents economically viable — and breaking it is easier than you think."
author: "JD Fortress AI"
---

In January we wrote about [the context engineering problem at the heart of enterprise RAG](/blog/context-is-not-free) — how the quality and structure of what you put in front of a model determines whether it produces reliable output or noise. That piece was about what to put in context, and why selectivity matters. This one is about the mechanism that enforces the economics of that discipline.

Thariq Shafi, an engineer on Anthropic’s Claude Code team, opened his post on prompt caching with a riff on the old engineering adage: “Cache Rules Everything Around Me.” It’s a deliberately irreverent framing, but the underlying claim is serious. Long-running AI agents — the kind that maintain context across many turns, process large document sets, and handle complex multi-step tasks — are only economically viable because of prompt caching. Without it, every turn of a conversation would reprocess the entire history from scratch. At the token volumes a production agent handles, that cost makes most serious applications financially impossible to run.

Shafi’s disclosure was striking not because the technology is obscure, but because of what it reveals about how production AI actually works. Drops in cache hit rate are treated as production incidents at Anthropic, triggering severity alerts and engineering response. Not degraded model quality. Not hallucination rates. The metric that pages engineers at three in the morning is how often the prefix cache is reused.

Understanding why — and how to avoid breaking it — is the practical prerequisite for building anything that runs at scale.

## How prefix matching actually works

Prompt caching is a prefix match. When a request arrives at the API, everything from the start of the request up to a designated breakpoint gets hashed and stored. If the next request carries an identical prefix up to that point, the cached computation is reused. The model doesn’t reprocess those tokens — it picks up from the cache and continues.

That sounds straightforward. The fragility is in what “identical” means. One character difference anywhere in the prefix — a changed timestamp, a tool definition that appeared in a different order, a parameter that was updated silently — and the entire cache from that point onwards is invalidated. Full reprocessing at standard token prices, for every token that follows the break.

The Claude Code team describe this as “surprisingly fragile,” and the incidents they cite from their own history illustrate why. A detailed timestamp embedded in the static system prompt. Tool definitions being shuffled in non-deterministic order. A parameter update in one tool definition. Each of these caused silent cache misses across the entire product before anyone diagnosed the cause.

Silently is the key word. The system still produces output. The model still answers. The only visible signal is the cost and latency going up — and unless you’re monitoring cache hit rates specifically, those can look like ordinary variance for days.

The economics make this worth caring about. On Claude Sonnet, cached tokens cost $0.30 per million. Uncached tokens cost $3.00. A tenfold difference. Consider a 50-turn session with a 200,000-token context: without caching, each turn costs roughly $0.60 in input tokens alone; with caching, subsequent turns drop to around $0.06. Across fifty turns, that’s the difference between $30 and $3.60 — for a single session. Multiply across millions of users and the arithmetic determines whether the product can exist at its current price. This is why the Claude Code team monitors cache performance with the same intensity it watches uptime.

## The four rules

Thariq’s post distils the Claude Code team’s hard-won practice into a small number of rules. They’re worth stating plainly.

**Static content goes first, dynamic content goes last.** The optimal order for a production AI system is: static system prompt and tool definitions first, then any content that varies per-project, then session-level context, then the actual conversation. Everything early in the prefix is shared across as many requests as possible. Everything variable comes at the end, where its changes affect only the tokens that follow it. This structure is what allows different users, different sessions, and different turns to share cached prefixes at each level of granularity.

**Update via messages, not system prompt edits.** Suppose the model needs to know the current time, or the user has just modified a file, or some external state has changed. The instinct is to update the system prompt. Don’t. Editing the system prompt breaks the cache at the point of the edit, invalidating everything downstream. The correct approach is to inject the update into the next user message — the Claude Code team uses a `<system-reminder>` tag in the user turn — so the update reaches the model without touching the cached prefix.

**Never add or remove tools mid-session.** Tool definitions sit in the cached prefix. Adding or removing a tool mid-conversation changes the prefix, which invalidates the cache for the rest of the session. This feels counterintuitive — it seems efficient to only give the model the tools it currently needs — but the cost of the cache miss outweighs any benefit from a cleaner tool list. Keep the full tool set consistent across every request in a session.

**Never switch models mid-session.** Prompt caches are model-specific. A hundred thousand tokens of cached context built up with Opus cannot be transferred to Haiku. Switching models mid-session means rebuilding the cache from scratch on the new model — which may well cost more than simply having the original model answer the question. If you genuinely need a different model for a subtask, the correct approach is a subagent: the primary model prepares a focused handoff message and the subtask runs as a separate session with its own cache.

## Designing features around the constraint

The most instructive part of Shafi’s account isn’t the rules themselves — it’s the examples of features that were designed around the caching constraint rather than against it.

Plan Mode restricts the model to read-only operations. The instinct is to implement this by swapping the tool set: when the user enters plan mode, strip out write tools; when they exit, restore them. Clean, conceptually simple. Also catastrophically expensive from a caching perspective, because every mode transition would invalidate the cached prefix and discard whatever context had built up. The actual implementation keeps every tool present in every request, always. Plan Mode is itself a tool — EnterPlanMode and ExitPlanMode are callable functions that inject a mode constraint via message, not by altering the tool definitions. The prefix stays identical across mode transitions. Cache survives intact. And because EnterPlanMode is a function the model can call itself, Claude Code sometimes enters plan mode autonomously when it detects a situation that warrants more careful handling — a useful emergent behaviour that exists only because the cache-safe design forced a more disciplined architecture.

The same logic governs tool loading. Claude Code can have dozens of MCP tools loaded at once, and including all their full schema definitions in every request would mean thousands of tokens of static definitions sitting between the system prompt and the first user message — expensive to build, and impossible to remove mid-session without breaking the cache. The solution is lightweight stubs: placeholder entries with just a tool name and a deferred-loading flag. The model can call a ToolSearch function to retrieve the full schema when it actually needs it. The stubs sit in the prefix, unchanging, in the same order, every request.

Compaction — what happens when a conversation outgrows the context window — posed the same problem in a different form. A naive implementation summarises the conversation history using a separate API call with a different system prompt and no tools. Completely different prefix: full reprocessing cost for the entire conversation, every time. The cache-safe version uses the exact same system prompt, tool definitions, and conversation prefix as the parent request, appending the summarisation instruction as the final user message. From the API’s perspective it looks nearly identical to the previous request. Only the compaction prompt itself is new.

Each of these — Plan Mode, tool stubs, compaction — arrived at a better design by asking the same question: how do we achieve this without touching the prefix?

## What this means if you’re building private AI

Peak Ji, who founded the Manus AI agent before its acquisition by Meta, arrived at the same conclusions independently. He described the KV-cache hit rate as “the single most important metric for a production-stage AI agent,” noting that Manus processes input and output tokens at roughly a 100:1 ratio — meaning 99% of every request’s cost sits in input processing. Ji rebuilt the Manus agent framework four times, each version discarded after hitting cost walls that made the product unviable. The third or fourth rebuild was the one that finally treated cache efficiency as an architectural constraint from the start.

The convergence is significant. Anthropic and Manus are different products, different user bases, different underlying models in some cases. They arrived at identical rules because the constraint is the same.

For enterprises running AI on their own hardware, the arithmetic is the same even without per-token pricing. Whether you’re paying $3.00 per million tokens to a cloud provider or burning GPU cycles on your own H100s, a cache miss means your hardware is reprocessing the same system prompt, the same document set, the same conversation history, on every single turn. On local inference, cache hits reduce time-to-first-token and free up GPU capacity for other requests. A pipeline that runs efficiently at 500 queries a day can collapse at 5,000 if the cache hit rate drops from 85% to 50% — not because the model got worse, but because the prefix stopped being stable.

When we design [RAG pipelines](/blog/what-is-rag) and agent systems for clients, the four rules above are baked into the architecture before the first line of code is written. The ordering of context layers, the handling of state updates, the management of tools across a session — these are decisions that are very expensive to undo later. The lesson from both the Claude Code team and the Manus team is the same: design around the prefix from day one, or rebuild later.

Monitor your cache hit rate like you monitor uptime. It is the single most informative signal about whether your AI system is running as designed. A few percentage points of cache miss rate, compounding across millions of requests, translates into infrastructure spend and user-facing latency in ways that are easy to miss until they become impossible to ignore.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you’re exploring always-on, private AI teammates, get in touch for a confidential discussion — no pitch, just practical talk.*
