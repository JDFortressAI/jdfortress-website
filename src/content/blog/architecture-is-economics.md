---
title: "Architecture Is Economics: What Anthropic's Engineering Diary Reveals About Production AI"
date: 2026-03-10
excerpt: "Anthropic's Claude Code team revealed that prompt caching — not model capability — drove every major architectural decision. The implications for enterprises building or buying AI systems are more practical than they might appear."
author: "JD Fortress AI"
---

Earlier this month, Thariq Shafi, an engineer on Anthropic’s Claude Code team, published one of the more candid pieces of engineering writing to come out of the AI industry in a while. The post wasn’t about model capability, training data, or benchmark scores. It was about prompt caching — and how the constraints of a single API mechanism shaped every significant design decision in one of the world’s most-used AI agents.

The disclosure was striking not because the technology is obscure, but because of what it reveals about how production AI actually works. The headline finding: drops in cache hit rate are treated as production incidents at Anthropic, triggering severity alerts and engineering response. Not degraded model quality. Not hallucination rates. The metric that pages engineers at three in the morning is how often the prefix cache is reused.

For anyone evaluating or deploying enterprise AI systems, that’s worth sitting with.

## The ten-to-one cost gap

Prompt caching works through prefix matching. When a model receives a request, everything up to a designated breakpoint gets hashed and stored. The next request that carries an identical prefix reuses that cached computation instead of reprocessing it from scratch. The economics are not subtle: on Claude Sonnet, cached tokens cost $0.30 per million. Uncached tokens cost $3.00. A tenfold difference.

That gap explains why the Claude Code team treats cache performance like uptime. Consider a 50-turn session with a 200,000-token context. Without caching, each turn costs roughly $0.60 in input tokens alone. With caching, subsequent turns drop to around $0.06. Across fifty turns, that’s the difference between $30 and $3.60 — for a single session. Multiply across millions of users and the arithmetic determines whether the product can exist at its current price.

Peak Ji, who founded the Manus AI agent before its acquisition by Meta, arrived at the same conclusion independently. He described the KV-cache hit rate as “the single most important metric for a production-stage AI agent,” noting that Manus processes input and output tokens at a roughly 100:1 ratio — meaning 99% of every request’s cost sits in input processing. Ji rebuilt the Manus agent framework four times, each version discarded after hitting cost walls that made the product unviable. The third or fourth rebuild was the one that finally treated cache efficiency as an architectural constraint rather than a tuning problem.

## How the constraint shapes everything downstream

The fragility of prefix matching is what forces the discipline. One character difference — anywhere in the prefix — invalidates the entire cache for everything that follows. The Claude Code team found this out through hard experience: a detailed timestamp in the system prompt, or non-deterministic tool ordering across requests, was silently killing cache hit rates across the entire product before anyone noticed.

The architectural response is rigid by design. Static content goes first in every request: system prompt, tool definitions, project configuration. Variable content — the actual conversation — sits at the end. This ordering is non-negotiable. Anything that introduces variability into the prefix kills the cache.

What makes this interesting from an engineering standpoint is how the constraint propagates into feature design. Consider plan mode in Claude Code, which restricts the model to read-only operations. The obvious implementation would be to swap out the tool definitions — strip write permissions when the user enters plan mode, restore them when they exit. That would work fine functionally. It would also blow the cache on every transition, discarding potentially hundreds of thousands of tokens of cached context.

The actual implementation keeps every tool present in every request. Plan mode is itself a tool — EnterPlanMode and ExitPlanMode are callable functions. When the user toggles the mode, a message is injected telling the model to restrict itself, but the tool definitions never change. The prefix stays intact. As a side effect, because EnterPlanMode is a function the model can call itself, Claude Code occasionally drops into plan mode autonomously when it encounters a hard problem — a behaviour that emerges naturally from an architecture that was designed around a different constraint entirely.

The same principle governs tool loading. Claude Code supports dozens of MCP tools. Loading all of them in every request means thousands of tokens of schema definitions sitting between the system prompt and the first user message. But removing tools mid-conversation alters the prefix and invalidates the cache. The solution is lightweight stubs — placeholder entries with just a tool name and a deferred-loading flag — which the model can expand via a search call when it actually needs a full schema. The stubs sit in the prefix, unchanging, in the same order, every request.

Compaction — what happens when a conversation outgrows the context window — required the most careful handling. A naive implementation summarises the conversation history using a separate API call with a different system prompt and no tools. Completely different prefix, full reprocessing cost for the entire conversation, every time. The cache-safe version uses the exact same system prompt, tool definitions, and conversation prefix as the parent request, appending the summarisation instruction as the final user message. From the API’s perspective it looks nearly identical to the previous request. Only the summarisation prompt itself is new.

## The same arithmetic applies on your hardware

Enterprise deployments running on-premises don’t pay per API token. But the economic logic is identical.

When an on-premise model processes a 200,000-token context without cache reuse, the GPU performs roughly the same computation regardless of whether the tokens are arriving via API or local inference. A cache miss means your hardware is reprocessing the same system prompt, the same document set, the same conversation history, on every turn. At query volumes that matter — tens of thousands of interactions per month, [across a legal or financial workload](/blog/context-is-not-free) where context windows are typically large — the difference between a well-designed cache-aware pipeline and a naive one shows up directly in GPU utilisation, response latency, and the hardware provisioning decisions that determine whether the deployment is economically sustainable.

This is why Ji’s comment about rebuilding the framework four times deserves attention. The first three versions weren’t inadequate because they used the wrong model. They were inadequate because the architectural decisions that determine inference economics — how context is structured, in what order, with what state management — hadn’t been thought through before the cost walls appeared.

For [enterprises in regulated sectors](/blog/why-law-firms-cant-afford-cloud-ai) deploying private AI, those cost walls are real. Hardware is finite. Latency is visible to users. A pipeline that runs efficiently at 500 queries a day can collapse at 5,000 if the cache hit rate drops from 85% to 50%.

## What “engineered from day one” actually means

The phrase we use with clients — “engineered from day one for production” — refers precisely to this kind of architectural thinking. Not benchmark results. Not which model version we’re running. The decisions about how context is structured, how tools are loaded, how state transitions are handled, how the prefix is kept stable across the lifetime of a session: these are what determine whether an AI system is economically viable over a three-year deployment rather than just impressive during a proof of concept.

Anthropic’s disclosure is unusual in its candour. Most AI product marketing focuses on capability. What the Claude Code team described is something more useful for anyone actually building or buying these systems: the constraints that separate systems that work in production from systems that look like they work in a demo.

The metric that pages engineers at three in the morning, it turns out, has nothing to do with model capability. It’s whether the prefix is still intact.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you’re exploring always-on, private AI teammates, get in touch for a confidential discussion — no pitch, just practical talk.*
