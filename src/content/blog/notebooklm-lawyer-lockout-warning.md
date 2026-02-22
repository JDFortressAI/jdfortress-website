---
title: "The Off Switch You Don't Control"
date: 2026-03-06
excerpt: "A lawyer lost access to his Gmail, photos, and phone number after uploading lawful case files to Google's NotebookLM. The implications for UK legal professionals are worth sitting with."
author: "JD Fortress AI"
---

On the morning of Saturday, 14 February, Brian Chase — adjunct law professor and managing director of digital forensics at ArcherHall — uploaded a set of text-only law enforcement reports to Google’s NotebookLM. He was working on a criminal case. The reports referenced child sexual abuse material because the defendant had been charged with possessing it. No images. No video. Just the kind of document that lands on a criminal defence lawyer’s desk as a matter of routine.

Within seconds, Google’s automated systems flagged a terms of service violation.

Chase deleted the upload the same day. On Monday morning, he woke up signed out of every Google service he used. His Gmail was inaccessible. His Google Voice number — the one attached to his professional identity — was gone. So were his photos and contacts. “Nothing I uploaded was illegal,” he wrote on LinkedIn. “Nothing I did violated the attorney ethical rules. But Google flagged it anyway, and there is very little recourse once that happens.” His account was eventually restored on Tuesday, after an automated appeal process in which there was no human being to speak to. Google did not respond to press enquiries.

## The scanner that doesn’t read context

Google’s free NotebookLM tier explicitly states that it may process uploaded data “to prevent fraud, abuse, and technical issues.” That is the line that matters. It isn’t that Google is reading documents out of curiosity — it’s that automated systems are scanning everything that passes through their servers, applying pattern-matching logic that cannot distinguish between a criminal defence lawyer handling case evidence and an individual in possession of prohibited material.

The scanner doesn’t know that the flagged text was a police report. It doesn’t know that the uploader had professional and ethical obligations to review that material. It knows only that certain strings matched a policy filter, and that the filter is applied account-wide. One document. One flag. Every linked service, suspended.

That is the architecture. Not a bug — the design.

## The risk that nobody talks about

Most discussion about AI tools and client confidentiality focuses on the training question: will uploaded documents be used to improve the model? That is a real concern, and one that the [CLOUD Act and its reach into US-hosted services](/blog/why-law-firms-cant-afford-cloud-ai) makes more acute. But it is not the most immediate risk. Chase’s case illustrates a different vulnerability entirely.

When your AI tool runs on a third-party platform, that platform controls the off switch. It controls what content is permitted, what triggers enforcement, and what access you retain when enforcement fires. The appeals process is whatever the platform has chosen to build — which may or may not include a human being capable of understanding professional context. For Chase, it was a 48-hour automated loop that eventually produced a restoration notice. For a solicitor with a court deadline, those 48 hours are not recoverable.

The same story notes that both ChatGPT and NotebookLM refused to summarise publicly available Justice Department documents from the Epstein case — documents that journalists and lawyers access routinely. Two AI tools based in China summarised them without hesitation. That asymmetry tells you something about where content moderation policy ends and something else begins. As [legal discovery obligations around AI-held data](/blog/chatgpt-discovery-legal-risk) become better understood, the behaviour of these platforms under pressure deserves more scrutiny than it currently receives.

## What the SRA expects — and what it can’t anticipate

The Solicitors Regulation Authority has published guidance making clear that solicitors must “undertake due diligence” before using any AI platform with client data, and must satisfy themselves that use of the platform is consistent with their obligations under SRA Principle 6 — the duty to keep client affairs confidential.

What that guidance cannot anticipate is this: what happens when the lawful professional work a solicitor is doing is misidentified by an automated content moderation system? Chase wasn’t uploading client data in any conventional sense. He was working with case evidence in the course of lawful legal work, and he still lost access to his professional communications infrastructure for the best part of two working days.

A framework that [asks whether AI use constitutes a disclosure to a third party](/blog/ai-third-party-privilege-ruling) rightly focusses on intentional sharing. The Google incident introduces a different question — one the regulators haven’t quite caught up with. What is the professional status of an account lockout? What are your obligations to a client whose matter is sitting in a disabled inbox?

## Owning the off switch

On-premise AI doesn’t have a content moderation system that can remove your access. The model runs on hardware you control, inside a network you control, under policies you set. There is no automated scanner reviewing uploaded documents for compliance with rules written by a platform’s legal team in California. There is no account-wide enforcement action that can take your email infrastructure down with it.

The Brian Chase incident is an unusually clean illustration of a structural vulnerability that affects any legal professional who relies on Big Tech AI platforms for sensitive work. The question isn’t whether you trust Google’s intentions. The question is whether you are comfortable with them holding the off switch — and what you’d tell a client if they flipped it.

* * *

*JD Fortress AI deploys secure, on-premises AI for law firms across the UK. Get in touch for a no-obligation discussion.*
