# Architecture

## Overview

The Mustard Seed Group website is a public, content-led website built with Next.js App Router, TypeScript, Tailwind CSS and MDX files.

The architecture is intentionally simple:

- No database
- No CMS
- No user accounts
- No authentication
- No comments
- No newsletter platform
- No dynamic storage

GitHub acts as the content management system. Public content is stored as MDX in the repository and reviewed through pull requests.

## Hosting

- Cloudflare Pages
- Wrangler
- OpenNext for Cloudflare

## Content

```text
content/blog/
content/research/
content/companies/
content/pages/
content/drafts/
```

The content loader in `src/lib/content.ts` reads frontmatter and MDX bodies from these folders.

## Dynamic Surface

The site is static except for:

- Contact form route: `src/app/api/contact/route.ts`
- Cloudflare Web Analytics

The contact form verifies Cloudflare Turnstile and sends email through Resend. It stores nothing.

## Public Safety Boundary

This repo must only contain the public-facing website and public content.

Do not include:

- Orbit source code
- Orion source code
- Runbooks
- Agent logic
- Lead scoring
- Memory systems
- Internal workflows
- UI kits
- Design systems
- Client projects
- Proprietary implementations
