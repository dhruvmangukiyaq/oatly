# Oatly — the Original Oat Drink Company (Clone / Redesign)

A React + Vite frontend inspired by [Oatly.com](https://www.oatly.com) — product showcase, recipes / look-books, news & initiatives, sustainability hub, health FAQ, contact / legal pages.

Built with full-stack MVC — React frontend (`src/`: api → models → controllers → components/pages) + Express backend (`server/`: routes → controllers → models). UI and functionality unchanged, only the organization.

> 🥛 Fictional / educational clone for learning purposes. Not affiliated with Oatly AB.

---

## ✨ Features

### 🛍️ Products
- `/products` — all oat drinks, barista, chocolate, yoghurt, ice-cream categories
- `/products/:category` — category-wise filtering via `productModel.js`
- Product quick-view modal (`ProductModal.jsx`) with nutrition + details
- Global search modal (`SearchModal.jsx`) — search products, recipes, articles

### 🍳 Recipes / Tastebuds
- `/recipes` — Tastebuds hub
- `/recipes/look-book-vol-3` + `/recipes/look-book-vol-3/:slug` — recipe list + detail
- `/recipes/look-book-autumn-winter-2025` (AW25) and `/recipes/look-book-spring-summer-2025` (SS25)
- `RecipeModal.jsx` for quick preview without routing

### 📰 News & Initiatives
- `/news` — news grid (`NewsGridSection`, `StoryCard`, `VideoCard`)
- `/things-we-do/:slug` — news story detail
- `/things-we-do/initiatives/future-of-taste` — special campaign page

### 🌱 Sustainability & Health
- `/sustainability` — Sustainability Hub
- `/oatly-who`, `/oatly-who/sustainability-plan`, `/oatly-who/sustainability-plan/climate-footprint-product-label`, `/sustainability/climate-solutions-company` — sub-pages via single `SustainabilitySubPage`
- `/health` + `/random-answers/17-facts-about-oatly-and-nutrition` — nutrition FAQ

### 📄 Company / Legal
- `/contact`, `/legal`, `/legal/privacy-policy`
- Shared `Navbar`, `Footer`, `SEO.jsx` (react-helmet-async), `BentoCard`, `FlatCard`, `PlaceholderMedia`

### 🎨 UI / UX
- Oatly-style brutalist design: thick borders, `shadow-brutal`, graph-paper background
- Custom Tailwind theme: `oatly-cream`, `oatly-yellow`, `oatly-pink`, `oatly-blue`, `oatly-mint`, `oatly-orange`
- Fonts: Fredoka, Outfit, Space Grotesk, Special Elite, Courier Prime
- Animations with `framer-motion`, icons with `lucide-react`

---

## 🧱 Tech Stack

| Tech | Version | Use |
|------|---------|-----|
| React + React DOM | ^19.2.8 | UI |
| Vite | ^8.2.2 | Dev server + build |
| react-router-dom | ^7.18.3 | Routing |
| Tailwind CSS | ^3.4.19 | Styling |
| framer-motion | ^13.2.0 | Animations |
| lucide-react | ^1.43.0 | Icons |
| react-helmet-async | ^3.0.0 | SEO meta |
| clsx + tailwind-merge | — | className utils |
| oxlint | ^1.79.0 | Linting |

---

## 📁 Project Structure

```
oatly/
├── index.html              # Title, meta, Google Fonts
├── vite.config.js          # Vite + React plugin + /api proxy → Express
├── tailwind.config.js      # Oatly colors, fonts, brutal shadows
├── postcss.config.js
├── public/                 # Static assets
├── server/                 # Express MVC backend (Node.js, port 8901)
│   ├── server.js           # Entry point (also serves ../dist in production)
│   ├── models/             # Data + pure query functions (no HTTP)
│   ├── controllers/        # Req/res handlers (no business logic)
│   ├── routes/             # Routers mounted under /api
│   └── README.md           # Endpoint table
├── src/                    # React frontend (one file per page/component)
│   ├── main.jsx            # React root
│   ├── App.jsx             # Composition root (providers, layout, modals)
│   ├── api/                # HTTP client for the backend (fetch layer)
│   ├── models/             # Async data-access over src/api (same names)
│   ├── controllers/        # Hooks bridging Model → View
│   ├── hooks/              # Shared hooks (useApiData)
│   ├── components/         # Navbar, Footer, Modals, Cards, SEO (one each)
│   ├── pages/              # Home, Products, LookBooks, News, etc. (one each)
│   ├── routes/             # Route definitions (AppRoutes)
│   ├── styles/             # All CSS
│   └── assets/
└── dist/                   # Production build output
```

**MVC flow:** `View (pages/components)` → `Controller (hooks)` → `Model (async)` → `API (fetch)` → `Express (routes → controllers → models → data)`. UI, design and functionality are unchanged — only the organization changed.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (20 LTS recommended)
- npm 9+

### 2. Install
```bash
npm install
npm run server:install   # one-time: Express backend deps
```

### 3. Run backend + frontend (two terminals)
```bash
npm run server   # Express API → http://localhost:8901
npm run dev      # Vite dev server → http://localhost:5173 (proxies /api)
```
Open http://localhost:5173

### 4. Build for production
```bash
npm run build    # frontend → dist/
npm run server   # serves both API + dist on http://localhost:8901
```

### 5. Lint
```bash
npm run lint
```

---

## 🛣️ Routes Reference

```
 /                                          Home
 /products                                  All Products
 /products/:category                        e.g. /products/oat-drink
 /recipes                                   → redirects to Look Book Vol. 3
 /recipes/look-book-vol-3                   Look Book Vol 3
 /recipes/look-book-vol-3/:slug             Recipe detail
 /recipes/look-book-autumn-winter-2025      AW25 Look Book
 /recipes/look-book-spring-summer-2025      SS25 Look Book
 /news                                      News hub
 /things-we-do/:slug                        News detail
 /things-we-do/initiatives/future-of-taste  Campaign
 /sustainability                            Sustainability hub
 /oatly-who*                                Sustainability sub-pages (4 routes)
 /health                                    Health FAQ
 /random-answers/17-facts-about-oatly-and-nutrition  Health alias
 /contact                                   Contact
 /legal                                     Legal
 /legal/privacy-policy                      Privacy Policy
```

---

## 🎨 Customization

**Colors & shadows — `tailwind.config.js`:**
```js
colors: { oatly: { cream:'#F5F2EB', yellow:'#FCEB50', pink:'#FF5C8D', ... } }
boxShadow: { brutal:'4px 4px 0px 0px #111111', ... }
```

**Fonts — `index.html`:**
Fredoka (hand), Outfit (sans), Space Grotesk (display), Special Elite + Courier Prime (typewriter accents)

**Add new product / recipe:** edit the dataset in `server/models/data/` (single source of truth) — both API and UI pick it up.

**Add new page:** 1) create `src/pages/MyPage.jsx` 2) add `<Route path="/my-page">` in `src/routes/AppRoutes.jsx` 3) add link in `server/models/navigationModel.js`.

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run server` | Start Express API backend (port 8901) |
| `npm run server:install` | One-time backend dep install |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Oxlint |

---

## 🤝 Contributing

1. Fork the repo
2. Create branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "feat: add my feature"`
4. Push + open PR

---

## 📄 License

No license specified (private learning project). If you make it public, add MIT.

---

Made with oats, React and Vite 🥛
