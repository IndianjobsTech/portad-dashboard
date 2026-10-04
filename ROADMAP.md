# PortaD Dashboard Roadmap

Public visibility into what's coming next, what we're working on, and how you can help.

**Last updated:** October 2026  
**Next update:** End of October 2026

---

## 🎯 Current Focus (M7–M8)

### ✅ Completed
- [x] Dashboard site & migration wizard shell
- [x] Compatibility matrix (source → target adapters)
- [x] Marketing homepage with FAQ
- [x] Firebase Auth integration (optional)
- [x] Terminal demo CLI runner
- [x] Job views layout
- [x] Public repository & MIT license
- [x] CONTRIBUTING.md & community standards

### 🚧 In Progress
- [ ] **Job polling & real-time updates** — wire job views to PortaD API
- [ ] **Account page** — show user sessions, ID token, sign-out flow
- [ ] **Dark mode** — toggle + persistent preference
- [ ] **Mobile responsiveness** — full optimization for mobile
- [ ] **Docs site** — detailed guides for adapters & migration process
- [ ] **API client library** — TypeScript SDK for browser-based API calls

### 🔜 Next (Q4 2026)
- [ ] **Sitemap & SEO** — improve discoverability
- [ ] **Internationalization (i18n)** — translations (starting with Spanish, German, Japanese)
- [ ] **Analytics dashboard** — (private) view migration trends
- [ ] **Community contributions guide** — step-by-step for first-time contributors
- [ ] **E2E tests** — Playwright suite for full user flows

---

## 📅 Release Timeline

### v0.1 — Stable Release (Mid-October 2026)
**Theme:** Public Launch

- ✅ Finalize UI/UX
- ✅ Polish animations & accessibility
- ✅ Complete documentation
- ✅ First public announcement
- ✅ Community support infrastructure

**Breaking changes:** None (first release)

### v0.2 — Dark Mode & Mobile (November 2026)
**Theme:** User Experience

- [ ] Dark mode toggle
- [ ] Mobile-first redesign
- [ ] Touch-friendly components
- [ ] PWA manifest (offline-capable)
- [ ] Improved error handling
- [ ] Job view integration with PortaD API

### v0.3 — Internationalization (December 2026)
**Theme:** Global Reach

- [ ] Spanish (es-ES)
- [ ] German (de-DE)
- [ ] Japanese (ja-JP)
- [ ] Locale switcher in header
- [ ] RTL language support (Arabic, Hebrew)

### v0.4 — Advanced Features (Q1 2027)
**Theme:** Power User Tools

- [ ] Schedule migrations
- [ ] Dry-run preview mode
- [ ] Migration templates & presets
- [ ] Audit logs & history
- [ ] Bulk operations
- [ ] Custom branding for self-hosted instances

---

## 🤖 Planned Adapter Support

> These are targets for the core **[PortaD CLI](https://github.com/IndianjobsTech/PortaD)**, not this dashboard. But the compatibility matrix will update here.

| Provider | Type | Status | Version | ETA |
|----------|------|--------|---------|-----|
| Notion | Source | ✅ **Implemented** | v0.1 | Live |
| Huly | Target | ✅ **Implemented** | v0.1 | Live |
| Trello | Source | 🔜 Planned | v0.3 | Dec 2026 |
| Asana | Source | 🔜 Planned | v0.4 | Q1 2027 |
| ClickUp | Source | 🔜 Planned | v0.4 | Q1 2027 |
| Google Sheets | Source | 💡 Proposed | v0.5 | Q2 2027 |
| Airtable | Source | 💡 Proposed | v0.5 | Q2 2027 |
| Linear | Target | 💡 Proposed | v0.5+ | Q2 2027+ |
| Monday.com | Source | 💡 Proposed | v0.5+ | Q2 2027+ |

**Want a new adapter?** [Open a Discussion](https://github.com/IndianjobsTech/portad-dashboard/discussions) or vote on an existing one.

---

## 🎓 Contribution Opportunities

Help us build this roadmap! Here are areas where **contributions are welcome**:

### 🟢 Easy (Good first issues)
- [ ] Improve FAQ section
- [ ] Add keyboard navigation to wizard
- [ ] Fix accessibility issues (`alt` text, ARIA labels)
- [ ] Add unit tests for components
- [ ] Improve error messages
- [ ] Update docs with clearer examples

### 🟡 Medium (For intermediate contributors)
- [ ] Implement dark mode toggle
- [ ] Add form validation to wizard
- [ ] Optimize animations for reduced-motion
- [ ] Build component library docs
- [ ] Add E2E tests with Playwright
- [ ] Internationalization framework

### 🟠 Hard (For experienced contributors)
- [ ] Job view real-time polling
- [ ] Advanced routing & state management
- [ ] API integration tests
- [ ] Performance optimization (Lighthouse >95)
- [ ] Build self-hosted instance support
- [ ] TypeScript SDK for browser API calls

---

## 🔗 Dependencies

**Dashboard depends on:**
- ✅ **[PortaD CLI](https://github.com/IndianjobsTech/PortaD)** — migration engine (Python)
- ✅ **[PortaD API](https://portad-production.up.railway.app)** — hosted backend (Railway)
- ✅ **[PortaD Specification](https://github.com/IndianjobsTech/PortaD/blob/main/docs/specification/portad-spec-v0.1.md)** — `.portad` package format

**Cannot proceed with:**
- 🚫 Job polling without stable API
- 🚫 Analytics without backend infrastructure
- 🚫 i18n without community translators

---

## 💬 How to Influence This Roadmap

1. **Vote on features** — 👍 existing [Issues](https://github.com/IndianjobsTech/portad-dashboard/issues)
2. **Request adapters** — [Start a Discussion](https://github.com/IndianjobsTech/portad-dashboard/discussions)
3. **Propose changes** — Open a [Feature Request](https://github.com/IndianjobsTech/portad-dashboard/issues/new?template=feature_request.md)
4. **Contribute code** — See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📊 Success Metrics

We measure progress by:

- **Community engagement** — Issues, PRs, discussions
- **Contribution rate** — External PRs per month
- **User feedback** — GitHub issues & discussions
- **Adoption** — Dashboard traffic, API usage
- **Code quality** — Type coverage, test coverage, Lighthouse scores

---

## ❓ FAQ

### When will X feature be done?
Check the table above. Dates are estimates and may shift based on community feedback and dependencies.

### Can I help with adapter development?
Yes! Adapters live in the **[PortaD CLI repo](https://github.com/IndianjobsTech/PortaD)**. See [ADAPTER_GUIDE.md](https://github.com/IndianjobsTech/PortaD/blob/main/docs/ADAPTER_GUIDE.md).

### How do I report a bug not on this roadmap?
Open an [Issue](https://github.com/IndianjobsTech/portad-dashboard/issues) with details. Bugs take priority over features.

### What if this roadmap changes?
We'll update this file and notify the community in the [release notes](https://github.com/IndianjobsTech/portad-dashboard/releases).

---

## 🚀 Get Involved

- **New contributor?** Start with [QUICK_START.md](QUICK_START.md)
- **Want to code?** Pick a [good first issue](https://github.com/IndianjobsTech/portad-dashboard/labels/good%20first%20issue)
- **Have questions?** Ask in [Discussions](https://github.com/IndianjobsTech/portad-dashboard/discussions)
- **Found a bug?** Open an [Issue](https://github.com/IndianjobsTech/portad-dashboard/issues)

---

**Last updated:** October 4, 2026  
**Maintained by:** [@IndianjobsTech](https://github.com/IndianjobsTech)
