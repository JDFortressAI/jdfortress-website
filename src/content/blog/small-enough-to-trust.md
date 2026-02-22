---
title: "Small Enough to Trust: What NanoClaw Gets Right About Private AI"
date: 2026-03-10
excerpt: "Most enterprise AI is a black box you're asked to simply trust. A project called NanoClaw takes a different view - and it points toward something important about how serious AI deployments should be built."
author: "JD Fortress AI"
---

There's a tension at the heart of enterprise software that rarely gets named directly. Vendors add features because features are how you justify a price increase and win deals. Buyers accept features because a longer spec sheet feels like reduced risk. The result, across decades of enterprise technology, is systems that are vastly more capable on paper than any single organisation needs - and vastly more opaque than any IT team can confidently audit. For most categories of software, the trade-off is acceptable. For AI systems that have access to your most sensitive data, it isn't.

A project in the open-source AI community has been making this argument more concisely than anyone else. NanoClaw, built by developer Gabriel C. and quietly gaining serious attention - it was recently featured on Docker's engineering blog - takes direct aim at the complexity trap. Its README opens with a pointed observation: its better-known counterpart runs 52 modules, 8 configuration management files, and 45-plus dependencies. NanoClaw delivers the same core functionality in roughly 500 lines of code. A codebase, the author notes, you can understand in eight minutes.

That's not a boast about minimalism for its own sake. It's a security claim.

## Security by isolation, not by policy

The conventional approach to securing AI systems is application-level: allowlists that restrict what the agent can do, pairing codes that control who can interact with it, permission tiers that govern which features are accessible. These are reasonable controls. They are also software controls - which means they live in the same process as everything else, sharing the same memory, subject to the same bugs and edge cases.

NanoClaw takes a different approach. Agents run in actual Linux containers - OS-level isolation, not application-level checks. The agent can only see what has been explicitly mounted into its environment. Bash access, which sounds alarming, is safe because the commands execute inside the container, not on the host machine. The security model isn't "we've written rules that prevent bad things" - it's "the bad things physically cannot reach the data they'd need to cause harm."

For organisations in regulated sectors - law firms, financial services, healthcare - this distinction matters enormously. [Application-level security can be circumvented](/blog/notebooklm-lawyer-lockout-warning). Architectural security requires defeating the architecture. When a client asks us "how do we know the AI can't access things it shouldn't?", an answer grounded in OS-level isolation is a fundamentally different conversation from one grounded in permission settings.

## A system that grows where you need it

The other half of NanoClaw's philosophy - and the part we find most compelling - is what it calls skills over features.

Most software platforms grow by addition. The vendor ships updates, capabilities accumulate, and your installation gradually becomes a superset of what you actually use. The modules you don't use still exist, still run, still represent potential exposure. The configuration options you don't touch still need to be understood by whoever is responsible for keeping the system secure.

NanoClaw inverts this. The base system is deliberately minimal. When you need a new capability - Gmail integration, a new communication channel, scheduled briefings - you add a skill: a set of instructions that transforms your installation to include exactly that capability. Not a toggle in a settings panel. An actual change to the code, scoped precisely to what you need, that you can read and understand before it goes live.

The practical implication for a business is significant. A deployment that starts with document review and later needs to add regulatory compliance queries, or cross-reference supplier contracts, or monitor a specific set of public filings - each of those additions is deliberate, auditable, and reversible. The system grows with the business's actual needs rather than arriving pre-loaded with capabilities that may or may not be relevant. There's no inherited feature set to worry about. There's no "we're not sure exactly what that module does" answer to give an auditor.

## The harness matters as much as the model

One line in NanoClaw's README deserves to be quoted in full: "A bad harness makes even smart models seem dumb, a good harness gives them superpowers."

This is the insight that separates thoughtful AI deployment from plugging an API key into a generic interface and measuring the results. The underlying model - however capable - performs within the constraints of the infrastructure around it. How context is structured and maintained. How tasks are isolated. How results are routed back. How the system handles the edge cases that the demos never show. These are harness decisions, and they determine whether the output is reliable, consistent, and useful under real working conditions rather than controlled demonstrations.

NanoClaw makes a deliberate choice: run directly on the Claude Agent SDK, the same infrastructure that powers Claude Code, rather than abstracting away from it. The harness is as close to the model as it can be. That's a principled engineering decision, and it's one we recognise.

The AI projects that will endure in [regulated businesses](/blog/why-law-firms-cant-afford-cloud-ai) aren't the ones that offered the most features at the point of sale. They're the ones where someone can still explain, years later, exactly what is running, what it can see, and why the output should be trusted. NanoClaw builds toward that standard. So do we.

* * *

*JD Fortress AI deploys secure, on-premises AI for businesses across regulated sectors in the UK. Get in touch for a confidential discussion - no pitch, just practical talk.*
