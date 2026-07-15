# Delivery Exception Management Dashboard

Version 1 frontend assignment for GreyAtom Logistics' internal operations tools team.

## Purpose

This desktop-first dashboard gives operations staff one place to record, review, filter, resolve, and remove delivery exceptions.

## Included

- Exception form with required Delivery ID, Customer Name, Issue Type, and Priority fields
- Optional notes for delivery context
- Operations queue with Delivery ID, Customer Name, Issue Type, Priority, Status, and Actions columns
- Issue-type and status filters that show or hide existing rows without deleting data
- Resolve and Delete actions, including an in-app confirmation dialog before deletion
- Session counters for tracked, open, and resolved exceptions
- Visual emphasis for high-priority and resolved records
- Responsive white-first interface designed for internal desktop use

## Technical boundaries

- HTML5, CSS3, and plain JavaScript only
- No framework, application library, backend, API, asynchronous JavaScript, or localStorage
- Records are held in an in-memory array and reset when the page is refreshed or closed
- DOM updates use event listeners, `document.querySelector`, element creation, and class changes

## Run locally

Open `index.html` directly in a modern browser, or serve the folder locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Project files

| File | Responsibility |
| --- | --- |
| `index.html` | Semantic page structure, form controls, table, and confirmation dialog |
| `styles.css` | Layout, responsive behavior, visual states, and design tokens |
| `script.js` | Validation, in-memory state, filtering, counters, and row actions |

## Scope note

This is a frontend-only Version 1. It does not include authentication, persistence, backend synchronization, or multi-user updates.
