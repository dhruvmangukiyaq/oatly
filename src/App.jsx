import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Shared Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Interactive Modals
import SearchModal from './components/SearchModal';
import ProductModal from './components/ProductModal';
import RecipeModal from './components/RecipeModal';
import ArticleModal from './components/ArticleModal';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import TastebudsPage from './pages/TastebudsPage';
import LookBookVol3Page from './pages/LookBookVol3Page';
import RecipeDetailPage from './pages/RecipeDetailPage';
import LookBookAW25Page from './pages/LookBookAW25Page';
import LookBookSS25Page from './pages/LookBookSS25Page';
import FutureOfTastePage from './pages/FutureOfTastePage';
import NewsPage from './pages/NewsPage';
import NewsStoryDetailPage from './pages/NewsStoryDetailPage';
import SustainabilityPage from './pages/SustainabilityPage';
import SustainabilitySubPage from './pages/SustainabilitySubPage';
import HealthPage from './pages/HealthPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

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
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-graph-paper border-[8px] border-[#466874] text-oatly-black selection:bg-oatly-yellow selection:text-oatly-black font-sans p-5">
          <div className="max-w-[1480px] mx-auto bg-[#FFFEF8] border-[1.5px] border-black flex flex-col min-h-[calc(100vh-58px)]">
          {/* Navigation Bar */}
          <Navbar onOpenSearch={() => setSearchOpen(true)} />

          {/* Main Content Router */}
          <main className="flex-grow">
            <Routes>
              {/* Home */}
              <Route
                path="/"
                element={
                  <HomePage
                    onSelectProduct={(p) => setSelectedProduct(p)}
                    onSelectRecipe={(r) => setSelectedRecipe(r)}
                    onSelectArticle={(a) => setSelectedArticle(a)}
                  />
                }
              />

              {/* Products Routes */}
              <Route
                path="/products"
                element={
                  <ProductsPage
                    onSelectProduct={(p) => setSelectedProduct(p)}
                  />
                }
              />
              <Route
                path="/products/:category"
                element={<CategoryProductsPage />}
              />

              {/* Recipes & Tastebuds Routes */}
              <Route
                path="/recipes"
                element={
                  <TastebudsPage
                    onSelectRecipe={(r) => setSelectedRecipe(r)}
                  />
                }
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
                    onSelectArticle={(a) => setSelectedArticle(a)}
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
            onClose={() => setSearchOpen(false)}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />

          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />

          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
          />

          <ArticleModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />

        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
