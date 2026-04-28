---
title: "\u2018We See Everything\u2019: Meta\u2019s Smart Glasses Scandal and What It Tells You About Cloud AI"
date: 2026-03-27
excerpt: "Workers in Nairobi describe intimate footage from Meta Ray-Ban glasses — bathroom visits, sex scenes, private conversations. The ICO is asking questions. The issue is not Meta specifically. It is how cloud AI works."
author: "JD Fortress AI"
---

At the top floor of a hotel in Nairobi, a man is nervous. He has signed a confidentiality agreement. If his employer — Sama, a data annotation subcontractor hired by Meta — discovers he is speaking to journalists, he could lose his job and, in his own words, be thrown back into a life without income.

What he has to say is short and memorable: “We see everything — from living rooms to naked bodies. Meta has that type of content in its databases.”

That quote, published this week by the Swedish newspapers Svenska Dagbladet and Göteborgs-Posten after a months-long investigation, is now the headline across the technology press. The UK’s Information Commissioner’s Office has written to Meta describing the report as “concerning.” A European lawsuit has been filed. And seven million pairs of Meta Ray-Ban glasses are currently sitting on faces around the world, their wearers largely unaware of where their footage ends up.

## What the marketing said — and what the terms said

In store, the message was consistent. Reporters visiting ten Swedish retailers in Stockholm and Gothenburg were told variations of the same reassurance: users are in full control of their data. “Nothing is shared with them,” said one salesperson. “Everything stays locally in the app.”

That is not true. When the reporters analysed network traffic from the app, the glasses were in frequent contact with Meta servers in Sweden and Denmark. For the AI assistant to work — to interpret what you are looking at and answer questions — your footage must be sent to Meta’s infrastructure. There is no local processing option. The assistant simply does not function without that connection.

Buried in Meta’s AI terms of service — which the company itself points to as the explanation for all of this — is a sentence that does acknowledge what happens: “In some cases, Meta will review your interactions with AIs, including the content of your conversations with or messages to AIs, and this review can be automated or manual (human).”

Human. As in the workers in Nairobi, who describe video clips of people coming out of bathrooms, sex scenes filmed accidentally while the glasses were still on, bank cards caught in frame, private conversations about crimes and protests, and content they describe as potentially triggering “enormous scandals” if leaked.

Faces are supposed to be automatically blurred before footage reaches annotators. Former Meta employees confirmed this. The annotators confirmed it does not always work.

## Where UK law now stands

The ICO’s decision to write to Meta is significant. Under UK GDPR — the post-Brexit equivalent of the EU regulation — data controllers are required to be transparent about how personal data is processed, including where it goes and who handles it. The gap between what sales staff communicated and what the terms actually said represents a transparency failure of some size.

There is also a data transfer question that has not been resolved. Kenya currently has no adequacy decision from the UK or the EU — meaning there is no formal determination that Kenyan data protection law meets the equivalent standard required to receive transfers lawfully. Negotiations between the EU and Kenya began in May 2024 and are expected to take time. In the meantime, transfers to Sama’s Nairobi operation require alternative safeguards, and it is not clear those are in place.

The ICO writing to Meta does not answer any of these questions. It begins a process. But the reputational and regulatory exposure for any organisation whose employees have been wearing these glasses in a professional context — at client meetings, [in legal consultations](/blog/notebooklm-lawyer-lockout-warning), on site — is not a hypothetical.

## The architectural reality

It would be easy to read this story as a Meta-specific scandal. It is not. It is a clean illustration of how cloud AI fundamentally operates.

When you use an AI assistant that requires a server connection to function, your data is not under your control from the moment you speak. It is transmitted, stored, processed, and — as the Sama workers make clear — sometimes reviewed by people you have never met and whose confidentiality obligations are governed by contracts you will never see.

The sales staff who told customers that “nothing is shared” were not lying as a matter of policy. They simply did not know. This is not unusual. The opacity is structural. It is how the product is designed to work. The alternative — an AI that processes everything locally, on hardware you own, with no outbound traffic at all — is precisely [the architecture that eliminates this class of problem entirely](/blog/small-enough-to-trust).

If the footage never leaves the building, there is no Nairobi.

* * *

*JD Fortress AI builds secure, on-premises AI for UK businesses in regulated sectors. If privacy is not negotiable for your organisation, get in touch — no pitch, just a practical conversation.*
