---
title: "The Knowledge Base That the Internet Stopped and Read"
date: 2026-04-14
excerpt: "Andrej Karpathy’s April 2026 post on LLM knowledge bases attracted 53,000 likes, 97,000 bookmarks, and a wave of open-source tools built overnight. Here’s what he described, and what it actually means for businesses."
author: "JD Fortress AI"
---

On the 2nd of April, Andrej Karpathy posted something that stopped the internet mid-scroll. Not a breakthrough paper. Not a new model release. A description of how he organises his files.

By the end of that week, the post had accumulated over 53,000 likes and nearly 100,000 bookmarks — one of the most-saved technical posts in recent memory. The GitHub Gist he linked, a plain markdown file describing three folders and some shell scripts, crossed 5,000 stars and 1,400 forks within 48 hours. The Hacker News thread ran to 185 comments. r/LocalLLaMA drew over 1,200 upvotes. Within days, multiple open-source implementations had appeared, each trying to turn Karpathy’s description into a packaged tool.

This level of response does not happen because a post is clever. It happens because it names something people have been circling without quite articulating. Karpathy named it.

## What he actually described

The system is deliberately simple. Three folders. A language model. No vector database, no embeddings, no infrastructure beyond a text editor.

The first folder — raw/ — is the inbox. PDFs, YouTube transcripts scraped with yt-dlp and Whisper, web articles, research papers. The LLM reads but never modifies this material. The second folder — wiki/ — is the compiled knowledge base: structured markdown files that the LLM writes and maintains, synthesising everything in raw/ into cross-referenced articles, summaries, and concept maps. The third — outputs/ — is where the LLM answers questions, generates study sheets, or produces reports by reading wiki/ rather than digging back through the raw source material. The architecture compounds over time: each new source deepens the wiki rather than resetting it.

His result, described in the post, was around a hundred articles and 400,000 words on a single research topic. He had not written a word of it.

The insight that resonated was not the tooling — it was the philosophy. No [RAG pipeline](/blog/what-is-rag). No vector store. Just the model’s context window, which is now large enough to read an entire wiki directly. “Knowledge compounds instead of resetting,” as he put it. Every session leaves the system slightly richer than it found it.

## What people built in the days that followed

The open-source community responded fast. Within a week, at least four tools had appeared directly inspired by the gist. kb-llm, a Python CLI by braindump-dev, automates the raw-to-wiki pipeline with three commands — ingest, synthesise, study — and had 312 stars before its own Show HN post landed. wiki-llm by nicholasgasior took a notably different stance: it supports local models via Ollama rather than defaulting to cloud APIs, which drew considerable attention from the privacy-conscious corner of the HN thread. evolvable, a TypeScript implementation by adityamukho, focused on knowledge graph traversal and flashcard generation. wikigpt took the pattern to Go for those who prefer compiled binaries.

The common thread across all of them is that they are wrappers around a concept simple enough to fit in a gist — which is precisely why the gist resonated. The developers building these tools were not adding complexity. They were removing friction from an architecture that Karpathy had already shown works at scale.

Several HN commenters noted they had been doing something similar manually for years. Obsidian users pointed out that their vaults plus an LLM plugin approximate the same pattern. The difference is that Karpathy described it clearly enough for the rest of the internet to see it as a replicable system rather than a personal habit.

## We built one. Here is what it confirmed.

We built our own version — not as a replication of Karpathy’s personal setup, but as a demonstration of the principle applied to a real corpus. The JD Fortress blog’s 22 articles are now mapped as a [living knowledge graph](/labs/knowledge-graph): nodes sized by inbound link count, edges drawn from the cross-references in the prose itself, the whole thing interactive and updated automatically as new posts are published. It is running live in [JD Fortress Labs](/labs).

What the build confirmed is that the architecture is genuinely sound. The relationships that emerge from mapping cross-references are not arbitrary — they reflect the actual conceptual structure of the content. Articles that sit at the centre of the graph are the ones carrying the most foundational ideas. The topology turns out to be meaningful.

It also confirmed something about the core tension in all of the tools that appeared after Karpathy’s post. Every one of them defaults to cloud APIs — Claude, OpenAI, Gemini. That is fine for a personal research wiki about astronomy or machine learning. It is not fine for businesses in regulated sectors whose raw/ folder contains client intelligence, board documents, unpublished research, or anything they are legally and contractually obliged to protect.

The version we are building for clients runs the model locally, on hardware the client controls. The wiki stays inside the client’s infrastructure. The [context window costs are real](/blog/context-is-not-free), and [the hardware has a floor](/blog/the-memory-wall), but the pattern is compatible with open-weight models on server-grade hardware — and the capability gap between frontier cloud models and local deployments is narrowing faster than most people anticipated eighteen months ago. What Karpathy described as a personal research tool becomes, on [sovereign infrastructure](/blog/capability-sovereignty), an always-on institutional memory that cannot be subpoenaed, accessed, or interrupted by a third-party policy change.

Karpathy’s insight was about the architecture of knowledge. Ours is about who owns it.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you’re exploring an always-on, private knowledge base that stays inside your walls, get in touch for a confidential discussion — no pitch, just practical talk.*
