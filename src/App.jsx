import React, { useEffect, useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';

// ─── APP COMPOSITION ROOT ───────────────────────────────────────────────────
// Frontend structure:
//   src/api/         → HTTP client for the Express backend (fetch/axios layer)
//   src/models/      → async data-access over src/api (same names as before)
//   src/controllers/ → React hooks bridging Model → View
//   src/components/  → shared UI (one file per component)
//   src/pages/       → one file per page
//   src/routes/      → route definitions (AppRoutes)
//   src/styles/      → all CSS
//   src/assets/      → static assets
//   server/          → Express MVC backend (models/controllers/routes)

import { useAppController } from './controllers/useAppController.js';
import AppRoutes from './routes/AppRoutes';

// Shared Layout Components
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';

// Interactive Modal Components
import RecipeModal from './components/RecipeModal';
import ArticleModal from './components/ArticleModal';

// Section theme from the current route — every section gets its own
// signature background at first glance.
function sectionTheme(pathname = '/') {
  if (pathname.startsWith('/products')) return '';
  if (pathname.startsWith('/recipes')) return '';
  if (pathname.startsWith('/things-we-do') || pathname.startsWith('/news')) return 'theme-news';
  if (pathname.startsWith('/contact') || pathname.startsWith('/legal')) return 'theme-info';
  return '';
}

function ThemedMain({ selectRecipe, selectArticle }) {
  const { pathname } = useLocation();
  // Login page: full-height wash fill (so no white strip shows below)
  const fill = pathname.startsWith('/login') ? ' login-fill' : '';
  return (
    <main className={`flex-grow${fill} ${sectionTheme(pathname)}`}>
      <AppRoutes
        selectRecipe={selectRecipe}
        selectArticle={selectArticle}
      />
    </main>
  );
}

// Scroll to top helper
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scroller = document.querySelector('[data-app-scroll]');
    if (hash) {
      const element = scroller?.querySelector(hash) ?? document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    if (scroller) {
      scroller.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  // CONTROLLER: all UI selection state lives here (not in Views)
  const controller = useAppController();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <SiteChrome {...controller} />
        </MotionConfig>
      </BrowserRouter>
    </HelmetProvider>
  );
}

// Storefront chrome (header + modals + cart). The admin page (/admin) has its own
// top bar + sidebar — the storefront header (PRODUCTS/NEWS row) must NOT show
// there, so we hide it while that route is active.
function SiteChrome({
  selectedRecipe,
  selectRecipe,
  clearRecipe,
  selectedArticle,
  selectArticle,
  clearArticle,
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith('/admin');

  // Admin page: potano full-width layout (Seller Hub top bar + sidebar).
  // Storefront shell (cream frame + padding + teal border) is NOT here —
  // otherwise a white border would show around the admin page.
  if (isAdminPage) {
    return (
      <ThemedMain
        selectRecipe={selectRecipe}
        selectArticle={selectArticle}
      />
    );
  }

  // Storefront shell is the deep-space theme on EVERY route: dark base,
  // no cream frame, no teal border — same palette the home hero established.
  return (
    <div
      className={`app-shell bg-[#04060d] border-0 p-0 selection:bg-oatly-yellow selection:text-oatly-black font-sans`}
    >
      <div
        data-app-scroll
        className="app-frame bg-[#04060d] flex flex-col w-full h-full max-w-full"
      >
      {/* Navigation Bar — admin page par NAI */}
      {!isAdminPage && <Navbar onCartOpen={() => setCartOpen(true)} />}

      {/* Main Content Router (section-themed background) */}
      <ThemedMain
        selectRecipe={selectRecipe}
        selectArticle={selectArticle}
      />

      </div>

      {/* Modals + cart — not on the admin page (no shopping there) */}
      {!isAdminPage && (
        <>
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

          <RecipeModal
            recipe={selectedRecipe}
            onClose={clearRecipe}
          />

          <ArticleModal
            article={selectedArticle}
            onClose={clearArticle}
          />
        </>
      )}

    </div>
  );
}
