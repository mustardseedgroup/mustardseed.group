# Deployment

## Cloudflare Settings

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
npm run cloudflare:build
```

Deploy command:

```bash
npm run cloudflare:deploy
```

Custom domains:

```text
mustardseed.group
www.mustardseed.group
```

## Required Environment Variables

Set these in Cloudflare:

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

`wrangler.jsonc` contains the Worker entrypoint, static asset binding, compatibility date, runtime compatibility flags and custom domain routes.

Use `opennextjs-cloudflare deploy` through the npm script rather than deploying to Vercel or static Pages output directly.
