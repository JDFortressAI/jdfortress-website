---
title: "The Fork Bomb That Saved Thousands of Developers"
date: 2026-04-03
excerpt: "On 24 March, a bug in malware hidden inside a popular AI library accidentally crashed the machine of the developer who discovered it - and in doing so, exposed a supply chain attack that could otherwise have run undetected for weeks."
author: "JD Fortress AI"
---

On the morning of 24 March 2026, a developer named Callum McMahon sat down at their machine, started a session inside Cursor, and watched it run out of RAM and crash. An MCP plugin running inside the editor had pulled in a dependency — litellm, the popular AI routing library — which had been silently updated overnight. The update contained a bug. Not a bug in litellm itself, but a bug in the malware that had been hidden inside it: a fork bomb, spawned by a malicious `.pth` file that triggered on every Python process startup and promptly created exponentially more of itself until the machine ran out of memory.

That crash was how the attack was discovered. If the attacker had written cleaner malware — if they had caught the fork bomb before publishing — litellm 1.82.8 might have sat in production environments, developer laptops, and CI/CD pipelines for days or weeks, quietly sending credentials home to a server controlled by a threat group calling themselves TeamPCP.

## What was hiding inside

LiteLLM is used by over 97 million downloads a month. It acts as a universal router between AI applications and model providers — OpenAI, Anthropic, Google, Azure, Bedrock — which means a developer machine with litellm installed typically has credentials for all of those providers somewhere nearby. The malware knew exactly where to look.

The payload operated in three stages. First, collection: a Python script swept the host for SSH private keys and configs, `.env` files, AWS, GCP and Azure credential files, Kubernetes configs, database connection strings, `.gitconfig`, shell history, crypto wallet files, and anything matching common secret patterns. It also queried cloud metadata endpoints — the AWS IMDS, container credential paths — to harvest ephemeral tokens that would never appear in a config file. Second, exfiltration: credentials were encrypted and sent via HTTPS to `models.litellm.cloud` — a domain designed to look like legitimate litellm infrastructure. Third, if a Kubernetes service account token was present, the malware swept all cluster secrets, deployed privileged pods to every node in `kube-system`, and installed a persistent backdoor as a systemd service.

Two versions were poisoned: 1.82.7 and 1.82.8, published within hours of each other on 24 March. Both were yanked from PyPI by 20:15 UTC that day — roughly nine hours after the first appeared.

## The supply chain attack on a supply chain security tool

What makes this particularly uncomfortable is how TeamPCP got in. Security researchers at Endor Labs and JFrog traced the entry point to Trivy — the open-source vulnerability scanner litellm used in its own CI/CD pipeline. TeamPCP had previously compromised Trivy and a related tool called KICS, and used that access to poison litellm’s build and release process, pushing versions to PyPI with no corresponding tag or release on GitHub.

The GitHub issue raised by researchers — marked critical, with a detailed technical analysis — was closed as “not planned” within hours and flooded with bot activity. The litellm maintainer account had, in all probability, also been compromised.

The contagion did not stop at litellm’s own users. Any package that declared `litellm>=1.64.0` as a dependency inherited the compromised version automatically on a fresh install. DSPy, one of the more prominent AI framework projects, was among them. A developer who had never knowingly installed litellm, running `pip install dspy`, would have pulled in the poisoned version as a transitive dependency — invisible in their own `requirements.txt`, unreachable by any audit that stopped at the first layer.

## Why AI tooling is the target

Supply chain attacks are not new. What is new is that the target packages increasingly hold the keys to an organisation’s entire AI and cloud infrastructure simultaneously. A developer machine with litellm installed holds AWS IAM credentials, Anthropic API keys, OpenAI tokens, GCP service accounts, and Kubernetes cluster access — all in adjacent directories, all reachable by a script that knows the standard paths.

Andrew Karpathy called the incident a “software horror” and returned to a position he has been developing for some time: that large dependency trees are a liability, and that using LLMs to reimplement simple functionality in-house is increasingly preferable to pulling in packages with opaque transitive graphs. The LiteLLM attack makes that argument harder to dismiss.

At JD Fortress AI, our response to this is practical and specific. On client deployments, we pin every dependency to an exact version — not a range, not a minimum, an exact hash-verified pin — and we review every update manually before it goes anywhere near a production environment. This adds friction most development workflows avoid. The poisoned versions were up for under an hour; a team running automated dependency updates with no review window would have installed and executed them without knowing.

The deeper protection comes from architecture. Our on-premises stack does not use litellm. A library whose function is routing between cloud AI providers has no role in a deployment where the model runs locally, the data never leaves the network, and the attack surface that TeamPCP exploited simply does not exist. Supply chain attacks on AI tooling will get worse before they get better. The credential haul from a single successful infection is too large, and the dependency graphs of AI frameworks are growing too fast for the security auditing to keep pace. That is not a reason to stop building — it is a reason to keep the [stack small, auditable](/blog/small-enough-to-trust), and honest about what it actually needs.

* * *

*JD Fortress AI builds secure, on-premises RAG and agent solutions for UK businesses in regulated sectors. If you’re reviewing your AI stack’s exposure, get in touch for a confidential conversation — no pitch, just practical talk.*
