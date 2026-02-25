---
title: "Our Thoughts on CoCounsel-the "Industry-leading AI assistant for professionals""
date: 2026-02-24
excerpt: "CoCounsel from Thomson Reuters promises serious productivity gains for legal work, built on decades of trusted content. But for many UK High Street firms, the cloud-based architecture still raises hard questions about client confidentiality under SRA rules. Here's what we've found."
author: "JD Fortress AI"
---


Thomson Reuters has been a fixture in legal research for generations, so when their CoCounsel platform started getting serious attention as a generative AI assistant for lawyers, we paid attention.

## What it's built on

First, a quick note on Practical Law, since CoCounsel builds heavily on it. Practical Law is essentially a vast, curated know-how resource: over 118,000 documents across practice areas, including standard clauses, drafting notes, checklists, and plain-language explanations maintained by hundreds of experienced attorney-editors. It's designed to help practitioners (especially in firms without massive libraries) draft faster, understand unfamiliar areas, and stay current on changes. For UK firms, it offers solid coverage of English/Welsh law alongside global materials. CoCounsel integrates this content directly, grounding its AI outputs in those authoritative sources rather than pure open-web generation.
## What firms are getting from it

From what we've gathered talking to contacts and reviewing public materials, the main attractions for High Street and mid-sized firms seem to be:

Speed on repetitive tasks: document review, contract drafting, summarising large sets of materials, spotting issues in litigation docs, or pulling together research plans.

Agentic workflows that chain steps (research → analysis → draft) without constant prompting.
Familiar integration with tools like Microsoft 365 or document management systems.

Users report cutting document review or drafting time significantly (Thomson Reuters cites figures like 2-3x faster in some cases), and the grounding in Westlaw/Practical Law content helps reduce hallucinations compared to generic tools.

Introductory/ongoing pricing isn't publicly listed in detail-you contact sales for tailored quotes, often tied to existing Thomson Reuters subscriptions (Westlaw, Practical Law bundles).

Some older references point to around £250 per user/month for certain tiers with multi-year commitments, but enterprise deals vary widely. It's positioned as premium, reflecting the depth of content and support.

## The question that keeps coming up

But here's where we keep coming back to the same question, especially after conversations with compliance leads and partners at smaller UK practices: how does this square with absolute client confidentiality?

CoCounsel is cloud-hosted. When you upload documents or run queries involving client matters, that data transits to Thomson Reuters' infrastructure and, for generative steps, to third-party LLM providers (historically OpenAI's GPT series; more recently they've tested custom builds on models like o1-mini, alongside Google and Anthropic options). Thomson Reuters is clear about protections: requests are anonymised under their identity (not yours), use zero-retention APIs (no storage by the LLM provider), data is encrypted in transit (TLS 1.2) and at rest (AES-256), and contractual terms prohibit third parties from using customer data to train models. They also highlight SOC 2, ISO 27001, and responsible AI practices.

That's strong on paper-better than many consumer-grade tools. Yet for a solicitor bound by [SRA Principle 6](/blog/why-law-firms-cant-afford-cloud-ai) (absolute duty of confidentiality) and the Code of Conduct, the fact remains: [sensitive client information leaves your controlled environment](/blog/notebooklm-lawyer-lockout-warning) and passes through external processors, even if anonymised and not retained. The SRA's AI guidance (still evolving) stresses assessing risks of disclosure, and many firms we speak to hesitate at that point.

Redaction or sanitisation before upload? Public materials don't detail automated mechanisms (e.g., no mention of regex patterns, entity recognition, or secondary LLMs for scrubbing). If firms handle that manually, it adds friction and risk of human error. If automated within CoCounsel, it still involves sending the raw document upstream first.

We get why CoCounsel appeals-it's polished, content-rich, and backed by a giant in the space. For firms already deep in the Thomson Reuters ecosystem, the controls may feel sufficient.

But for High Street practices handling personal injury, family, conveyancing, or probate-where a single inadvertent disclosure could end careers-we can't shake the concern. Why accept any external transit when the alternative exists?

## Why we build differently

That's why we focus on fully offline, on-premises deployments. Our systems run entirely on your hardware or private VPC/air-gapped networks: no data ever leaves your perimeter, no third-party APIs, no anonymisation gymnastics required. Custom [RAG pipelines](/blog/what-is-rag) pull answers exclusively from your documents and knowledge base, and we can layer on [agentic behaviours](/blog/what-is-openclaw) (proactive monitoring, task execution, autonomous drafting/responses) inspired by open frameworks-all local, all under your control.

The efficiency is comparable (research, summarisation, first drafts, compliance checks), but the risk profile is fundamentally different. No CLOUD Act exposure, no evolving third-party terms, no "trust us" on zero-retention.

If you're weighing tools like CoCounsel and wondering whether the convenience outweighs the confidentiality questions, we're happy to talk through what a truly private setup looks like for your firm-no hard sell, just practical comparison.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you're exploring always-on, private AI teammates, get in touch for a confidential discussion - no pitch, just practical talk.*
