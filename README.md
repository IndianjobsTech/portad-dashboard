# PortaD Dashboard

[![CI](https://github.com/IndianjobsTech/portad-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/IndianjobsTech/portad-dashboard/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

The public front-end for **[PortaD](https://portad.vishmuka.in)** — the open,
local-first way to move your data between SaaS workspaces.

This repository contains the dashboard: the marketing site, the migration
wizard, the compatibility matrix and the job views. It is a static Next.js
application — no proprietary migration logic ships in this bundle.

**Live:** [portad.vishmuka.in](https://portad.vishmuka.in)

## Stack

- **Next.js 16** (App Router, static export-friendly)
- **TypeScript** (strict)
- **Tailwind CSS 4**
- **motion/react** for entrance and section animation

## Pages

| Route            | What it shows                                              |
| ---------------- | ---------------------------------------------------------- |
| `/`              | Overview, adapter marquee, process, CLI demo, FAQ          |
| `/migrate`       | Step-by-step migration wizard shell                        |
| `/jobs`          | Job list with empty state                                  |
| `/compatibility` | Searchable source → target compatibility matrix            |
| `/account`       | Session screen (auth wiring pending Firebase web config)   |

## Develop

Requires Node.js 20.9+ (22 LTS recommended — `.nvmrc` pins 22).

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

## Project structure

```text
src/
  app/          one folder per route + layout.tsx (site metadata, OG, canonical)
  components/   UI sections — header, hero, terminal demo, process, footer …
  lib/
    config.ts   API + GitHub URLs
    auth.ts     authFetch: attaches the Firebase ID token as a Bearer header
    firebase.ts Firebase Auth wiring (optional, env-driven)
public/         logos, icons, robots.txt, sitemap.xml
.github/        CI workflow, issue and PR templates
```

## Deploy

- Production: **<https://portad.vishmuka.in>**, served by Vercel (the domain is a
  CNAME to `vercel-dns`).
- Build command: `npm ci && npm run build`; publish from the `main` branch.
- SEO: `public/robots.txt` points crawlers at `public/sitemap.xml`
  (both served from the site root).

## Environment

Copy `.env.example` to `.env.local` and fill in what you need:

```bash
NEXT_PUBLIC_API_URL=https://portad-production.up.railway.app
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

If unset, the dashboard probes the hosted PortaD API health endpoint for the
live status pill in the header and footer.

## Authentication

Sign-in is powered by **Firebase Auth** (email/password, GitHub, Google) when
the `NEXT_PUBLIC_FIREBASE_*` web config is present. The Firebase web config is
public by design — only admin/service-account keys stay server-side.

- Signed-in users get a real **ID token**: the account page shows its expiry
  and lets you copy it; API calls attach it as `Authorization: Bearer …`
  (`authFetch` in `src/lib/auth.ts`).
- Without Firebase config, the site falls back to a browser-local
  **preview session** (no API access) so the UI stays demonstrable.

Required Firebase console setup: enable Authentication → Sign-in method →
Email/Password (and GitHub/Google OAuth apps if you want those buttons).

## Using the PortaD CLI

This repository is only the front-end. Migrations run **locally** with the
PortaD CLI (Python 3.12+ and [uv](https://docs.astral.sh/uv/)), from its
source checkout:

```bash
uv sync
uv tool install .                    # puts `portad` on PATH (or use `uv run portad …`)

export NOTION_TOKEN="secret_..."     # Windows PowerShell: $env:NOTION_TOKEN = "secret_..."

uv run portad providers              # which source/target adapters exist
uv run portad export notion -o workspace.portad
uv run portad validate workspace.portad
uv run portad transform workspace.portad --target huly
uv run portad import huly workspace.portad -o huly-workspace
uv run portad verify workspace.portad --target huly -w huly-workspace
uv run portad report workspace.portad --html report.html
```

Exit codes: `0` success · `1` validation/usage error · `2` not implemented yet.
Run `portad --help` for the full command reference.

## Contributing

Community contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) first.

## Security

Do not open public issues for vulnerabilities. See [SECURITY.md](SECURITY.md)
for private reporting instructions.

## License

[MIT](LICENSE) © 2026 VishMuKa TechWorks Private Limited.
