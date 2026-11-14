# Engineering Workflow

## Local setup
Use Node.js 22 LTS (Node 20.9+ is the documented minimum) and npm.

    npm ci
    npm run dev
    npm test
    npm run lint
    npm run build

Use .env.example as a reference and create .env.local only for local values. Never commit real credentials or production data.

## Branches and commits
Use short-lived branches with descriptive prefixes: feat/name, fix/name, docs/name, test/name, or chore/name. Use conventional-style commit messages where practical: feat, fix, docs, test, chore, or refactor. Keep each commit focused.

## Issue quality
Each issue should include the problem and user impact, scope and non-goals, numbered acceptance criteria, relevant route/component and reproduction steps, test expectations, dependencies, and a mentor/reviewer when the contributor is new. Avoid assigning work before the task is Ready.

## Pull request checklist
- [ ] The PR links the issue and explains motivation.
- [ ] Scope is focused; no unrelated formatting or generated files.
- [ ] npm test, npm run lint, and npm run build pass, or exceptions are explained.
- [ ] User-visible states, errors, loading, and empty states are covered.
- [ ] Keyboard navigation, semantic labels, focus, contrast, and reduced motion were considered.
- [ ] Responsive layout was checked for UI changes.
- [ ] Docs, environment examples, and screenshots are updated when needed.
- [ ] No credentials, personal data, or private logs are included.
- [ ] Reviewer feedback is resolved or explicitly discussed.

## Testing strategy
- **Unit/component:** pure logic, rendering, state changes, validation, accessibility attributes.
- **Integration:** components working with API/auth boundaries, including errors and empty results.
- **End-to-end:** critical user journeys such as route navigation and wizard progression.
- **Manual smoke test:** desktop/mobile layout and keyboard interaction for visible UI changes.

Do not claim a check passed unless it was actually run. Include command output or CI links for non-obvious failures.

## CI and dependencies

The GitHub Actions workflow (`.github/workflows/ci.yml`) runs on pushes to `main` and pull requests.

The workflow uses Node.js 22 and performs the following checks:

1. Install dependencies using `npm ci`.
2. Install Playwright Chromium.
3. Run unit tests using `npm test`.
4. Run ESLint using `npm run lint`.
5. Generate the production build using `npm run build`.
6. Run end-to-end tests using `npm run test:e2e`.

Review dependency updates for changelog, compatibility, security impact, and lockfile consistency. Overrides must have an owner, justification, and revisit date.

## Release readiness
Before a release, verify acceptance criteria; review high/critical security findings; run tests, lint, build, and critical journey checks; verify docs and compatibility statements; prepare release notes with known limitations; and understand rollback/disablement for backend-connected features.
