# Content Pipeline

The content pipeline creates draft MDX posts from approved public update files.

It does not publish automatically.

## Flow

1. Run the GitHub Action manually with `workflow_dispatch`.
2. Read approved source repositories from `content-sources.config.json`.
3. Locate update files such as `.orbit-public-update.yml`.
4. Validate the update type and safety flags.
5. Run sensitive keyword checks.
6. Generate draft MDX files in `content/drafts/`.
7. Open a pull request with label `content-draft`.
8. Assign the pull request to Chiko.

## Permissions

Use least privilege.

The workflow needs read access to configured source repositories and write access only to this website repository branch and pull requests.

For private source repositories, use a GitHub App or fine-scoped token stored as an Actions secret. Do not store tokens in the repository.

## Dry Run

The workflow supports dry-run mode. In dry-run mode it validates and reports but does not write draft files or open a pull request.
