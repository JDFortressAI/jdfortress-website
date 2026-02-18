# JD Fortress AI — Website Build Spec for Claude Code

## Project
Build a complete, production-ready website for JD Fortress AI (jdfortress.com).
UK-based company: secure, on-premises AI for businesses that can't risk cloud data leaks.

## Stack
- Astro 5 (latest)
- Tailwind CSS v4
- Astro Content Collections (for blog)
- Deploy target: Netlify (static output)

## Brand
- Primary Navy: #0F2041
- White: #FFFFFF
- Accent Blue: #1E6FF5
- Light surface: #F0F4FF
- Body text dark: #0D141A
- Muted text: #56585E
- Footer dark: #0A0D1A

## Typography
- Font: Inter (Google Fonts) — weights 400, 500, 600, 700
- Display headings: 600-700 weight, tight tracking

## Design Principles
- Inspired by: anthropic.com, monzo.com, apple.com
- Hero sections: dark navy background (#0F2041), white text
- Content sections: white or light (#F0F4FF) background
- Premium, minimal, conversion-focused
- NOT: generic AI purple gradients, stock robot photos

## Pages to Build

### 1. Home (index.astro)
Hero: dark navy bg, white text
  H1: "AI That Stays Inside Your Walls"
  Subhead: "On-premises language models and RAG pipelines for businesses that can't afford a data breach. No cloud. No compromise."
  CTA button: "Get in Touch" → mailto:contact@jdfortress.com
  Secondary CTA: "See How It Works ↓" (scrolls down)

Trust bar (white bg):
  AWS Activate Partner | UK Registered | GDPR-Compliant by Design | ★★★★★

Problem section (white bg):
  H2: "Every AI Tool Your Competitors Use Sends Your Data Somewhere Else"
  Body: "Every document you upload to ChatGPT, CoCounsel, or Copilot leaves your network. For law firms, that's SRA Principle 6. For financial firms, that's FCA conduct risk. For everyone else, that's a breach waiting to happen."

Solution section (light navy bg #0F2041):
  H2: "JD Fortress Deploys AI Inside Your Infrastructure"
  Two feature cards:
    - On-Premise LLM Hosting: "Deploy high-performance language models on your own hardware, VPC, or air-gapped networks."
    - Custom RAG Pipelines: "Secure, scalable setups connecting your proprietary data to powerful AI models — without leaking it to public clouds."

Testimonials (white bg):
  Card 1:
    Quote: "Before the guys at JD Fortress AI approached us, we didn't even think to try AI solutions. It's pretty amazing to see what AI can do even for a small non-profit, and we're so relieved."
    Attribution: Charity Director, London ★★★★★
  Card 2:
    Quote: "In a fast-moving field that changes by the day, I needed the reassurance of a good pair of hands that can deliver the latest without the security risks. The guys at JD Fortress are exactly that: lovely, incredibly genuine, and honourable."
    Attribution: Business Owner, St Albans ★★★★★

Vertical CTA blocks (light bg):
  "Law firm?" → /solutions/law-firms
  "Enterprise?" → /contact
  "Charity?" → /contact

Final CTA (dark navy):
  "Ready to bring AI inside?" 
  Button: "contact@jdfortress.com"

### 2. Law Firms (/solutions/law-firms/index.astro)
Hero (dark navy):
  H1: "AI for Law Firms That Takes Confidentiality Seriously"
  Subhead: "CoCounsel sends your client documents to Thomson Reuters' servers. Ours never leave your office."

Risk section (white):
  H2: "The Hidden Risk in Your AI Strategy"
  4 risk cards:
    - SRA Principle 6: absolute duty of confidentiality
    - CLOUD Act exposure: US-listed providers, US federal access
    - Professional privilege: third-party data sharing threatens it
    - One breach can end a career — and a firm's reputation

JD Fortress Difference (light navy):
  H2: "On-Premises. SRA-Ready. No Compromise."
  Features:
    - Deployed on your hardware or private VPC
    - Client matter data stays on-site — always
    - No third-party data processing agreements required
    - GDPR-compliant by architecture, not by policy

What you get section:
  - AI legal research over your own precedents
  - Document review and summarisation
  - Secure Q&A over matter files
  - Custom deployment, supported throughout

Proof section (white):
  Business Owner testimonial
  AWS Activate badge

CTA:
  H2: "Book a Confidential Conversation"
  Button: "contact@jdfortress.com"
  Note: "Everything you share with us stays with us."

### 3. Labs (/labs/index.astro)
Hero (dark navy):
  H1: "JD Fortress Labs"
  Subhead: "Real-world experiments that showcase what's possible when security, simplicity, and sovereignty meet."

Bible Fortress card:
  Title: "Bible Fortress — Daily Scripture. Securely Delivered."
  Body: "Built to bring focus back to what matters. Following Robert Murray McCheyne's reading plan, Bible Fortress guides you through four passages a day — with narration and an integrated Q&A chat. No accounts. No cookies. No noise."
  Link: https://bible.jdfortress.com

FortiCIS card:
  Title: "FortiCIS — Your Secure Companion for CIS Benchmarks"
  Body: "An intelligent RAG-driven assistant that helps teams instantly access, interpret, and apply the latest CIS Benchmarks — from a single, secure interface."
  Link: https://cis.jdfortress.com

Closing statement:
  "These aren't side projects. They're proof that secure, private AI is not just possible — it's already running."

### 4. About (/about/index.astro)
Hero (dark navy):
  H1: "Built in Harpenden. Deploying Globally."
  Subhead: "Committed to data sovereignty and regulatory excellence."

Story section:
  H2: "Who We Are"
  Body: "JD Fortress AI was founded with a single conviction: that businesses shouldn't have to choose between the power of AI and the security of their data. We build secure, on-premises AI infrastructure for organisations that can't afford to compromise — law firms, financial services, healthcare providers, and beyond."
  "UK-based. AWS Activate partner. Genuinely, honourably, committed to doing this right."

Values section:
  3 cards: Security First | Genuine Service | No Compromise

Contact info section

### 5. Contact (/contact/index.astro)
Hero (dark navy):
  H1: "Let's Talk"
  Subhead: "No pitch. No pressure. Just a conversation about what you need."

Contact details:
  Email: contact@jdfortress.com (large, clickable mailto link)
  Phone: 07401-059732
  Location: Harpenden, Hertfordshire, UK

Note: "Everything you share with us stays with us."
LinkedIn: https://www.linkedin.com/company/jd-fotress-ai-limited/
X/Twitter: https://x.com/JDFortressAI

### 6. Blog (/blog/index.astro + /blog/[slug].astro)
- List page: cards with title, date, excerpt
- Post page: clean readable layout, author = "JD Fortress AI"
- Content from src/content/blog/*.md (Astro content collections)
- Create 2 sample posts:
  Post 1: "Why High Street Law Firms Can't Afford Cloud AI" (2026-02-18)
  Post 2: "What is RAG and Why Does It Matter for Your Business?" (2026-02-10)

## Navigation
Links: Home | Solutions (dropdown: Law Firms) | Labs | About | Blog | Contact →
Logo: public/logo.png (top left, links to /)
Mobile: hamburger menu

## Footer
Dark bg (#0A0D1A), white text
Left: Logo + "Your Data. Your AI. Your Fortress." + social links (LinkedIn, X)
Center: Quick links
Right: Contact info
Bottom: © 2026 JD Fortress AI Ltd. All rights reserved.

## SEO
Each page: unique title, meta description, canonical URL
Home title: "JD Fortress AI — Secure On-Premises AI for UK Businesses"
Law firms title: "AI for Law Firms | SRA-Compliant On-Premises AI — JD Fortress"

## Important Notes
- Logo file is at public/logo.png
- Use email mailto links for all CTAs (no form needed for Phase 1)
- All images should use next-gen formats where possible
- Fully responsive (mobile-first)
- Fast: avoid heavy JS, keep it static

When completely finished building all pages and content, run:
openclaw system event --text "Done: JD Fortress website built — all pages complete, ready for review" --mode now
