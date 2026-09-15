import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductListing from '../components/ProductListing';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// /products/:category = the same ProductListing layout with that tab active.
// Lookup via Model/Controller; unknown slugs fall back to ALL PRODUCTS.

import ProductModel from '../../models/productModel.js';

export default function CategoryProductsPage({ onSelectProduct }) {
  const { category } = useParams();
  const categories = useMemo(() => ProductModel.getProductCategories(), []);

  const currentCategory = ProductModel.getCategoryBySlug(category) || null;

  const items = useMemo(() => {
    if (!currentCategory) {
      // Unknown slug: show everything, no tab highlighted as current.
      return categories.flatMap((cat) =>
        (cat.items || []).map((item) => ({ ...item, _categorySlug: cat.slug }))
      );
    }
    return (currentCategory.items || []).map((item) => ({
      ...item,
      _categorySlug: currentCategory.slug,
    }));
  }, [categories, currentCategory]);

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
