// ─── APP ROUTES ─────────────────────────────────────────────────────────────
// All route definitions live here (one place). App.jsx stays the composition
// root: providers, layout frame, navbar/footer, modals.

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page Views (one file per page → src/pages/)
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import CategoryProductsPage from '../pages/CategoryProductsPage';
import LookBookVol3Page from '../pages/LookBookVol3Page';
import RecipeDetailPage from '../pages/RecipeDetailPage';
import LookBookAW25Page from '../pages/LookBookAW25Page';
import LookBookSS25Page from '../pages/LookBookSS25Page';
import FutureOfTastePage from '../pages/FutureOfTastePage';
import NewsPage from '../pages/NewsPage';
import NewsStoryDetailPage from '../pages/NewsStoryDetailPage';
import SustainabilityPage from '../pages/SustainabilityPage';
import SustainabilitySubPage from '../pages/SustainabilitySubPage';
import HealthPage from '../pages/HealthPage';
import ContactPage from '../pages/ContactPage';
import LegalPage from '../pages/LegalPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';

export default function AppRoutes({ selectProduct, selectRecipe, selectArticle }) {
  return (
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
  );
}
