---
title: "Cache Rules Everything: A Practical Guide to Prompt Caching for Enterprise AI"
date: 2026-03-13
excerpt: "Part two in our series on context engineering. Prompt caching is the mechanism that makes long-running AI agents economically viable — and breaking it is easier than you think."
author: "JD Fortress AI"
---

In January we wrote about [the context engineering problem at the heart of enterprise RAG](/blog/context-is-not-free) — how the quality and structure of what you put in front of a model determines whether it produces reliable output or noise. That piece was about what to put in context, and why selectivity matters. This one is about the mechanism that enforces the economics of that discipline.

Thariq Shafi, an engineer on Anthropic’s Claude Code team, opened his post on prompt caching with a riff on the old engineering adage: “Cache Rules Everything Around Me.” It’s a deliberately irreverent framing, but the underlying claim is serious. Long-running AI agents — the kind that maintain context across many turns, process large document sets, and handle complex multi-step tasks — are only economically viable because of prompt caching. Without it, every turn of a conversation would reprocess the entire history from scratch. At the token volumes a production agent handles, that cost makes most serious applications financially impossible to run.

Understanding why — and more importantly, understanding how to avoid breaking the cache — is the practical prerequisite for building anything that runs at scale.

## How prefix matching actually works

Prompt caching is a prefix match. When a request arrives at the API, everything from the start of the request up to a designated breakpoint gets hashed and stored. If the next request carries an identical prefix up to that point, the cached computation is reused. The model doesn’t reprocess those tokens — it picks up from the cache and continues.

That sounds straightforward. The fragility is in what “identical” means. One character difference anywhere in the prefix — a changed timestamp, a tool definition that appeared in a different order, a parameter that was updated silently — and the entire cache from that point onwards is invalidated. Full reprocessing at standard token prices, for every token that follows the break.

The Claude Code team describe this as “surprisingly fragile,” and the incidents they cite from their own history illustrate why. A detailed timestamp embedded in the static system prompt. Tool definitions being shuffled in non-deterministic order. A parameter update in one tool definition. Each of these caused silent cache misses across the entire product before anyone diagnosed the cause.

Silently is the key word. The system still produces output. The model still answers. The only visible signal is the cost and latency going up, and unless you’re monitoring cache hit rates specifically, those can look like ordinary variance for days.

## The four rules

Thariq’s post distils the Claude Code team’s hard-won practice into a small number of rules. They’re worth stating plainly.

**Static content goes first, dynamic content goes last.** The optimal order for a production AI system is: static system prompt and tool definitions first, then any content that varies per-project, then session-level context, then the actual conversation. Everything early in the prefix is shared across as many requests as possible. Everything variable comes at the end, where its changes affect only the tokens that follow it. This structure is what allows different users, different sessions, and different turns to share cached prefixes at each level of granularity.

**Update via messages, not system prompt edits.** Suppose the model needs to know the current time, or the user has just modified a file, or some external state has changed. The instinct is to update the system prompt. Don’t. Editing the system prompt breaks the cache at the point of the edit, invalidating everything downstream. The correct approach is to inject the update into the next user message — the Claude Code team uses a `<system-reminder>` tag in the user turn — so the update reaches the model without touching the cached prefix.

**Never add or remove tools mid-session.** Tool definitions sit in the cached prefix. Adding or removing a tool mid-conversation changes the prefix, which invalidates the cache for the rest of the session. This feels counterintuitive — it seems efficient to only give the model the tools it currently needs — but the cost of the cache miss outweighs any benefit from a cleaner tool list. Keep the full tool set consistent across every request in a session.

**Never switch models mid-session.** Prompt caches are model-specific. A hundred thousand tokens of cached context built up with Opus cannot be transferred to Haiku. Switching models mid-session means rebuilding the cache from scratch on the new model — which may well cost more than simply having the original model answer the question. If you genuinely need a different model for a subtask, the correct approach is a subagent: the primary model prepares a focused handoff message and the subtask runs as a separate session with its own cache.

## Designing features around the constraint

The most instructive lesson from the Claude Code team isn’t the rules themselves — it’s the example of Plan Mode, which shows what it looks like to design a feature around the caching constraint rather than against it.

Plan Mode restricts the model to read-only operations. The instinct is to implement this by swapping the tool set: when the user enters plan mode, strip out write tools; when they exit, restore them. Clean, conceptually simple. Also catastrophically expensive from a caching perspective, because every mode transition would invalidate the cached prefix and discard whatever context had built up.

The actual implementation keeps every tool present in every request, always. Plan Mode is itself a tool — EnterPlanMode and ExitPlanMode are callable functions that inject a mode constraint via message, not by altering the tool definitions. The prefix stays identical across mode transitions. Cache survives intact.

The secondary consequence is even more interesting: because EnterPlanMode is a function the model can call itself, Claude Code sometimes enters plan mode autonomously when it detects a situation that warrants more careful handling. A behaviour that exists to solve a caching problem ends up creating a useful emergent capability. This is what good architectural constraint looks like in practice — it forces you into a design that turns out to be better than the obvious approach on multiple dimensions.

## What this means if you’re building private AI

The economics of prompt caching [apply equally to on-premise deployments](/blog/architecture-is-economics). Whether you’re paying per token to a cloud provider or consuming GPU cycles on your own hardware, the compute you save through cache reuse is real. On local inference, cache hits reduce time-to-first-token and free up GPU capacity for other requests. At scale, the difference between a well-structured prompt and one that breaks the cache on every turn is the difference between a system that handles your query volume comfortably and one that requires double the hardware to compensate.

When we design [RAG pipelines](/blog/what-is-rag) and agent systems for clients, the four rules above — and the underlying discipline they represent — are baked into the architecture from the start. It’s not configuration you add later. The ordering of context layers, the handling of state updates, the management of tools across a session — these decisions are made before implementation begins, because undoing them later means rebuilding the system.

The specific lesson from Claude Code is worth carrying forward: monitor your cache hit rate like you monitor uptime. It is the single most informative signal about whether your AI system is running as designed. A few percentage points of cache miss rate, spread across millions of requests, translates into infrastructure spend and user-facing latency in ways that compound quickly. Treat it accordingly.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you’re exploring always-on, private AI teammates, get in touch for a confidential discussion — no pitch, just practical talk.*
