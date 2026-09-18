import React, { useEffect } from 'react';
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

// Interactive Modal Components
import CustomCursor from './components/CustomCursor';
import SearchModal from './components/SearchModal';
import ProductModal from './components/ProductModal';
import RecipeModal from './components/RecipeModal';
import ArticleModal from './components/ArticleModal';

// Section theme from the current route — every section gets its own
// signature background at first glance.
function sectionTheme(pathname = '/') {
  if (pathname.startsWith('/products')) return '';
  if (pathname.startsWith('/recipes')) return '';
  if (pathname.startsWith('/things-we-do') || pathname.startsWith('/news')) return 'theme-news';
  if (pathname.startsWith('/sustainability') || pathname.startsWith('/oatly-who')) return 'theme-sustainability';
  if (pathname.startsWith('/health') || pathname.startsWith('/random-answers')) return 'theme-health';
  if (pathname.startsWith('/contact') || pathname.startsWith('/legal')) return 'theme-info';
  return '';
}

function ThemedMain({ selectProduct, selectRecipe, selectArticle }) {
  const { pathname } = useLocation();
  return (
    <main className={`flex-grow ${sectionTheme(pathname)}`}>
      <AppRoutes
        selectProduct={selectProduct}
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
  const {
    searchOpen,
    openSearch,
    closeSearch,
    selectedProduct,
    selectProduct,
    clearProduct,
    selectedRecipe,
    selectRecipe,
    clearRecipe,
    selectedArticle,
    selectArticle,
    clearArticle,
  } = useAppController();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <div className="app-shell bg-graph-paper border-0 sm:border-[4px] md:border-[6px] lg:border-[8px] border-[#466874] text-oatly-black selection:bg-oatly-yellow selection:text-oatly-black font-sans p-0 sm:p-2 md:p-2.5 lg:p-3.5">
          <div data-app-scroll className="app-frame bg-[#FFFEF8] flex flex-col w-full h-full max-w-full">
          {/* Navigation Bar */}
          <Navbar onOpenSearch={openSearch} />

          {/* Main Content Router (section-themed background) */}
          <ThemedMain
            selectProduct={selectProduct}
            selectRecipe={selectRecipe}
            selectArticle={selectArticle}
          />

          </div>

          {/* Modals */}
          <SearchModal
            isOpen={searchOpen}
            onClose={closeSearch}
            onSelectProduct={selectProduct}
          />

          <ProductModal
            product={selectedProduct}
            onClose={clearProduct}
          />

          <RecipeModal
            recipe={selectedRecipe}
            onClose={clearRecipe}
          />

          <ArticleModal
            article={selectedArticle}
            onClose={clearArticle}
          />

          {/* Custom cursor (mouse devices only; sits above everything) */}
          <CustomCursor />

        </div>
        </MotionConfig>
      </BrowserRouter>
    </HelmetProvider>
  );
}
