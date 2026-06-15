# Deployment

## Cloudflare Pages Settings

Project name:

```text
mustardseed-group
```

Production domain:

```text
mustardseed.group
```

Build command:

```bash
npm run pages:build
```

Output directory:

```text
.open-next/assets
```

Deploy command:

```bash
npm run pages:deploy
```

## Required Environment Variables

Set these in Cloudflare Pages:

```text
NEXT_PUBLIC_SITE_URL=https://mustardseed.group
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
RESEND_API_KEY=
CONTACT_TO_EMAIL=
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=
```

## Local Preview

```bash
npm run pages:preview
```

## Wrangler

`wrangler.jsonc` contains the Pages output directory, compatibility date and runtime compatibility flags.

Use `wrangler pages deploy` through the npm script rather than deploying to Vercel.
