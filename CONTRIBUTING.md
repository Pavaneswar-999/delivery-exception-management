# Contributing to Delivery Exception Management

Thank you for your interest in contributing! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Accessibility Requirements](#accessibility-requirements)
- [Testing](#testing)

## 🤝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you agree to uphold this code.

## 🚀 Getting Started

### Prerequisites

- Git
- Modern web browser
- Code editor (VS Code recommended)
- Node.js 18+ (for tooling)

### Setup

```bash
# Fork and clone your fork
git clone https://github.com/YOUR_USERNAME/delivery-exception-management.git
cd delivery-exception-management

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/delivery-exception-management.git

# Install dev dependencies
npm install

# Start development server
npm run dev
```

## 🔄 Development Workflow

### Branch Naming

| Type | Format | Example |
|------|--------|---------|
| Feature | `feature/short-description` | `feature/add-csv-export` |
| Bug Fix | `fix/short-description` | `fix/form-validation-mobile` |
| Docs | `docs/short-description` | `docs/update-readme-accessibility` |
| Refactor | `refactor/short-description` | `refactor/css-custom-properties` |
| Chore | `chore/short-description` | `chore/update-dependencies` |

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Examples:
```
feat: add CSV export for exceptions table
fix: resolve priority radio focus trap on mobile
docs: update accessibility section in README
refactor: extract table rendering to separate module
```

## 📥 Pull Request Process

### Before Submitting

- [ ] Branch is up to date with `main`
- [ ] All linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Accessibility audit passes (no violations)
- [ ] Manual testing completed (see checklist below)
- [ ] Commits follow conventional format
- [ ] PR description explains the "what" and "why"

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Refactor

## Testing
- [ ] Tested on Chrome/Firefox/Safari
- [ ] Tested mobile (320px) and desktop (1480px)
- [ ] Keyboard navigation verified
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] axe-core audit: 0 violations

## Screenshots
| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented complex logic
- [ ] I have updated documentation if needed
- [ ] My changes generate no new warnings
```

### Review Process

1. **Automated checks** must pass (CI pipeline)
2. **Code review** by at least one maintainer
3. **Accessibility review** for UI changes
4. **Approval** required before merge

## 🎨 Coding Standards

### HTML

- Use semantic HTML5 elements
- Include proper ARIA attributes
- Validate with W3C Validator
- Maintain heading hierarchy (h1 → h2 → h3)
- Use `sr-only` for screen-reader-only content

```html
<!-- Good -->
<section aria-labelledby="exceptions aria-labelledby="exceptions-heading">
  <h2 id="exceptions-heading">Reported Exceptions</h2>
  <table>
    <caption class="sr-only">Delivery exceptions and their current status</caption>
    <thead>
      <tr>
        <th scope="col">Delivery ID</th>
      </tr>
    </thead>
  </table>
</section>

<!-- Avoid -->
<div id="exceptions">
  <h3>Reported Exceptions</h3>
  <table>
    <tr><td>Delivery ID</td></tr>
  </table>
</div>
```

### CSS

- Use CSS custom properties for all design tokens
- Mobile-first media queries
- BEM-like class naming: `.block__element--modifier`
- Organize: Custom properties → Reset → Base → Components → Utilities
- Prefer `rem`/`em` over `px` for spacing/typography
- Use logical properties (`inline-start` vs `left`)

```css
/* Good */
.stat-card {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-6);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-primary);
}

.stat-card--warning {
  border-left-color: var(--color-warning);
}

/* Avoid */
.statCard {
  display: flex;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  border-left: 3px solid #2878e5;
}
```

### JavaScript

- ES6+ modules (IIFE or ES modules)
- Event delegation for dynamic content
- Functional patterns over class-based
- No global namespace pollution
- Descriptive variable names
- JSDoc for public functions

```javascript
// Good
function createExceptionRow(exception) {
  const row = document.createElement('tr');
  row.dataset.id = exception.id;
  row.innerException = exception;
  return row;
}

function renderExceptions(exceptions) {
  const fragment = document.createDocumentFragment();
  exceptions.forEach(exception => {
    fragment.appendChild(createExceptionRow(exception));
  });
  tbody.replaceChildren(fragment);
}

// Avoid
var exceptions = [];
function addException(e) {
  exceptions.push(e);
  render();
}
```

## ♿ Accessibility Requirements

### Mandatory for All PRs

- [ ] Semantic HTML structure maintained
- [ ] Color contrast ≥ 4.5:1 (AA) / 7:1 (AAA)
- [ ] Focus indicators visible on all interactive elements
- [ ] Keyboard accessible (Tab, Enter, Space, Arrow keys)
- [ ] ARIA labels on icon-only buttons
- [ ] Form inputs have associated `<label>` elements
- [ ] Error messages announced via `aria-live`
- [ ] No horizontal scroll at 320px viewport
- [ ] `prefers-reduced-motion` respected

### Testing Tools

```bash
# Automated accessibility testing
npx @axe-core/cli http://localhost:8000

# Manual testing
# 1. Tab through entire interface
# 2. Test with NVDA (Windows) / VoiceOver (Mac)
# 3. Zoom to 200% - verify no content loss
# 4. Test with high contrast mode
```

## 🧪 Testing

### Manual Testing Matrix

| Feature | Chrome | Firefox | Safari | Edge | Mobile Chrome | Mobile Safari |
|---------|--------|---------|--------|------|---------------|---------------|
| Form submission | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Filtering | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Keyboard nav | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Screen reader | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Performance Budgets

- **LCP** < 2.5s
- **FID** < 100ms
- **CLS** < 0.1
- **Total JS** < 50KB (gzipped)
- **Total CSS** < 20KB (gzipped)

## 🏷️ Release Process

Maintainers handle releases:

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create GitHub Release with notes
4. Deploy to GitHub Pages automatically

## 📞 Getting Help

- **Questions**: [GitHub Discussions](https://github.com/yourusername/delivery-exception-management/discussions)
- **Bugs**: [GitHub Issues](https://github.com/yourusername/delivery-exception-management/issues)
- **Security**: Email security@greyatom-logistics.com

---

*Thank you for contributing to GreyAtom Logistics tools!*