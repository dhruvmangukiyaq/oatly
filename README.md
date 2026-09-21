<div align="center">

# 🥛 Oatly Clone — Full-Stack Web Application

<p align="center">
  <strong>A modern, responsive, full-stack recreation of the iconic <a href="https://www.oatly.com" target="_blank">Oatly.com</a> website.</strong><br />
  Featuring brutalist aesthetics, dynamic product showcases, interactive recipe look-books, sustainability initiatives, and an Express MVC backend.
</p>

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br />

[Explore Features](#-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started) • [Author](#-author)

</div>

---

## 📖 Overview

This project is a high-fidelity **Oatly Website Clone** built to demonstrate modern full-stack web development practices, clean architecture, and bold UI design. It captures Oatly's distinctive, quirky, brutalist identity—complete with high-contrast borders, playful typography, vibrant pastel palettes, micro-interactions, and a decoupled **Express.js MVC API** backend serving a **React 19** frontend.

> ⚠️ **Disclaimer:** This project is an independent educational clone created for portfolio and learning purposes. It is not affiliated with, endorsed by, or sponsored by Oatly AB.

---

## ✨ Features

### 🛍️ 1. Interactive Product Catalog
- **Category Browsing:** Filter by Oat Drinks, Barista Editions, Oatgurt, Ice Cream, and more (`/products`, `/products/:category`).
- **Product Quick-View Modal:** Detailed nutritional breakdowns, allergen alerts, and carton specs with smooth transitions (`ProductModal.jsx`).

### 🍳 2. Tastebuds & Recipe Look-Books
- **Recipe Showcase:** Dynamic editorial-style collections including Look Book Vol. 3, Autumn/Winter 2025 (AW25), and Spring/Summer 2025 (SS25).
- **Recipe Details:** Step-by-step instructions, ingredients list, and modal previews (`RecipeModal.jsx`).
- **Cooking Show Pages:** Episode-style stories with embedded films and full recipes — *Last First Dates with Maxence* (`/things-we-do/last-first-dates`).

### 📰 3. News, Stories & Initiatives
- **Editorial Hub:** Grid-based news section showcasing Oatly campaigns, video cards, and cultural stories (`/things-we-do`, `/news`).
- **Special Campaign Pages (copy-to-copy with oatly.com):**
  - *Pee for the Planet* — interactive Pee-O-Meter + storybook (`/things-we-do/initiatives/pee-for-the-planet`)
  - *Oatly x AVAVAV* — Milan Fashion Week black editorial (`/things-we-do/initiatives/oatly-x-avavav`)
  - *How Do You Say F.A.R.M. in Canadian?* — Hanover Ridge Farms story with film + photo slideshow (`/things-we-do/how-do-you-say-f-a-r-m-in-canadian`)
  - *Future of Taste* (`/things-we-do/initiatives/future-of-taste`)

### 🌱 4. Sustainability & Health Information
- **Sustainability Hub:** Comprehensive overview of environmental impact, climate footprint labeling, and corporate responsibility (`/sustainability`, `/oatly-who/*`).
- **Nutrition & Health FAQ:** Facts and common consumer questions answered with signature Oatly humor (`/health`).

### 🎨 5. Signature Brutalist UI/UX
- **Bold Brutalist Theme:** Thick borders (`border-2`, `border-black`), tactile drop shadows (`shadow-brutal`), and custom graph-paper grid backgrounds.
- **Custom Oatly Palette:** Oatly Cream, Yellow, Blue, Pink, Mint, and Orange color schemes.
- **Dynamic Typography:** Google Fonts pairing (Fredoka, Outfit, Space Grotesk, Special Elite, Courier Prime) plus bundled Oatly brand fonts (Margo Pro, Girdo Black Pro, Toni Noveau Pro).
- **Fluid Micro-Animations:** Motion transitions powered by Framer Motion, plus scroll-triggered entrances built on IntersectionObserver.

---

## 🧱 Tech Stack

### Frontend
- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **SEO & Meta:** [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **Code Quality:** [Oxlint](https://oxc.rs/)

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Server Framework:** [Express.js](https://expressjs.com/)
- **Architecture Pattern:** Model-View-Controller (MVC)
- **CORS & Compression:** Built-in middleware for static serving and cross-origin resource sharing

---

## 📁 Project Structure

```bash
oatly/
├── index.html                 # HTML shell, fonts & meta tags
├── vite.config.js             # Vite configuration with /api reverse proxy
├── tailwind.config.js         # Custom Oatly theme, brutal shadows & typography
├── postcss.config.js          # PostCSS plugins
├── package.json               # Root dependencies & unified runner scripts
│
├── server/                    # 🚀 Express Backend (Port 8901)
│   ├── server.js              # Server entry point & static dist serving
│   ├── models/                # Data access layers & query functions
│   │   ├── data/              # Source datasets (Products, Recipes, News, Nav)
│   │   ├── productModel.js
│   │   ├── recipeModel.js
│   │   ├── newsModel.js
│   │   └── navigationModel.js
│   ├── controllers/           # Request & response handlers
│   └── routes/                # Modular API route definitions (/api/*)
│
├── src/                       # ⚛️ React Frontend (Vite)
│   ├── main.jsx               # React DOM entry point
│   ├── App.jsx                # Global providers, layout & route container
│   ├── api/                   # API client service layer (fetch wrappers)
│   ├── models/                # Frontend async models bridging API
│   ├── controllers/           # Custom React hooks (MVC controller layer)
│   ├── hooks/                 # Utility hooks (e.g., useApiData)
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Main navigation with mobile drawer
│   │   ├── Footer.jsx         # Oatly footer with newsletter & links
│   │   ├── ProductModal.jsx   # Nutritional quick-view dialog
│   │   ├── RecipeModal.jsx    # Quick recipe viewer
│   │   ├── ArticleModal.jsx   # Article preview dialog
│   │   └── SEO.jsx            # Dynamic meta tags & titles
│   ├── pages/                 # Full page views (Home, Products, Recipes, News, etc.)
│   ├── routes/                # Route table (AppRoutes.jsx)
│   ├── styles/                # Global CSS styles
│   └── fonts/                 # Bundled Oatly brand webfonts
│
└── public/                    # Static assets, fonts, icons & images
```

---

## 🚀 Getting Started

Follow these steps to run the Oatly Clone locally on your machine.

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version `18.x` or `20.x` LTS recommended)
- [npm](https://www.npmjs.com/) (version `9.x` or higher) or `pnpm` / `yarn`
- [Git](https://git-scm.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/dhruvmangukiyaq/oatly.git
cd oatly
```

### 3. Install Dependencies
Install both the root frontend packages and backend server dependencies:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run server:install
```

### 4. Run Development Servers
To run both the frontend and backend in development mode, open two terminal windows:

**Terminal 1 — Backend API:**
```bash
npm run server
# Express API will run at http://localhost:8901
```

**Terminal 2 — Frontend Dev Server:**
```bash
npm run dev
# Vite server will run at http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser. (The frontend automatically proxies `/api` requests to the Express server).

---

## 🛠️ Available Scripts

| Script | Command | Description |
|---|---|---|
| **Dev Frontend** | `npm run dev` | Starts the Vite dev server with Hot Module Replacement (HMR) |
| **Start Backend** | `npm run server` | Starts the Express.js API backend on port `8901` |
| **Install Backend** | `npm run server:install` | One-time command to install backend dependencies in `/server` |
| **Build Frontend** | `npm run build` | Compiles optimized production bundle into `dist/` |
| **Preview Build** | `npm run preview` | Locally preview the compiled production build |
| **Lint Code** | `npm run lint` | Runs Oxlint to check code quality and syntax |

---

## 🚢 Production Deployment

To run this project as a unified single-server production app:

```bash
# 1. Build the frontend
npm run build

# 2. Run the Express server (it serves the compiled frontend from dist/ + API endpoints)
npm run server
```

The app will be accessible at `http://localhost:8901`.

---

## 🧑‍💻 Author

**Dhruv Mangukiya**
- GitHub: [@dhruvmangukiyaq](https://github.com/dhruvmangukiyaq)
- Email: [dhruvmangukiya111@gmail.com](mailto:dhruvmangukiya111@gmail.com)

---

<div align="center">
  <sub>Made with ❤️, oats, and code by Dhruv Mangukiya</sub>
</div>
