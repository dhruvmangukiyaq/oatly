import { useMemo } from 'react';
import ProductModel from '../models/productModel.js';
import { useApiData } from './useApiData.js';
import { getProductOverrides, mergeProducts } from '../models/adminStore.js';
import { enrichProduct } from '../models/shopStore.js';

// Backend products + admin overrides + default price/stock/rating → shop-ready list
export function useCatalog() {
  const base = useApiData(() => ProductModel.getAllProducts(), null);
  const categories = useApiData(() => ProductModel.getProductCategories(), null);

  const products = useMemo(() => {
    if (!Array.isArray(base)) return [];
    const overrides = getProductOverrides();
    const merged = mergeProducts(base);
    return merged
      .map((p) => enrichProduct(p, overrides))
      .filter((p) => p.status !== 'archived');
  }, [base]);

  const flatCategories = useMemo(() => {
    if (Array.isArray(categories)) return categories;
    return [];
  }, [categories]);

  return { products, categories: flatCategories, loading: base === null };
}

export function findProduct(products, id) {
  return (products || []).find((p) => String(p.id ?? p.slug ?? p.name) === String(id));
}
