import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

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
import Footer from './components/Footer';

// Interactive Modal Components
import SearchModal from './components/SearchModal';
import ProductModal from './components/ProductModal';
import RecipeModal from './components/RecipeModal';
import ArticleModal from './components/ArticleModal';

// Scroll to top helper
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
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
        <ScrollToTop />
        <div className="min-h-screen bg-graph-paper border-[8px] border-[#466874] text-oatly-black selection:bg-oatly-yellow selection:text-oatly-black font-sans p-5">
          <div className="max-w-[1480px] mx-auto bg-[#FFFEF8] border-[1.5px] border-black flex flex-col min-h-[calc(100vh-58px)]">
          {/* Navigation Bar */}
          <Navbar onOpenSearch={openSearch} />

          {/* Main Content Router */}
          <main className="flex-grow">
            <AppRoutes
              selectProduct={selectProduct}
              selectRecipe={selectRecipe}
              selectArticle={selectArticle}
            />
          </main>

          {/* Shared Footer */}
          <Footer />
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

        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
