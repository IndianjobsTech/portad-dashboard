# PortaD Dashboard

[![CI](https://github.com/IndianjobsTech/portad-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/IndianjobsTech/portad-dashboard/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

The public front-end for **[PortaD](https://porta-d.vercel.app)** — the open,
local-first way to move your data between SaaS workspaces.

This repository contains the dashboard: the marketing site, the migration
wizard, the compatibility matrix and the job views. It is a static Next.js
application — no proprietary migration logic ships in this bundle.

**Live:** [porta-d.vercel.app](https://porta-d.vercel.app)

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

Optional environment:

```bash
NEXT_PUBLIC_API_URL=https://portad-production.up.railway.app
```

If unset, the dashboard probes the hosted PortaD API health endpoint for the
live status pill in the header and footer.

## Contributing

Community contributions are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md).
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) first.

## Security

Do not open public issues for vulnerabilities. See [SECURITY.md](SECURITY.md)
for private reporting instructions.

## License

[MIT](LICENSE) © 2026 VishMuKa TechWorks Private Limited.
