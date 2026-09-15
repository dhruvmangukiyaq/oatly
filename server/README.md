# Oatly API (Express MVC backend)

JSON API for the Oatly clone frontend. Structure:

```
server/
├── server.js          # Express entry point (also serves ../dist in production)
├── models/            # Data + pure query functions (no HTTP)
│   ├── productModel.js / recipeModel.js / newsModel.js
│   ├── navigationModel.js / contentModel.js / searchModel.js
│   └── data/          # Static datasets (single source of truth)
├── controllers/       # Req/res handlers (no business logic)
└── routes/            # Express routers mounted under /api
```

## Run

```bash
npm --prefix server install   # one-time
npm run server                # http://localhost:8901 (see root package.json)
```

Frontend dev server proxies `/api/*` to `http://localhost:8901` (vite.config.js),
so run both `npm run dev` and `npm run server` together.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/navigation | Header nav items + dropdowns |
| GET | /api/content/home | Homepage images + cards |
| GET | /api/content/sustainability | Sustainability hub data |
| GET | /api/content/plan | Sustainability plan |
| GET | /api/content/nutrition | Nutrition facts |
| GET | /api/content/future-of-taste | Future of Taste report |
| GET | /api/content/meta | Site meta |
| GET | /api/products?category=&q= | Filtered products |
| GET | /api/products/categories | All categories with items |
| GET | /api/products/category/:slug | One category + its products |
| GET | /api/recipes/vol3 | Vol.3 recipes + page content |
| GET | /api/recipes/aw25 | A/W 25 collection |
| GET | /api/recipes/ss25 | S/S 25 collection |
| GET | /api/recipes/slug/:slug | One recipe (any collection) |
| GET | /api/news | News + stories |
| GET | /api/news/:slug | One story |
| GET | /api/search?q= | Products + recipes + news + popular |
