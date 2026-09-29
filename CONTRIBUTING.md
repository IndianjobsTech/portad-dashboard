# Contributing to the PortaD Dashboard

Thanks for your interest in improving the PortaD dashboard. This repository
holds the public web front-end only; changes here affect the marketing site
and the UI shell.

## Getting started

1. Fork the repository and clone your fork.
2. Use Node.js 22 LTS (20.9+ works):

   ```bash
   npm ci
   npm run dev
   ```

3. Create a branch for your change:

   ```bash
   git checkout -b fix/short-description
   ```

## Making a change

- Match the existing code style: TypeScript strict, Tailwind utility classes,
  small composable components under `src/components/`.
- Keep animations accessible — respect `prefers-reduced-motion`.
- Do not add secrets or API keys. Only `NEXT_PUBLIC_*` values belong in env
  vars, and anything public must be safe to publish.

## Before you open a pull request

Both gates must pass locally:

```bash
npm run lint
npm run build
```

CI runs the same checks on every pull request.

## Pull request guidelines

- One logical change per PR; describe the *why*, not just the *what*.
- Link any related issue.
- Screenshots or a short clip help a lot for visual changes.
- By contributing, you agree your contribution is licensed under the MIT
  License that covers this repository.

## Reporting bugs and requesting features

Use the issue templates. For anything security-sensitive, follow
[SECURITY.md](SECURITY.md) instead of opening a public issue.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
