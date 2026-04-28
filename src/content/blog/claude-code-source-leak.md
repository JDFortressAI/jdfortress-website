---
title: "Accidentally More Open Than OpenAI"
date: 2026-04-28
excerpt: "A missing .npmignore entry in Anthropic’s npm package accidentally published 512,000 lines of Claude Code’s source. Within hours, the community had forked it 41,500 times and declared Anthropic more open than OpenAI."
author: "JD Fortress AI"
---

It took a missing line in a build config. Anthropic ships Claude Code via npm — the standard package registry for Node and TypeScript projects — and on 31 March 2026, version 2.1.88 of the `@anthropic-ai/claude-code` package arrived with a 59.8 MB source map file that had no business being there. Source maps are debugging artefacts, meant to stitch bundled code back to readable source on a developer’s own machine. Someone forgot to add `*.map` to the `.npmignore` file.

By 4:23 AM Eastern time, Chaofan Shou — an intern at Solayer Labs — had spotted the exposure, posted a direct download link on X, and watched it accumulate 21 million views. The source map also referenced a zip archive hosted on Anthropic’s Cloudflare R2 storage bucket, publicly accessible to anyone with the URL. Extraction required no hacking ability: one npm command, one untar, one read. By the time Anthropic pulled the package, the code had been forked 41,500 times on GitHub. A clean-room rewrite built from the leak hit 50,000 stars in under two hours — reportedly the fastest-growing repository in GitHub’s history. The community’s verdict landed swiftly: Anthropic had, accidentally, become more open than OpenAI. It was also their second unintended disclosure in a week — a draft model spec had leaked just days before.

## What a missing config file actually contained

The most significant finds across the 1,900-file codebase:

**KAIROS.** Referenced over 150 times, KAIROS is an unreleased autonomous daemon mode — a persistent background agent receiving periodic `<tick>` prompts, maintaining append-only logs, and subscribing to GitHub webhooks. Its `autoDream` subagent consolidates memory while the user is idle. A companion feature, ULTRAPLAN, offloads complex planning to a cloud Opus 4.6 session with up to thirty minutes of think time.

**Self-Healing Memory.** The memory architecture that makes long agentic sessions reliable is now fully documented. MEMORY.md acts as a lightweight index of pointers — roughly 150 characters per line — loaded permanently into context. It stores locations, not data. Actual project knowledge lives in topic files fetched on demand. Raw session transcripts are never replayed in full; they are grep’d for specific identifiers. A write discipline rule prevents recording until a file write succeeds, stopping context pollution from failures.

**Anti-distillation.** Two mechanisms try to frustrate competitor model training: one injects decoy tool definitions into the system prompt to poison training datasets built from API traffic; the other cryptographically summarises the assistant’s reasoning chains so scrapers receive only summaries. Both are feature-flagged and, developers quickly noted, not hard to bypass.

**Undercover mode.** A 90-line file called `undercover.ts` injects a system prompt instructing Claude to never identify itself as an AI and to strip all `Co-Authored-By` attribution when contributing to external repositories. The mode activates for Anthropic employees and specific enterprise accounts.

**Operational embarrassments.** Internal model codenames are now public: Capybara maps to Claude 4.6, Fennec to Opus 4.6, and Numbat to an unreleased model. An internal benchmark shows Capybara v8 has a 29-30% false claims rate, a significant regression from 16.7% in v4. A bug-fix comment casually mentions 250,000 wasted API calls per day from autocompact failures. And the codebase detects user frustration via a regex matching swear words — a detail that drew considerable mockery given the company’s frontier AI budget.

## What this means for local models

The community’s reaction to the Self-Healing Memory architecture and KAIROS was immediate and practical: people started porting both to work with open-weight local models. Within hours, r/LocalLLaMA had threads demonstrating multi-agent orchestration built on the leaked patterns, running entirely offline. The architectural blueprint — pointer-based memory, [on-demand retrieval](/blog/what-is-rag), write discipline, background consolidation — is model-agnostic. It works with Llama, Gemma, Mistral, or anything with sufficient context capacity.

The anti-distillation mechanisms themselves confirm what Anthropic clearly believes: the patterns are distillable. The architecture is the product, not just the model. A capable local model running these patterns will behave very differently from the same model running without them.

There is also something instructive in the hallucination regression data. Capybara v8 is *less* accurate on factual claims than v4 — frontier capability does not advance uniformly. Architecture, not just weights, is what keeps output quality consistent. The [context engineering principles](/blog/context-is-not-free) we have described here since January are now Anthropic’s own published record of how they solve the same problem.

## What it means for private deployments

KAIROS and ULTRAPLAN point clearly at where enterprise AI is heading: persistent, always-on agents with long-horizon planning and background memory consolidation. That is exactly the trajectory we design for at JD Fortress AI — with the constraint that none of it touches a public cloud endpoint.

Anthropic accidentally exposed their architecture because they stored source in a Cloudflare R2 bucket publicly accessible by URL — a convenience of cloud infrastructure. On-premises deployments have no such bucket, no source maps pointing to storage anyone can reach. The data, the code, and the logic live on hardware the client controls, on a network that does not route to the public internet. KAIROS-style agents running there cannot accidentally publish their internals to npm.

Local models will become substantially more capable over the coming months — not because of new weights, but because they will be running inside architectures that were, until this week, Anthropic’s private IP. That is good news for everyone building private AI. It is also, we think, entirely consistent with what we have been building toward all along.

* * *

*JD Fortress AI deploys secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you’re thinking about what always-on, private AI agents look like in your organisation, get in touch — no pitch, just a practical conversation.*
