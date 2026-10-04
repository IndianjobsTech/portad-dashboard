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

Requires Node.js 20.9+ (22 LTS recommended).

```bash
npm ci
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

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

## Contributing

Community contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) first.

## Security

Do not open public issues for vulnerabilities. See [SECURITY.md](SECURITY.md)
for private reporting instructions.

## License

[MIT](LICENSE) © 2026 VishMuKa TechWorks Private Limited.
