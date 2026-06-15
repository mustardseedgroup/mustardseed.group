# Security Review

## Public Repository Boundary

This repository is public and must remain public-safe.

It contains only:

- Public website code
- Public MDX content
- Public documentation
- Draft-generation automation

It must not contain private product code, internal workflows, prompts, runbooks, memory systems, lead intelligence, client delivery systems or secrets.

## Contact Form

The contact form:

- Requires Cloudflare Turnstile verification.
- Sends email through Resend.
- Stores no data.
- Rejects obvious credential-like terms in submitted messages.
- Fails closed when required environment variables are missing.

## Content Pipeline

The draft generator:

- Runs only manually through `workflow_dispatch`.
- Creates drafts only.
- Does not merge automatically.
- Ignores updates unless `safe_to_publish: true`.
- Excludes `private_notes_do_not_publish` from generated drafts.
- Produces a safety report.
- Fails safely on sensitive keyword matches.

## Known Operational Requirements

Private source repositories require a least-privilege GitHub App token or fine-scoped token stored as an Actions secret.

Do not use a broad personal access token unless there is no alternative.
