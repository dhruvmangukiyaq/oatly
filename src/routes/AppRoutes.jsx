// ─── APP ROUTES ─────────────────────────────────────────────────────────────
// All route definitions live here (one place). App.jsx stays the composition
// root: providers, layout frame, navbar/footer, modals.
//
// PERFORMANCE: pages are React.lazy code-split — each route chunk loads only
// on first visit, so the initial bundle stays small and the app opens fast.

import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Page Views (one file per page → src/pages/) — lazy-loaded.
const HomePage = lazy(() => import('../pages/HomePage'));
const ProductsPage = lazy(() => import('../pages/ProductsPage'));
const CategoryProductsPage = lazy(() => import('../pages/CategoryProductsPage'));
const LookBookVol3Page = lazy(() => import('../pages/LookBookVol3Page'));
const RecipeDetailPage = lazy(() => import('../pages/RecipeDetailPage'));
const LookBookAW25Page = lazy(() => import('../pages/LookBookAW25Page'));
const LookBookSS25Page = lazy(() => import('../pages/LookBookSS25Page'));
const FutureOfTastePage = lazy(() => import('../pages/FutureOfTastePage'));
const PeeForPlanetPage = lazy(() => import('../pages/PeeForPlanetPage'));
const OatlyXAvavavPage = lazy(() => import('../pages/OatlyXAvavavPage'));
const FarmCanadianPage = lazy(() => import('../pages/FarmCanadianPage'));
const LastFirstDatesPage = lazy(() => import('../pages/LastFirstDatesPage'));
const NewsStoryDetailPage = lazy(() => import('../pages/NewsStoryDetailPage'));
const ThingsWeDoPage = lazy(() => import('../pages/ThingsWeDoPage'));
const SustainabilityPage = lazy(() => import('../pages/SustainabilityPage'));
const SustainabilitySubPage = lazy(() => import('../pages/SustainabilitySubPage'));
const HealthPage = lazy(() => import('../pages/HealthPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const LegalPage = lazy(() => import('../pages/LegalPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/PrivacyPolicyPage'));

export default function AppRoutes({ selectProduct, selectRecipe, selectArticle }) {
  return (
    <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
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
          path="/things-we-do"
          element={<ThingsWeDoPage onSelectArticle={selectArticle} />}
        />
        <Route
          path="/things-we-do/stories"
          element={<ThingsWeDoPage onSelectArticle={selectArticle} />}
        />
        <Route
          path="/things-we-do/initiatives"
          element={<ThingsWeDoPage onSelectArticle={selectArticle} />}
        />
        <Route
          path="/things-we-do/brainwashing"
          element={<ThingsWeDoPage onSelectArticle={selectArticle} />}
        />
        {/* NEWS nav lands on /things-we-do (sem-to-sem with oatly.com);
            /news kept as a deep link that redirects there */}
        <Route
          path="/news"
          element={<Navigate to="/things-we-do" replace />}
        />
        <Route
          path="/things-we-do/pee-for-the-planet"
          element={<Navigate to="/things-we-do/initiatives/pee-for-the-planet" replace />}
        />
        <Route
          path="/things-we-do/oatly-x-avavav"
          element={<OatlyXAvavavPage />}
        />
        <Route
          path="/things-we-do/how-do-you-say-f-a-r-m-in-canadian"
          element={<FarmCanadianPage />}
        />
        <Route
          path="/things-we-do/stories/how-do-you-say-f-a-r-m-in-canadian"
          element={<FarmCanadianPage />}
        />
        <Route
          path="/things-we-do/last-first-dates"
          element={<LastFirstDatesPage />}
        />
        <Route
          path="/things-we-do/stories/last-first-dates"
          element={<LastFirstDatesPage />}
        />
        <Route
          path="/things-we-do/:slug"
          element={<NewsStoryDetailPage />}
        />
        <Route
          path="/things-we-do/stories/:slug"
          element={<NewsStoryDetailPage />}
        />
        <Route
          path="/things-we-do/stories/*"
          element={<NewsStoryDetailPage />}
        />
        <Route
          path="/things-we-do/initiatives/:slug"
          element={<NewsStoryDetailPage />}
        />
        <Route
          path="/things-we-do/initiatives/future-of-taste"
          element={<FutureOfTastePage />}
        />
        <Route
          path="/things-we-do/initiatives/pee-for-the-planet"
          element={<PeeForPlanetPage />}
        />
        <Route
          path="/things-we-do/initiatives/oatly-x-avavav"
          element={<OatlyXAvavavPage />}
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

        {/* Unknown URLs render Home instead of a blank page */}
        <Route
          path="*"
          element={
            <HomePage
              onSelectProduct={selectProduct}
              onSelectRecipe={selectRecipe}
              onSelectArticle={selectArticle}
            />
          }
        />
      </Routes>
    </Suspense>
  );
}