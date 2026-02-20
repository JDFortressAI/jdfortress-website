---
title: "When AI Becomes the Third Party: The US Ruling Every UK Lawyer Needs to Read"
date: 2026-03-03
excerpt: "A US federal court just stripped legal privilege from documents created in a public AI tool. The reasoning maps directly onto UK practice — and no one should wait for a domestic equivalent."
author: "JD Fortress AI"
---

A few months ago, we started hearing a version of the same question from compliance leads at law firms across the south of England: "If a fee earner types something into [ChatGPT](/blog/chatgpt-discovery-legal-risk) or Claude, and it relates to a client matter, where does that go?" The honest answer was always: to a server owned by a US tech company, under terms that permit training, disclosure to regulators, and use in ways you haven't fully parsed. Uncomfortable — but, until recently, still somewhat theoretical.

On 10 February 2026, it stopped being theoretical.

Judge Jed Rakoff of the US District Court for the Southern District of New York ruled in *United States v. Heppner* that a criminal defendant could not claim attorney-client privilege over documents he had created using Anthropic's public version of Claude. The detail that should unsettle every lawyer: he had typed information received directly from his own legal counsel into the tool — intending, his defence argued, to consolidate his thoughts before speaking to his lawyers. It didn't matter. The court found that once privileged information passed through a public AI tool, the privilege was gone.

## Why the terms of service killed the privilege

The court's reasoning wasn't complicated, and that's precisely what makes it significant.

Attorney-client privilege requires, at its core, that communications remain confidential. Claude's standard consumer terms permit Anthropic to use inputs and outputs for model training, and to disclose user data to third parties and regulatory authorities. That language — buried in the terms most people click past — was enough for Judge Rakoff. A user who accepts those terms has no reasonable expectation of confidentiality. And without confidentiality, there is no privilege to protect.

The work-product doctrine didn't save the defendant either. That doctrine shields materials prepared by or at the direction of counsel in anticipation of litigation. Heppner had created the AI documents entirely on his own initiative — his legal team hadn't asked him to, and weren't involved in their creation. On both grounds, the court held, the documents were fair game for the government.

Heppner's counsel from Quinn Emanuel argued that the documents should still be protected because they incorporated information their client had received during the course of the legal representation. Judge Rakoff saw it differently — and offered a blunt assessment that he saw "remotely, any basis for any claim of attorney-client privilege" as essentially non-existent.

## The enterprise exception the court deliberately left open

This is where it gets instructive for legal professionals making decisions right now.

Judge Rakoff's ruling was deliberately narrow: it concerned a consumer-grade, non-enterprise version of a public AI tool. Several leading US firms — Proskauer, Debevoise, A&O Shearman — writing in the immediate aftermath, noted that the court explicitly left open whether enterprise AI tools might support a different analysis. Enterprise deployments — those with contractual confidentiality protections, terms that exclude user inputs from model training, and clear restrictions on data disclosure — could, the reasoning implies, preserve the confidentiality that privilege requires.

In other words: the problem isn't AI. The problem is *public* AI, operating under consumer terms, touching information that your client, your regulator, and apparently now a federal judge expect to remain private.

That distinction matters enormously for how firms approach their technology choices. It's not a binary between "use AI" and "preserve privilege." It's a question of *which* AI, under *which* terms, on *whose* infrastructure.

## The UK parallel is closer than you'd think

This is a US ruling, applying US privilege law. But its underlying logic maps directly onto the landscape facing UK solicitors.

Legal professional privilege in England and Wales operates on the same foundational principle: confidentiality. The [SRA's own risk outlook on AI](/blog/why-law-firms-cant-afford-cloud-ai) notes that "firms adopting AI will need to make sure that their use of it protects confidentiality and legal privilege." Their compliance tips for solicitors urge due diligence on whether third-party AI platforms have been designed so that firms aren't in breach of their obligations. That's measured regulatory language for: if you can't trace where your clients' data goes, you're exposed.

We spoke recently with a fee earner at a small commercial property firm outside of London. She'd been using a general-purpose AI assistant to help draft correspondence — nothing dramatic, just time-saving. When we asked whether she'd reviewed the tool's data policies, she paused. "I assumed the firm had done that. No one told me not to use it." Her firm had no AI use policy at all.

That scenario is now a privilege waiver waiting to happen.

The Heppner ruling won't bind UK courts. But the question it answers — can a public AI tool constitute a third-party disclosure that destroys legal privilege? — is one UK practitioners should be asking before a domestic court answers it for them.

The answer isn't to ban AI from legal work. It's to ensure that whatever AI your firm uses operates entirely within a controlled, [private environment](/blog/what-is-rag): one where data doesn't transit a public provider's servers, where terms don't permit training on your inputs, and where confidentiality is a structural guarantee rather than a contractual hope.

If you'd like to understand what that looks like in practice for a firm your size — no jargon, no hard sell — we're happy to talk it through.

* * *

*JD Fortress AI deploys secure, on-premises AI for law firms across the UK. Get in touch for a no-obligation discussion.*
