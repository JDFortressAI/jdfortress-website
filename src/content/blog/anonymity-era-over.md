---
title: "The Anonymity Era Is Over: What a £1 Deanonymisation Attack Means for Your Data"
date: 2026-03-20
excerpt: "Last month, researchers from ETH Zurich and Anthropic published a paper that makes uncomfortable reading. They built an AI pipeline that unmasks anonymous internet users with 67% accuracy and 90% precision — for less than the cost of a coffee."
author: "JD Fortress AI"
---

Last month, researchers from ETH Zurich and Anthropic published a paper that deserves more attention than it has received outside the security community. The paper is called “Large-Scale Online Deanonymization with LLMs,” and its central finding is this: the practical privacy protection that pseudonymous online activity has provided for decades no longer holds.

The researchers built an automated pipeline that takes a collection of anonymous forum posts, extracts identity signals from them using a large language model, searches for matching profiles across the web using semantic embeddings, and then reasons over the candidates to identify the person behind the pseudonym. No human investigator is required at any step. The pipeline runs fully autonomously, and the cost per target is somewhere between £1 and £4.

The results across three datasets are worth reading slowly. On Hacker News users linked to LinkedIn profiles: 68% recall at 90% precision. On Reddit users posting under pseudonyms: 52%. On scientists whose interview transcripts had been explicitly redacted for privacy: 9 out of 125 still identified. When the system split a single user’s Reddit history across a year-long gap — matching their older posts against newer ones after a full year of different conversations and evolved interests — it achieved 67% recall at 90% precision. Even a year of changed behaviour was not enough to obscure the underlying identity signal.

The classical deanonymisation technique — the kind used in the famous Netflix Prize attack, which required structured data and manual feature engineering — scored near 0% recall across every one of these tests. LLMs did not incrementally improve on prior methods. They made those methods look like toys.

## How the pipeline works — and why it’s nearly impossible to stop

The researchers describe their approach as ESRC: Extract, Search, Reason, Calibrate.

The first step extracts identity-relevant signals from raw text — writing style, vocabulary, recurring topics, implicit knowledge claims, geographic references, professional background indicators — using a language model that has been trained to recognise these patterns at scale. The second step uses semantic embeddings to search a database of candidate profiles, narrowing thousands of possibilities to a manageable shortlist. The third step applies more expensive reasoning — using frontier models to compare the shortlist against the original profile. The fourth calibrates confidence, which is why when the system does make a guess, it is almost never wrong.

The attack is particularly difficult to defend against because every individual subtask looks benign. Summarise a profile. Compute an embedding. Rank candidates by similarity. No single API call raises a flag. Rate limits and safety guardrails cannot meaningfully intervene because there is nothing in any individual step that signals harmful intent. The researchers themselves say they are pessimistic that technical controls at the API level can stop this class of attack.

The scaling projections are sobering. Log-linear modelling suggests approximately 35% recall at 90% precision even at a candidate pool of one million — meaning that as the dataset grows from hundreds to millions of people, the system continues to identify a significant fraction of them accurately. And because more reasoning compute consistently improves results, every upgrade to a frontier model makes this attack stronger automatically. As the researchers note: every model upgrade is, in this context, a privacy downgrade.

## What this changes for organisations handling sensitive data

The deanonymisation paper matters for regulated organisations in ways that go beyond individuals worrying about their forum accounts.

For years, anonymisation and pseudonymisation have been treated as reliable techniques for reducing the sensitivity of data. Redact the names, replace identifiers with codes, strip the obvious metadata, and the result has been considered safe to process, share, or publish. That assumption is now in serious difficulty. The paper demonstrates that redacted interview transcripts — prepared explicitly for privacy — still yielded identifiable individuals. The “safe” version of the data was not safe when processed by a system capable of reasoning across signals that individually appear innocuous.

For legal teams, healthcare organisations, financial services firms, and any sector handling personal data under GDPR or professional confidentiality obligations, this creates a material question about existing anonymisation practices. Data that was classified as low-risk because it had been pseudonymised may need to be reclassified. Processes that relied on anonymisation as a privacy control need to be reviewed. The paper’s conclusion is blunt: “Users who post under persistent usernames should assume that adversaries can link their accounts to real identities.” The organisational equivalent is equally uncomfortable: data handlers should assume that pseudonymised records may be re-identifiable by anyone with access to a capable AI and a matching reference dataset.

## Isolation, not better anonymisation

The architectural response to this class of problem is not better anonymisation techniques. The paper demonstrates that the signals that enable re-identification are subtle, distributed across a body of text, and not eliminable by removing obvious identifiers. An organisation cannot reliably scrub its data of every signal that a frontier model might use to cross-reference it against an external database.

The response that works at the structural level is isolation: ensuring that sensitive data does not enter systems that can aggregate, cross-reference, and reason over it in ways the organisation did not authorise or anticipate. This is the same argument we make about [cloud AI platforms and client confidentiality](/blog/why-law-firms-cant-afford-cloud-ai), and about [platform-level controls as a security mechanism](/blog/when-guardrails-break). Data that runs through a public AI service — even with contractual protections, even with zero-retention agreements — is data that has crossed a boundary. The deanonymisation paper shows one of the less obvious ways that boundary crossing can have consequences.

[On-premises private AI deployment](/blog/small-enough-to-trust) keeps that boundary intact. The model processes your data inside your network, with no external calls, no third-party reasoning over your content, and no contribution to the aggregatable corpus that makes attacks like this possible. It does not solve the deanonymisation problem for data that has already left your perimeter. But it prevents that boundary from being crossed in the first place — which is, as this paper confirms, the only reliable protection remaining.

The anonymity era being over is not primarily a consumer problem. It is an organisational data governance problem. The question it poses to every institution handling sensitive records is the same one the paper poses to individual users: what assumption about your data’s privacy are you making that this research just invalidated?

* * *

*JD Fortress AI deploys secure, on-premises AI for businesses across regulated sectors in the UK. Get in touch for a confidential discussion about your AI security posture — no pitch, just practical talk.*
