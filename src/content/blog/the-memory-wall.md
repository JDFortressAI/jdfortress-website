---
title: "The Memory Wall: Why AI Hardware Is Getting More Expensive Before It Gets Cheaper"
date: 2026-02-13
excerpt: "AI memory is sold out. Prices jumped more than 50% in a single quarter. The hyperscalers are first in line, and they're taking most of the supply. Here's what that means if you're planning private AI infrastructure."
author: "JD Fortress AI"
---

The conventional wisdom about AI costs runs something like this: hardware gets cheaper over time, models get more efficient, and the barriers to enterprise deployment keep falling. That’s been roughly true for the past several decades of computing. For the next two years at least, it may not hold.

In January, CNBC published a detailed account of what the memory industry is calling an unprecedented supply crisis. Sumit Sadana, the business chief at Micron — one of only three companies that control almost the entire global RAM market — told reporters at CES that demand had “far outpaced our ability to supply that memory and, in our estimation, the supply capability of the whole memory industry.” TrendForce, the Taipei-based research firm that covers memory markets closely, reported that DRAM prices had risen between 50% and 55% in a single quarter. Their analyst called that rate of increase unprecedented. In October 2025, SK Hynix announced it had already secured demand for its entire 2026 HBM production capacity. The queue was closed before the year had started.

This is not a typical supply hiccup. It is a structural consequence of how AI chips are built.

## How HBM ate the memory market

High-bandwidth memory — HBM — is the specialised RAM that surrounds the compute unit in an AI chip. It is designed for the extreme bandwidth that large language models require, produced in a complex process where memory layers are physically stacked into a cube-like structure up to sixteen layers deep. Nvidia’s current Rubin GPU ships with up to 288 gigabytes of HBM4 per chip. A single NVL72 rack — 72 of those GPUs — requires a staggering volume of it.

The production economics create a direct trade-off with every other kind of memory. Micron’s Sadana explained it plainly: making one bit of HBM requires forgoing three bits of conventional memory. Every new HBM wafer run is three conventional memory wafers that don’t get made. As AI chip orders have surged, manufacturers have been redirecting capacity accordingly — and HBM is now expected to consume 23% of total DRAM wafer output in 2026, up from 19% the year before.

The physical manufacturing constraint runs even deeper. The advanced packaging process required to assemble the final AI chip — TSMC’s CoWoS (Chip-on-Wafer-on-Substrate) technique — is its own bottleneck entirely separate from memory production. TSMC executives have stated publicly that CoWoS capacity remains fully sold out through 2025 and into 2026. More HBM supply would not immediately translate to more chips, because the packaging line to assemble them simply does not have spare capacity.

## The queue you didn’t know you were in

The effects of this have already landed well outside the data centre. Micron discontinued part of its business serving consumer PC builders in December 2025, redirecting that supply to AI and server applications. Samsung raised prices for 32GB DDR5 modules by 60% in a single price revision. Contract DRAM pricing has more than doubled. One engineer noted publicly that the 256GB of consumer RAM he purchased for around $300 a few months prior would cost approximately $3,000 at current prices. Nvidia is reported to be cutting RTX 50-series gaming GPU production by 30% to 40% in the first half of 2026 due to GDDR7 memory shortages.

The pattern is consistent: the large hyperscalers — whose orders are largest, whose relationships with memory manufacturers are oldest, and who are least price-sensitive — are being served first. Micron’s Sadana acknowledged the company can currently only meet two-thirds of the medium-term memory requirements for some customers. Jensen Huang, asked at CES whether Nvidia’s gaming customers might resent AI for driving up GPU prices, said simply that there would need to be more memory factories, because the needs of AI are “so high.” More factories are being built — SK Hynix has committed to a capital programme of approximately $500 billion for four new fabs, with the first coming online in 2027. That supply, however, will not exist in 2026.

## What this means for private AI deployments

For businesses planning or running on-premises AI infrastructure, several things follow from this.

Hardware procurement decisions have become more consequential and more time-sensitive. The assumption that you can wait until you need capacity and then buy it at a reasonable price is now materially less safe than it was eighteen months ago. The businesses that thought carefully about their AI hardware requirements early and moved on them are in a meaningfully different position from those that deferred.

Efficiency is no longer just an engineering concern — it is a financial one. When memory is scarce and expensive, a system that [manages context well and avoids redundant computation](/blog/cache-rules-everything) has a direct hardware cost advantage over one that doesn’t. Running a 70-billion-parameter model carelessly consumes memory that costs roughly ten times what it cost two years ago. [The architecture of your pipeline](/blog/context-is-not-free) — how context is structured, how inference is batched, how KV-cache is managed — determines how much of that expensive resource you actually need.

The “memory wall” that AI researchers identified even before ChatGPT launched has not gone away. It has become a supply chain story as well as a systems architecture one. More GPU compute does not straightforwardly produce more AI capability if the memory bandwidth to feed that compute isn’t available. This is the constraint that makes thoughtful, [right-sized private AI deployments](/blog/small-enough-to-trust) — where every component is chosen deliberately rather than overprovisioned and hoped for — more defensible than ever.

The memory shortage will ease eventually. New fabs will come online. Packaging capacity will expand. But the timeline is measured in years, not quarters, and the businesses navigating 2026 with their AI infrastructure already in place will spend that time running, while others spend it waiting for allocations.

* * *

*JD Fortress AI deploys secure, on-premises AI for businesses across regulated sectors in the UK. Get in touch for a confidential discussion — no pitch, just practical talk.*
