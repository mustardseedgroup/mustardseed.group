# Public Update Format

Approved source repositories can include public update files using this format:

```yaml
project: orbit
product: Orbit
date: 2026-06-15
type: feature
title: Public-safe update title
summary: Short public summary.
public_points:
  - Public-safe point one.
  - Public-safe point two.
screenshots: []
links:
  - https://example.com
safe_to_publish: true
approved_by: Chiko Shire
private_notes_do_not_publish: |
  Never copied into generated drafts.
```

## Rules

- `safe_to_publish` must be `true`.
- `private_notes_do_not_publish` is never included in output.
- Empty `approved_by` creates a draft marked as needing review.
- Sensitive keywords fail safely and create a safety report.
- Do not include private code, prompts, runbooks, memory systems, lead scoring, client data, secrets or unpublished strategy.
