import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// /search?q=… — the search results PAGE the home search bar lands on (Enter),
// instead of the old popup. Products come from the same model /products uses
// and are matched with the SHARED matcher (src/utils/productSearch.js), so
// the count above equals what the grid shows — admin-added products included.
// The filter panel ships HIDDEN inside ProductListing: it only opens when the
// user clicks the sliders (hide) icon in the listing toolbar.
import SEO from '../components/SEO';
import ProductListing from '../components/ProductListing';
import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { applyAdminVisibility } from '../models/adminStore.js';
import { matchesProduct } from '../utils/productSearch.js';
import '../styles/SearchResults.css';

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const [term, setTerm] = useState(q);
  const [seenQ, setSeenQ] = useState(q);
  const navigate = useNavigate();

  // MODEL (async API — the page renders once the catalogue arrives)
  const categories = useApiData(() => ProductModel.getProductCategories(), []);

  // Back/forward to another ?q= refills the field (adjust-state-during-render,
  // before the early return, so the hook order stays unconditional).
  if (q !== seenQ) {
    setSeenQ(q);
    setTerm(q);
  }

  if (!categories) return null;

  const allItems = categories.flatMap((cat) => cat.items || []);
  const openDetail = (p) => {
    if (!p) return;
    navigate(`/products/item/${p.id ?? p.slug ?? p.name}`);
  };

  const matched = q
    ? applyAdminVisibility(allItems, {}).filter((p) => matchesProduct(p, q)).length
    : allItems.length;

  const onSubmit = (e) => {
    e.preventDefault();
    const v = String(term || '').trim();
    navigate(v ? `/search?q=${encodeURIComponent(v)}` : '/search');
  };

  return (
    <>
      <SEO
        title={q ? `Search: ${q}` : 'Search'}
        description={`Search the Oatara counter${q ? ` for “${q}”` : ''} — every oat drink, oatgurt, ice cream, chocolate and fragrance.`}
        pathname="/search"
      />

      {/* ── Search header: the field again (refine + Enter) + result count ── */}
      <section className="sres">
        <div className="sres__inner">
          <div className="sres__head">
            <h1 className="sres__title">Search results</h1>
            <p className="sres__meta">
              {q
                ? `${matched} ${matched === 1 ? 'product' : 'products'} for “${q}”`
                : `${matched} products on the counter`}
            </p>
          </div>

          <form className="sres__form" role="search" onSubmit={onSubmit}>
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              name="q"
              className="sres__input"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
            />
            <button type="submit" className="sres__go">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ── Results: same listing, filters hidden behind the sliders icon ── */}
      <ProductListing
        key={q}
        categories={categories}
        activeSlug={null}
        items={allItems}
        initialQuery={q}
        hideSearchField
        onSelectProduct={openDetail}
      />
    </>
  );
}
