import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// ─── MVC WIRING ─────────────────────────────────────────────────────────────
// Model    → src/models/*.js      (pure JavaScript data + business logic)
// View     → src/views/**/*.jsx   (React presentation only, receives props)
// Controller → src/controllers/*.js (pure JavaScript hooks bridging Model→View)
// This file (App.jsx) is the composition root: it calls the Controller and
// passes Model data down to Views via props. Views never import Models directly
// except via Controllers where local filtering is needed.

import { useAppController } from './controllers/useAppController.js';

// Shared Layout Views
import Navbar from './views/components/Navbar';
import Footer from './views/components/Footer';

// Interactive Modal Views
import SearchModal from './views/components/SearchModal';
import ProductModal from './views/components/ProductModal';
import RecipeModal from './views/components/RecipeModal';
import ArticleModal from './views/components/ArticleModal';

// Page Views
import HomePage from './views/pages/HomePage';
import ProductsPage from './views/pages/ProductsPage';
import CategoryProductsPage from './views/pages/CategoryProductsPage';
import LookBookVol3Page from './views/pages/LookBookVol3Page';
import RecipeDetailPage from './views/pages/RecipeDetailPage';
import LookBookAW25Page from './views/pages/LookBookAW25Page';
import LookBookSS25Page from './views/pages/LookBookSS25Page';
import FutureOfTastePage from './views/pages/FutureOfTastePage';
import NewsPage from './views/pages/NewsPage';
import NewsStoryDetailPage from './views/pages/NewsStoryDetailPage';
import SustainabilityPage from './views/pages/SustainabilityPage';
import SustainabilitySubPage from './views/pages/SustainabilitySubPage';
import HealthPage from './views/pages/HealthPage';
import ContactPage from './views/pages/ContactPage';
import LegalPage from './views/pages/LegalPage';
import PrivacyPolicyPage from './views/pages/PrivacyPolicyPage';

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
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={
                  <HomePage
                    onSelectProduct={selectProduct}
                    onSelectRecipe={selectRecipe}
                    onSelectArticle={selectArticle}
                  />
                }
              />

              {/* Products Routes */}
              <Route
                path="/products"
                element={
                  <ProductsPage
                    onSelectProduct={selectProduct}
                  />
                }
              />
              <Route
                path="/products/:category"
                element={
                  <CategoryProductsPage
                    onSelectProduct={selectProduct}
                  />
                }
              />

              {/* Recipes & Tastebuds Routes */}
              {/* TASTEBUDS lands directly on LOOK BOOK VOL. 3 (latest book) */}
              <Route
                path="/recipes"
                element={<Navigate to="/recipes/look-book-vol-3" replace />}
              />
              <Route
                path="/recipes/look-book-vol-3"
                element={<LookBookVol3Page />}
              />
              <Route
                path="/recipes/look-book-vol-3/:slug"
                element={<RecipeDetailPage />}
              />
              <Route
                path="/recipes/look-book-autumn-winter-2025/:slug"
                element={<RecipeDetailPage />}
              />
              <Route
                path="/recipes/look-book-spring-summer-2025/:slug"
                element={<RecipeDetailPage />}
              />
              <Route
                path="/recipes/look-book-autumn-winter-2025"
                element={<LookBookAW25Page />}
              />
              <Route
                path="/recipes/look-book-spring-summer-2025"
                element={<LookBookSS25Page />}
              />

              {/* News & Initiatives Routes */}
              <Route
                path="/news"
                element={
                  <NewsPage
                    onSelectArticle={selectArticle}
                  />
                }
              />
              <Route
                path="/things-we-do/:slug"
                element={<NewsStoryDetailPage />}
              />
              <Route
                path="/things-we-do/initiatives/future-of-taste"
                element={<FutureOfTastePage />}
              />

              {/* Sustainability Hub & Sub-pages */}
              <Route
                path="/sustainability"
                element={<SustainabilityPage />}
              />
              <Route
                path="/oatly-who"
                element={<SustainabilitySubPage />}
              />
              <Route
                path="/oatly-who/sustainability-plan"
                element={<SustainabilitySubPage />}
              />
              <Route
                path="/oatly-who/sustainability-plan/climate-footprint-product-label"
                element={<SustainabilitySubPage />}
              />
              <Route
                path="/sustainability/climate-solutions-company"
                element={<SustainabilitySubPage />}
              />

              {/* Health & Nutrition FAQ */}
              <Route
                path="/health"
                element={<HealthPage />}
              />
              <Route
                path="/random-answers/17-facts-about-oatly-and-nutrition"
                element={<HealthPage />}
              />

              {/* Contact, Legal & Privacy */}
              <Route
                path="/contact"
                element={<ContactPage />}
              />
              <Route
                path="/legal"
                element={<LegalPage />}
              />
              <Route
                path="/legal/privacy-policy"
                element={<PrivacyPolicyPage />}
              />
            </Routes>
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
