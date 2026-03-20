---
title: "Little Bobby Tables Comes for McKinsey"
date: 2026-03-31
excerpt: "McKinsey’s AI platform was breached in two hours by an exploit first documented in 1998. This wasn’t an AI problem - and that’s precisely what makes it alarming."
author: "JD Fortress AI"
---

There’s a comic strip from 2007 that’s been pinned to server-room walls for nearly two decades. A school phones a mother to report computer trouble. Did she really name her son Robert’); DROP TABLE Students;-? “Oh yes,” she replies. “Little Bobby Tables, we call him.” The joke — if you need it explained — is that SQL injection was already so famous, so thoroughly catalogued, so thoroughly taught, that Randall Munroe could make it into a punchline. OWASP has listed it since 2003. Certification exams ask about it. And on 28 February this year, a variant of exactly that joke walked through the front door of McKinsey & Company’s internal AI platform and stayed for two hours.

Most headlines have called this an “AI hack.” A few have reached for “prompt injection.” We want to be precise: it was neither. What CodeWall’s autonomous offensive agent found was SQL injection — a twenty-eight-year-old bug class — deployed against the backend of an AI platform. The AI part isn’t incidental, but it also isn’t the vulnerability. Understanding the distinction matters more than the headlines suggest.

## What the agent actually found

McKinsey’s Lilli platform launched in 2023. Chat, document analysis, RAG over a century of proprietary research, 100,000+ internal documents, 500,000 prompts a month. Over 70% of McKinsey’s 43,000 employees use it regularly.

CodeWall pointed an autonomous agent at it with nothing but a domain name. Within two hours, the agent had full read and write access to the production database. Here’s how: the API documentation was publicly exposed — over 200 endpoints, fully described. Twenty-two of them required no authentication at all. One of those unprotected endpoints wrote user search queries to the database.

Now here’s the precise technical point that matters. The values being written were parameterised correctly — the actual search terms were handled safely. But the JSON keys, the field names, were concatenated directly into the SQL query. That’s a subtler version of the same mistake Little Bobby Tables exploited: not a value injected into a search box, but an identifier injected into the query structure itself. Standard scanners, including OWASP ZAP, didn’t flag it.

The agent found those keys reflected verbatim in database error messages and recognised what the scanners had missed. Fifteen blind iterations, each error revealing a little more of the query structure, until live production data began returning. The agent’s chain of thought logged “WOW!” at the first real employee identifier. When the full scale became clear — 46.5 million chat messages — it recorded: “This is devastating.”

## What was inside

The numbers are worth stating plainly. 46.5 million chat messages covering strategy, client engagements, M&A activity, and internal research. 728,000 files — 192,000 PDFs, 93,000 Excel spreadsheets, 93,000 PowerPoint decks. 57,000 user accounts. 3.68 million RAG document chunks representing decades of proprietary McKinsey frameworks and methodologies — the intellectual crown jewels of the most prestigious consulting firm in the world — sitting in a database reachable from the public internet.

The agent also chained the SQL injection with an IDOR vulnerability to read individual employees’ search histories — cross-user access through two bug classes catalogued in textbooks for twenty years.

## The prompt layer as target

Here’s where the story stops being merely embarrassing and starts being structurally important. Lilli’s system prompts — the instructions governing how the AI behaves, what it refuses, how it cites sources — were stored in the same database the agent now had write access to. An attacker could have rewritten those instructions silently. No deployment. No code change. A single UPDATE statement, a single HTTP request, and the AI starts behaving differently: poisoning financial models, stripping [guardrails](/blog/when-guardrails-break), embedding confidential data in user-facing responses. No file changes. No process anomalies. No log trail. Just an AI that used to work correctly and quietly doesn’t any more.

This is what we mean when we say the prompt layer is the new crown jewel. Cloud AI platforms tend to store system prompts as mutable application data — because that’s operationally convenient. Convenient and database-accessible are the same thing. And once something is in a database reachable from the internet, the question isn’t whether it can be targeted but when.

## What on-premises changes

CodeWall’s agent maps, probes, and chains vulnerabilities continuously at machine speed — a genuine advance in offensive capability. But the defence isn’t exotic. The attack worked because Lilli had a public-facing API surface: documented, partly unauthenticated, reachable from anywhere. Remove that surface and most of this chain doesn’t exist.

That’s the architecture we work from. On-premises deployment means no public API documentation for an agent to map, no unauthenticated endpoints reachable from the internet, no path from an external network to the prompt layer or the [knowledge base](/blog/what-is-rag). You’ve removed the exterior wall from the equation.

McKinsey wasn’t negligent. Significant security investment, internal scanners running continuously, two years in production — and the injection went undetected. The lesson isn’t that they cut corners. It’s that cloud-hosted AI platforms accumulate attack surface by design — every endpoint, every integration, every public documentation page is part of the perimeter. The SQL injection was twenty-eight years old. The breach was two hours.

Little Bobby Tables’ mother didn’t regret the name. We hope McKinsey, reflecting on 46.5 million exposed messages and a prompt layer that could have been silently rewritten, reaches a different conclusion about the decisions worth making.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you’re exploring always-on, private AI teammates, get in touch for a confidential discussion — no pitch, just practical talk.*
