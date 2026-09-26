# NXY LI — Portfolio Case Study

**Role:** Solo full-stack developer
**Stack:** FastAPI · SQLite · vanilla JS/React runtime
**Type:** Portfolio project

A full-stack e-commerce build made to show what I can actually ship — not a mockup, a working store.

---

## 01 — Overview

NXY LI is a storefront for premium desk and workspace accessories — keyboards, monitors, desks, seating. It isn't a real business. It's a demonstration built to show the kind of e-commerce experience I deliver for clients: real browsing, filtering, cart, checkout, and account creation, backed by an actual database and API rather than a static design file.

The goal was to build something a client could click through end to end — add something to a cart, check out, create an account — and feel confident the same rigor would go into their own site.

## 02 — Stack

**Frontend**
Hand-written HTML/CSS/JS, no build step. Pages use a lightweight `{{ }}` / `sc-for` / `sc-if` template syntax that compiles to React at runtime. React itself is vendored locally — zero external runtime dependencies.

**Backend**
FastAPI + SQLAlchemy + SQLite, with routers for products, cart, orders, newsletter signup, and JWT-based authentication.

## 03 — What it does

- Product catalogue with category, connectivity, and price filtering — grid and list views
- Persistent cart that survives reloads and stays in sync across open tabs
- Full checkout → order-creation → confirmation flow against a real backend
- Account system: register, sign in, sign out, session persistence
- Responsive from the ground up — verified at 390px width, not just "doesn't look broken on a laptop"

## 04 — Design decisions

The palette and type were chosen to feel intentional rather than ornamental: a warm stone ground, near-black text, and one denim-blue accent used sparingly, only at points of interaction. A serif display face carries headlines with a literary weight; a grotesque sans handles body copy; a monospace marks prices, labels, and anything system-feeling — a pairing that echoes the product itself: functional objects finished with quiet care.

| Token | Hex |
|---|---|
| Stone (background) | `#ECEAE4` |
| Ink (text) | `#16150F` |
| Denim (accent) | `#3F5D8C` |
| Faint (muted) | `#8A877E` |
| Card | `#F4F2EC` |

## 05 — What I actually found and fixed

Any build ships with debt. This is the useful part of a case study: not the feature list, but what broke and how it got fixed under real scrutiny.

**Rendering bug** — Unresolved template placeholders were requested as literal image URLs before the page's JS finished loading — real 404s and a broken SVG icon on every page load. Fixed by moving templated attributes to `data-*` and remapping them at the compiler level, so the browser never touches them before hydration.

**Mobile-breaking** — A dead nav link pushed the cart button 89px past the edge of the screen on mobile — completely unreachable on any phone. Rebuilt the responsive breakpoints site-wide and verified with real viewport testing at 390px, not a resize-and-eyeball check.

**Backend** — Account registration was silently broken — a `passlib`/`bcrypt` version mismatch crashed the server on every signup attempt. Found via server logs, fixed by pinning a compatible version.

**Missing asset** — Order-confirmation pages showed broken product thumbnails — a missing script include meant the image-URL helper was never loaded on that page. One-line fix, real impact on every completed order.

## 06 — What's next

- Deploy to a live URL
- Full account dashboard — order history, saved addresses
- Real payment processing via Stripe
- Japanese localization for a bilingual storefront

---

**Kaung Myat Thu** — Full-stack web developer
kaungkmt23@gmail.com
