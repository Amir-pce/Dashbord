# Admin Dashboard

A multi-page, fully responsive admin panel built as a static front end. Right-to-left
throughout, with Persian as the interface language.

**[Live demo](https://amir-pce.github.io/Dashbord/)** · [Persian documentation](README.fa.md)

## What it does

| Page | |
| --- | --- |
| `index.html` | Sign-in, with show/hide password and client-side validation |
| `dashboard.html` | Stat cards, line and donut charts, recent orders, activity feed |
| `analytics.html` | Four chart types — bar, donut, horizontal bar, radar |
| `users.html` | Full CRUD against a REST table API, with search and filtering |
| `products.html` | Product grid |
| `orders.html` | Orders with tabbed filtering |
| `profile.html` | Editable profile |
| `settings.html` | General, notification, security and appearance tabs |

## Worth noting

- **Auth guard.** Sign-in state is held in `localStorage` and every page checks it before
  rendering, so a direct link to an inner page redirects back to the login screen.
- **Dark mode** that survives a reload, stored the same way.
- **Collapsible sidebar** — it collapses to icons on desktop and becomes a drawer on
  mobile, rather than two separate layouts.
- **RTL from the start**, not a mirrored LTR layout. Bootstrap 5's RTL build does the
  heavy lifting; the spacing and icon directions are handled on top of it.

## Built with

HTML5 · CSS3 · JavaScript · jQuery · Bootstrap 5

No build step and no framework. Clone it and open `index.html`.
