import React from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductListing from '../components/ProductListing';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// /products/:category = the same ProductListing layout with that tab active.
// Categories arrive from the Model (async Express API); unknown slugs fall
// back to ALL PRODUCTS.

import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';

export default function CategoryProductsPage({ onSelectProduct }) {
  const { category } = useParams();
  // MODEL (async API — page renders once categories arrive)
  const categories = useApiData(() => ProductModel.getProductCategories(), []);
  if (!categories) return null;

  const currentCategory = categories.find((c) => c.slug === category) || null;

  const items = !currentCategory
    ? // Unknown slug: show everything, no tab highlighted as current.
      categories.flatMap((cat) => cat.items || [])
    : currentCategory.items || [];

  return (
    <>
      <SEO
        title={`${currentCategory ? currentCategory.name : 'Products'}`}
        description={
          currentCategory
            ? currentCategory.description
            : 'Browse the full Oatly product range.'
        }
        pathname={`/products/${category}`}
      />
      <ProductListing
        categories={categories}
        activeSlug={currentCategory ? currentCategory.slug : null}
        items={items}
        onSelectProduct={onSelectProduct}
      />
    </>
  );
}
