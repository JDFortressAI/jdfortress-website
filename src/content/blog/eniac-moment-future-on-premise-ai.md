---
title: "The ENIAC Moment: Why We're Building for the AI That's Coming"
date: 2026-03-10
excerpt: "A startup just built a chip that runs an AI model at 17,000 tokens per second, using a tenth of the power of a GPU. It's a glimpse at a future that changes everything about how private AI gets deployed — and we think we're building the right things to meet it."
author: "JD Fortress AI"
---

In 1945, ENIAC filled a room the size of a house. It weighed 30 tonnes, consumed 150 kilowatts of power, and required a team of engineers just to keep it operational. It was also, for its moment, genuinely transformative — a demonstration that machines could do things previously thought to require human minds.

Nobody looked at ENIAC and predicted the smartphone. The transistor wasn't obvious from vacuum tubes. And yet the trajectory from one to the other is, in hindsight, almost inevitable: every technology that matters eventually finds its most efficient form. Computing didn't stay room-sized. It became a chip in your pocket, drawing milliwatts, costing pennies.

A startup called Taalas published something this week that we've been thinking about since.

They've built custom silicon — not a general-purpose GPU, but a chip designed from the ground up around a specific AI model. Their first product hard-wires Llama 3.1 8B directly into the silicon, eliminating the divide between memory and compute that underpins most of the complexity and cost in modern AI infrastructure. The results are striking: 17,000 tokens per second per user. That's roughly ten times faster than anything currently available at scale. It consumes a tenth of the power of a comparable GPU system and costs around twenty times less to build.

It runs without liquid cooling, high-bandwidth memory stacks, advanced packaging, or any of the exotic engineering that makes modern AI hardware both impressive and impractical for most deployment contexts.

ENIAC, meet the transistor.

## This isn't a product review — it's a direction signal

We want to be clear about what Taalas has actually built and what it hasn't. Their first chip runs an 8B model — capable and useful, but not on the frontier. The hard-wired architecture trades some flexibility for extraordinary efficiency. They've acknowledged quality trade-offs from aggressive quantisation in their current generation. This is genuinely early-stage technology, and it's right to hold it alongside appropriate caveats.

But the direction it points is not speculative at all.

The history of computation is a history of specialisation. General-purpose hardware solves general problems adequately. Purpose-built hardware solves specific problems extraordinarily well. When the specific problem is important enough — and AI inference is arguably the most important computational workload humanity has ever faced — specialisation finds its moment.

Taalas is not alone. The broader industry is moving the same direction. Groq has been chasing inference efficiency with its Language Processing Units. Cerebras builds wafer-scale chips that eliminate off-chip memory bottlenecks. Apple's Neural Engine, built into every M-series chip, is an early-stage example of the same principle embedded in a consumer device. The trajectory is clear: inference will get faster, cheaper, and smaller.

## What this means for the way we think about our product

We deploy AI privately, on-premises, for regulated UK businesses. Today, that means a piece of hardware — a Mac Studio, or a custom server — sitting quietly in a client's office or server room, running frontier models locally. It means no data leaving the building, no vendor with a legal obligation to [preserve or disclose conversation logs](/blog/chatgpt-discovery-legal-risk), no dependency on a cloud provider's pricing decisions or data governance policies.

The hardware is capable. But it's also bigger, more expensive, and more power-hungry than it needs to be — because the underlying technology hasn't yet found its most efficient form.

Here's the question we ask ourselves: what does this look like in five years, if the trajectory Taalas represents continues?

What if a law firm's entire private AI infrastructure — a model running at thousands of tokens per second, trained on their documents, integrated with their practice management system — fit in something the size of a broadband router? What if it drew less power than a desk lamp? What if the hardware cost a few hundred pounds rather than several thousand?

We don't know exactly how that future arrives. But we believe it arrives. And the firms building the software layer, the client relationships, the data pipelines, and the deployment expertise now are the ones positioned to benefit most when it does.

## The right things, in the right order

There's a version of this moment where we wait — where we say the hardware isn't mature enough, the models aren't good enough, the economics aren't there yet. That version exists, and it's a reasonable position.

We've taken a different one. The clients we're working with today — law firms and [in-house legal teams](/blog/gen-ai-for-in-house-lawyers) handling genuinely sensitive work — aren't waiting for perfect. They want capable, private, and trustworthy now. The hardware available today is good enough to deliver that. What we're building on top of it — the [RAG pipelines](/blog/what-is-rag) over client document libraries, the integrations, the compliance documentation, the institutional knowledge of how these systems behave in legal practice contexts — that compounds over time regardless of what the underlying silicon looks like.

When the Taalas-shaped future arrives, or something like it, we won't need to rebuild from scratch. We'll swap in the better hardware, and everything we've built on top of it gets dramatically more capable overnight.

That's the bet. It feels like a good one.

* * *

*JD Fortress AI builds secure, on-premises AI for regulated UK businesses. We're building for today and for what's coming — get in touch if you'd like to talk about what that could look like for your organisation.*
