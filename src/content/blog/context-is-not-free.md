---
title: "Context Is Not Free: The Engineering Problem at the Heart of Enterprise RAG"
date: 2026-01-13
excerpt: "Every time context windows grow larger, someone declares RAG obsolete. They're wrong - and the research explains exactly why dumping everything into a model's context is a costly mistake."
author: "JD Fortress AI"
---

Every few months, a new model arrives with a dramatically larger context window, and the same debate restarts: is RAG dead? When Llama 4 Scout launched with a ten-million-token context window, the argument went roughly like this - if you can fit your entire document library into a single prompt, why bother with retrieval at all? Just throw everything in and let the model sort it out.

It's a tempting position. It's also wrong, and the reason matters for anyone building AI systems that need to be reliable.

The core problem isn't storage - it's signal quality. A model's context window is not a hard drive. Every token in the context influences every token in the output. The larger the context, the more opportunity for noise, contradiction, and irrelevance to shape the response. Drew Breunig, writing on his research blog, put it plainly: treat your context like a junk drawer, and the junk will influence your response. This isn't opinion - it's a pattern the research community has been documenting with increasing rigour.

## Four ways context fails

Breunig's taxonomy of context failures is worth knowing, because each failure mode shows up in production systems in ways that are often misattributed to the underlying model.

**Context poisoning** is the most insidious. When a hallucination or factual error enters the context - from a badly-retrieved document, a malformed data source, or a prior model output - it gets referenced and reinforced in every subsequent response. The model doesn't flag the error; it builds on it. In a legal or financial context, that compounding effect can carry a system from a minor retrieval mistake to a confidently-stated wrong conclusion.

**Context distraction** is well-documented: as the context grows, models over-index on what's in front of them and rely less on what they learned during training. A team building a Gemini 2.5 Pro agent for a game environment observed the effect empirically - beyond roughly 100,000 tokens, the agent stopped synthesising novel plans and started repeating actions from its own history. Gemini 2.5 Pro supports over one million tokens. The failure began at a tenth of its theoretical limit.

**Context confusion** is what happens when the context contains accurate but irrelevant information - the model finds correlations that aren't useful and generates responses that are technically grounded but practically wrong. And **context clash** occurs when accumulated information contradicts itself: two policy documents that were updated at different times, or tool definitions that overlap in ways the model can't resolve cleanly.

These aren't edge cases. They're the normal failure modes of systems that haven't been engineered to manage context deliberately.

## The engineering response

There is a developed toolkit for handling these problems - and the research numbers behind each approach are worth understanding if you're evaluating AI systems for serious work.

Selective retrieval ([RAG in its proper sense](/blog/what-is-rag)) remains foundational. The argument that bigger context windows make retrieval obsolete misunderstands what retrieval is for: it's not about fitting more in, it's about keeping irrelevant material out. A paper examining tool selection - a closely analogous problem - found that above thirty tool definitions in a prompt, performance begins degrading due to overlap and confusion. Above one hundred, failure was near-guaranteed. Applying retrieval techniques to select only the relevant tools improved accuracy by as much as 3× and yielded speed gains of 77%.

Multi-agent architectures handle a related problem by isolating work into separate context threads. Rather than one agent accumulating an ever-growing context as it works through a complex task, subtasks are spun out to specialised agents, each working with a clean, focused context. Anthropic's internal evaluation of this approach found that a multi-agent research system outperformed a single-agent setup running the same underlying model by 90.2% on their benchmark. The gain isn't from more compute - it's from better information hygiene.

Context pruning addresses bloat directly. Tools like Provence, a 1.75 GB open-source pruner, can assess a document against a specific query and strip out irrelevant content before it reaches the model. In one example, Provence reduced a long reference document by 95% while retaining the passages that actually answered the question. For a system processing thousands of queries against large knowledge bases, the compound effect on quality - and on inference cost - is significant.

## What this means if you're running AI in a regulated environment

For enterprises in [legal, financial, or healthcare settings](/blog/why-law-firms-cant-afford-cloud-ai), context quality is not just a performance issue — it's a reliability and accountability issue. A RAG system that produces a confident, hallucinated legal summary because a stale document crept into its context isn't just inaccurate; it's [a liability](/blog/ai-third-party-privilege-ruling). The model doesn't know it's wrong. Neither will the user who reads the output without the domain expertise to question it.

This is why the architecture of a RAG pipeline matters far more than the size of the context window it uses. The choice of retrieval strategy, the handling of conflicting documents, the pruning of outdated content, the isolation of task-specific contexts from one another - these are engineering decisions that determine whether the system is trustworthy in practice, not just impressive in a demo.

When we build RAG pipelines for clients, [context management sits at the centre of every design decision](/blog/architecture-is-economics). Not because it's technically interesting - though it is - but because the organisations we work with need to be able to rely on the output. A system that sometimes produces excellent answers and occasionally compounds a retrieval error into something worse is not a system that can be trusted with client work, regulatory submissions, or anything where the cost of a confident wrong answer is high.

The context window is a tool. How you fill it is the work.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you're exploring always-on, private AI teammates, get in touch for a confidential discussion - no pitch, just practical talk.*
