# NXY LI

A workspace/tech-accessories storefront — product catalogue, filtering, cart, and checkout, built on a static-HTML frontend with a small FastAPI backend.

## Stack

- **Frontend**: plain HTML/CSS/JS. Pages are authored as HTML with `sc-for`/`sc-if`/`{{ }}` template syntax, compiled to React at runtime by `support.js` (React is vendored locally in `react.min.js` / `react-dom.min.js`, no build step or CDN dependency).
- **Backend**: FastAPI + SQLAlchemy + SQLite (`backend/`), exposing products, cart, orders, newsletter, and JWT auth endpoints.

## Running locally

**Backend** (from `backend/`):
```
python3 -m venv venv          # first time only
venv/bin/pip install -r requirements.txt
venv/bin/python seed.py       # populates the product catalogue (safe to re-run)
venv/bin/uvicorn main:app --port 8000
```

**Frontend** (from the project root, separate terminal):
```
python3 -m http.server 8080
```
Then open `http://localhost:8080/index.html`.

The frontend reads `NOMA_PRODUCTS`/static data first so pages render even if the backend isn't running, then refreshes from `http://localhost:8000` in the background. Cart, checkout, and orders require the backend.

## Pages

`index.html` (home), `collection.html` (catalogue with filters), `product.html?id=<sku>` (PDP), `checkout.html`, `confirmation.html`, `login.html` (sign in / create account).

## Known limitations

- `login.html` covers sign in/register/sign out against the real backend, but there's no full account dashboard (order history, profile editing).
- Footer legal links (Shipping, Returns, Warranty, FAQ, About, Sustainability, Press) are placeholders.
- CORS is wide open (`allow_origins=["*"]`) in `backend/main.py` — fine for local dev, tighten before any real deployment.
- `design-source/` holds the original AI-generated design-direction mockups (`*.dc.html`) — not served, kept for reference only.
