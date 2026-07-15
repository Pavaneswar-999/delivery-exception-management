# Pull Request Template

## Description
<!-- Provide a brief summary of the changes -->

## Type of Change
<!-- Mark the relevant option with an "x" -->
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code refactoring (no functional changes)
- [ ] Performance improvement
- [ ] Accessibility improvement
- [ ] CI/CD changes

## Related Issues
<!-- Link to related issues using "Fixes #123" or "Relates to #123" -->
Fixes #

## Changes Made
<!-- List the key changes made in this PR -->
- 
- 
- 

## Testing
<!-- Describe the tests you ran and how to reproduce -->
### Manual Testing
- [ ] Tested on Chrome (latest)
- [ ] Tested on Firefox (latest)
- [ ] Tested on Safari (latest)
- [ ] Tested on Edge (latest)
- [ ] Tested on mobile Chrome
- [ ] Tested on mobile Safari

### Accessibility Testing
- [ ] Keyboard navigation works (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Screen reader tested (NVDA / VoiceOver / JAWS)
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators visible
- [ ] No horizontal scroll at 320px width
- [ ] `prefers-reduced-motion` respected

### Automated Checks
- [ ] `npm run lint` passes
- [ ] `npm run check:format` passes
- [ ] Axe accessibility scan passes (0 violations)
- [ ] Lighthouse scores meet budgets (Performance ≥90, Accessibility 100, Best Practices ≥90, SEO ≥90)

## Screenshots / Recordings
<!-- Add screenshots or screen recordings demonstrating the changes -->

| Before | After |
|--------|-------|
| ![before](url) | ![after](url) |

## Performance Impact
<!-- If applicable, describe performance implications -->
- Bundle size change: +X KB / -X KB
- LCP change: +X ms / -X ms
- CLS change: +X / -X

## Breaking Changes
<!-- If this is a breaking change, describe what breaks and migration path -->

## Checklist
<!-- Mark completed items with "x" -->
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated documentation (README, CHANGELOG, comments)
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing tests pass locally
- [ ] Any dependent changes have been merged and published

## Additional Notes
<!-- Any additional information, configuration, or data that reviewers should know -->