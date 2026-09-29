# PortaD dashboard (web)

Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 shell for the PortaD
hosted plane (review §5, milestone M10):

- `/` — overview with a live status probe against the Railway API (`/healthz`)
- `/migrate` — four-step migration wizard shell (source → target → package → run)
- `/jobs` — job list with empty state (Firestore-backed jobs arrive later)
- `/compatibility` — source/target compatibility matrix
- `/account` — stubbed browser-local session (Firebase Auth pending web config)

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

Optional environment:

```bash
NEXT_PUBLIC_API_URL=https://portad-production.up.railway.app
```

## Deploy

Vercel project `porta-d` builds this directory (`rootDirectory: web`) on every
push to `main`. The API origin allows CORS from `*.vercel.app`.
