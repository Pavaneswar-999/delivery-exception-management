# Delivery Exception Management

> A production-ready frontend dashboard for GreyAtom Logistics operations team to capture, track, and resolve delivery exceptions in real-time.

[![Build Status](https://img.shields.io/github/actions/workflow/status/pavan/delivery-exception-management/ci.yml?branch=main&label=CI)](https://github.com/pavan/delivery-exception-management/actions)
[![License](https://img.shields.io/github/license/pavan/delivery-exception-management)](LICENSE)
[![Accessibility](https://img.shields.io/badge/a11y-WCAG%202.1%20AA-blue)](https://www.w3.org/WAI/WCAG21/quickref/)

## Overview

The Delivery Exception Management dashboard is an internal operations tool designed for GreyAtom Logistics' delivery operations team. It provides a streamlined interface to:

- **Report** delivery exceptions with structured forms
- **Track** open issues in a filterable operations queue
- **Resolve** exceptions with one-click actions
- **Monitor** real-time metrics (total, open, resolved counts)

## Features

### Exception Reporting
- Structured form with validation (required fields, priority selection)
- Issue type categorization (Address Not Found, Customer Unavailable, Payment Issue, Package Damaged)
- Priority levels (Low, Medium, High) with visual indicators
- Optional notes for additional context

### Operations Queue
- Real-time filtering by issue type and status
- Keyboard-navigable table with sortable columns
- Inline actions: Resolve / Delete
- Visual status badges (Open / Resolved)
- Priority badges with color coding

### Metrics Dashboard
- Live counters: Total Exceptions, Open Issues, Resolved Issues
- Auto-updating on every action
- Empty states with clear guidance

### Accessibility (WCAG 2.1 AA)
- Semantic HTML5 structure
- Full keyboard navigation
- ARIA labels and live regions
- Focus management
- Color contrast compliance
- Screen reader support
- Reduced motion support

## Tech Stack

| Category | Technology |
|----------|------------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Logic | Vanilla ES6+ JavaScript |
| Architecture | Component-based, event-driven |
| State | In-memory array (session-only) |

**No frameworks, no build step, no dependencies** — runs by opening `index.html` in any modern browser.

## Quick Start

### Prerequisites
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local web server (recommended) or direct file open

### Run Locally

```bash
# Option 1: Python 3 (simplest)
python -m http.server 8000

# Option 2: Node.js (http-server)
npx http-server -p 8000

# Option 3: VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then open `http://localhost:8000`

### Direct File Open
Double-click `index.html` — works for basic usage but filters/CORS may be limited.

## Project Structure

```
delivery-exception-management/
├── index.html          # Main HTML document (semantic, accessible)
├── styles.css          # Complete styling (938 lines, organized)
├── script.js           # Application logic (280 lines, modular)
├── .gitignore          # Git ignore rules
├── LICENSE             # MIT License
├── README.md           # This file
└── CHANGELOG.md        # Version history
```

## Architecture

### HTML (`index.html`)
- Semantic landmarks: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- ARIA roles and labels throughout
- Form with native validation + custom error handling
- Accessible table with `<caption>`, `<th scope="col">`, row actions

### CSS (`styles.css`)
Organized into logical sections:
1. **Custom Properties** — Design tokens (colors, spacing, shadows)
2. **Reset & Base** — Box-sizing, typography, focus styles
3. **Layout** — Topbar, page shell, grid systems
4. **Components** — Stat cards, panels, form fields, badges, buttons, tables
5. **States** — Empty, error, resolved, hidden
6. **Responsive** — Breakpoints at 1040px, 720px
7. **Accessibility** — Reduced motion, high contrast support

### JavaScript (`script.js`)
Single-file module pattern with:
- **State**: `exceptions[]` array with metadata
- **DOM Refs**: Cached selectors for performance
- **Event Delegation**: Single listener on table body for actions
- **Pure Functions**: `createExceptionRow`, `findException`, `applyFilters`, `updateCounters`
- **Side Effects**: DOM mutations, form reset, focus management

## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| Mobile Chrome | 90+ | ✅ Full |
| Mobile Safari | 14+ | ✅ Full |

Requires: `CSS Custom Properties`, `Grid`, `Flexbox`, `ES6 Classes`, `Array.prototype.find`, `Element.closest`

## Development

### Code Style

- **HTML**: 2-space indent, semantic elements, accessibility attributes
- **CSS**: BEM-ish naming, custom properties for theming, mobile-first
- **JS**: ES6+, const/let, arrow functions, JSDoc comments for functions

### Linting (Optional)

```bash
# HTML
npx htmlhint index.html

# CSS
npx stylelint styles.css

# JavaScript
npx eslint script.js
```

### Testing

```bash
# Accessibility audit
npx axe-cli http://localhost:8000

# Lighthouse CI
npx lighthouse http://localhost:8000 --output=html

# Visual regression (Chromatic, Percy, etc.)
```

## Deployment

### Static Hosting (Recommended)

| Platform | Command |
|----------|---------|
| **Vercel** | `npx vercel --prod` |
| **Netlify** | `npx netlify deploy --prod --dir=.` |
| **GitHub Pages** | Push to `gh-pages` branch |
| **Cloudflare Pages** | Connect repo, build command: `none` |
| **AWS S3 + CloudFront** | `aws s3 sync . s3://bucket --delete` |

### Docker (nginx)

```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t delivery-exceptions .
docker run -p 8080:80 delivery-exceptions
```

## Configuration

### Custom Properties (CSS Variables)

```css
:root {
  /* Brand Colors */
  --blue-700: #1c66d7;
  --blue-600: #2878e5;
  --blue-100: #eaf2ff;

  /* Semantic Colors */
  --success: #26a269;
  --warning: #e1a124;
  --danger: #bc3b3b;

  /* Neutrals */
  --navy-950: #152238;
  --slate-600: #62748a;
  --slate-100: #f4f7fa;
  --white: #ffffff;

  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 40px;
  --space-8: 48px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(21, 34, 56, 0.04), 0 6px 18px rgba(21, 34, 56, 0.04);
  --shadow-md: 0 14px 30px rgba(21, 34, 56, 0.07);
}
```

Override by adding a `<style>` block before `styles.css` or using a custom build.

## Roadmap

- [ ] **Persistence** — IndexedDB / localStorage for session survival
- [ ] **Backend Integration** — REST API with Supabase / Firebase / custom
- [ ] **Real-time** — WebSocket / Server-Sent Events for multi-user sync
- [ ] **Export** — CSV/PDF export of exception logs
- [ ] **Authentication** — SSO integration (Okta, Azure AD)
- [ ] **Notifications** — Email/Slack alerts for high-priority exceptions
- [ ] **Analytics** — Dashboard with trends, SLA tracking, team performance
- [ ] **Mobile App** — Capacitor wrapper for iOS/Android distribution
- [ ] **Unit Tests** — Vitest + Testing Library coverage >90%
- [ ] **E2E Tests** — Playwright test suite

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, missing semicolons, etc. |
| `refactor` | Code change that neither fixes nor adds feature |
| `perf` | Performance improvement |
| `test` | Adding missing tests |
| `chore` | Maintenance, dependencies |

Example: `feat(form): add delivery ID autocomplete suggestions`

## License

MIT License — see [LICENSE](LICENSE) for details.

## Credits

- **Design System** — Custom, inspired by [Tailwind CSS](https://tailwindcss.com/) and [Radix UI](https://www.radix-ui.com/)
- **Icons** — Unicode characters (no icon font dependency)
- **Fonts** — System font stack (Inter, -apple-system, BlinkMacSystemFont, Segoe UI)
- **Accessibility Guidance** — [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Contact

**GreyAtom Logistics** — Internal Operations Tools Team

- Repository: [github.com/pavan/delivery-exception-management](https://github.com/pavan/delivery-exception-management)
- Issues: [GitHub Issues](https://github.com/pavan/delivery-exception-management/issues)
- Internal Wiki: [Confluence Space](https://greyatom.atlassian.net/wiki/spaces/OPS)

---

*Built with ❤️ for the GreyAtom Logistics Operations Team*