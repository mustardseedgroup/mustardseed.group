# Mustard Seed Group Website

Public website for Mustard Seed Group.

Mustard Seed Group is the parent company behind a portfolio of businesses, products, research initiatives and experiments focused on increasing human capability through technology, systems, research and creativity.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX content files
- Cloudflare Pages
- Wrangler
- OpenNext for Cloudflare
- Cloudflare Turnstile
- Resend
- Cloudflare Web Analytics

No database, CMS, user accounts, comments, newsletter platform or authentication.

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Content

Content is stored as MDX:

```text
content/blog/
content/research/
content/companies/
content/pages/
content/drafts/
```

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_TURNSTILE_SITE_KEY
TURNSTILE_SECRET_KEY
RESEND_API_KEY
CONTACT_TO_EMAIL
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN
```

## Build

```bash
npm run build
```

## Cloudflare Pages

Build command:

```bash
npm run pages:build
```

Deploy command:

```bash
npm run pages:deploy
```

Output directory:

```text
.open-next/assets
```

## Security Boundary

This repository must not contain Orbit source code, Orion source code, runbooks, agent logic, lead scoring, memory systems, internal workflows, UI kits, design systems, client projects or proprietary implementations.
