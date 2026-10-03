import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, SlidersHorizontal } from 'lucide-react';
// ─── MVC: View (shared) ─────────────────────────────────────────────────────
// Filter bar + product grid, reused by /products (ALL PRODUCTS)
// and every /products/:category page. Shop-ready: price, rating, stock,
// add-to-cart, wishlist, sort + search (standard marketplace features).
import ProcessBand from './ProcessBand.jsx';
import IceCreamGrid from './IceCreamGrid.jsx';
import { useShop } from '../hooks/useShop.js';
import { enrichProduct, getSettings } from '../models/shopStore.js';
import { applyAdminVisibility, getProductOverrides } from '../models/adminStore.js';
import { BRAND_GROUPS, matchesProduct } from '../utils/productSearch.js';
import '../styles/ProductListing.css';
import '../styles/Shop.css';

// ── Facet helpers ────────────────────────────────────────────────────
const RATING_OPTS = [
  { id: 0, label: 'All ratings' },
  { id: 4, label: '4 Stars & Up' },
  { id: 3, label: '3 Stars & Up' },
];

const OFF_OPTS = [
  { id: 0, label: 'All discounts' },
  { id: 10, label: '10% Off or more' },
  { id: 25, label: '25% Off or more' },
  { id: 50, label: '50% Off or more' },
];

const NEW_DAYS = 90;

// Data parthi dynamic price buckets (Amazon jeva ranges)
function priceBuckets(items) {
  const prices = items.map((p) => Number(p.price) || 0).filter((n) => n > 0);
  if (prices.length < 2) return [];
  const lo = Math.min(...prices);
  const hi = Math.max(...prices);
  if (hi - lo < 0.01) return [];
  const raw = (hi - lo) / 5;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((m) => m >= raw) || raw;
  const out = [];
  let b = Math.floor(lo / step) * step;
  while (b < hi && out.length < 6) {
    const clean = (n) => Math.round(n * 100) / 100;
    out.push({ min: clean(b), max: clean(b + step) });
    b += step;
  }
  return out;
}

const fmtBucket = (bk, cur) => {
  const f = (n) => `${cur}${Number(n).toFixed(Number(n) < 100 ? 2 : 0)}`;
  return `${f(bk.min)} – ${f(bk.max)}`;
};

const toggleIn = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

function ProductCard({ item, onSelect, onAdded }) {
  const [imgOk, setImgOk] = useState(!!item.image);
  const { add, wishlist, toggleWish } = useShop();
  const src = item.image;
  const key = String(item.id ?? item.slug ?? item.name);
  const wished = wishlist.includes(key);
  const s = getSettings();
  const off = item.mrp > item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;
  const out = Number(item.stock ?? 1) <= 0;
  const low = !out && Number(item.stock) <= 5;

  const media = (
    <div className={`plist-card__media${imgOk && item.hoverImage ? ' has-hover' : ''}`}>
      {imgOk && src ? (
        <img
          src={src}
          alt={item.name}
          className="plist-card__img"
          loading="lazy"
          onError={() => setImgOk(false)}
        />
      ) : null}
      {/* Hover swap: open-box close-up (Godiva.com jevu). Keval jyare second
          photo hoy tyare j render — touch users mate detail page ma gallery. */}
      {imgOk && item.hoverImage ? (
        <img
          src={item.hoverImage}
          alt=""
          aria-hidden="true"
          className="plist-card__img plist-card__img--hover"
          loading="lazy"
          decoding="async"
          draggable={false}
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      ) : null}
    </div>
  );

  return (
    <li>
      <div className="plist-card" onClick={() => onSelect && onSelect({ ...item, image: src })}>
        {media}
        {item.brand && <p className="plist-card__brand">{item.brand}</p>}
        <p className="plist-card__name">{item.name}</p>
        {/* Price row — same plain small type as the name (spec minimal) */}
        <p className="plist-card__price" onClick={(e) => e.stopPropagation()}>
          <span>{s.currency}{Number(item.price).toFixed(2)}</span>
          {item.mrp > item.price && <s>{s.currency}{Number(item.mrp).toFixed(2)}</s>}
          {off > 0 && <span className="plist-card__off">{off}% off</span>}
        </p>
        <p className="plist-card__rating">★ {Number(item.rating || 4.5).toFixed(1)} ({item.reviewsCount || 0})</p>
        {out ? (
          <p className="plist-card__stock plist-card__stock--out">Out of stock</p>
        ) : low ? (
          <p className="plist-card__stock plist-card__stock--low">Only {item.stock} left</p>
        ) : null}
        {/* Quiet text actions — badha roles mate same */}
        <div className="plist-card__buy" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="plist-card__add"
            disabled={out}
            onClick={() => { add(key, 1); if (onAdded) onAdded(); }}
          >
            {out ? 'Sold out' : 'Add to cart +'}
          </button>
          <button
            type="button"
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wished}
            className={`plist-card__wish${wished ? ' is-active' : ''}`}
            onClick={() => toggleWish(key)}
          >
            <Heart size={14} fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </div>
      </div>
    </li>
  );
}

function CategoryNav({ categories, activeSlug }) {
  return (
    <nav className="plist-filter" aria-label="Product categories">
      <ul className="plist-filter__list">
        <li>
          <Link
            to="/products"
            className={`plist-filter__link${!activeSlug ? ' plist-filter__link--active' : ''}`}
            aria-current={!activeSlug ? 'page' : undefined}
          >
            All Products
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              to={`/products/${cat.slug}`}
              className={`plist-filter__link${cat.slug === activeSlug ? ' plist-filter__link--active' : ''}`}
              aria-current={cat.slug === activeSlug ? 'page' : undefined}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function ProductListing({ categories, activeSlug, items, onSelectProduct, onAdded }) {
  // ── ICE CREAM: clean product-grid (rounded cards, format tabs, local art) ──
  // Branch BEFORE any hooks so both paths keep unconditional hook order.
  // Brand navigation + ProcessBand stay identical; only the results area is
  // swapped so other categories keep the existing facet layout untouched.
  if (activeSlug === 'ice-cream') {
    return (
      <>
        <div className="plist">
          <div className="plist__inner">
            <CategoryNav categories={categories} activeSlug={activeSlug} />
            <IceCreamGrid items={items} onSelect={onSelectProduct} onAdded={onAdded} />
          </div>
        </div>
        <ProcessBand />
      </>
    );
  }
  return (
    <StandardListing
      categories={categories}
      activeSlug={activeSlug}
      items={items}
      onSelectProduct={onSelectProduct}
      onAdded={onAdded}
    />
  );
}

function StandardListing({ categories, activeSlug, items, onSelectProduct, onAdded }) {
  const [q, setQ] = useState('');
  const overrides = getProductOverrides();
  const cur = getSettings().currency || '$';

  // ── Facet state (sidebar) ──
  const [selCats, setSelCats] = useState([]);
  const [selBrands, setSelBrands] = useState([]);
  const [priceIdx, setPriceIdx] = useState(-1);
  const [minRating, setMinRating] = useState(0);
  const [minOff, setMinOff] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);
  const [specSel, setSpecSel] = useState({}); // {SpecKey: [values]}
  const [filtersOpen, setFiltersOpen] = useState(false); // filters panel (toggle thi)

  // Admin-deleted products website par DEKHASE J NAHI (bug fix); customs
  // keval aa category na scope ma dekhashe.
  const scopeCategory = activeSlug
    ? categories.find((c) => c.slug === activeSlug)?.name || null
    : null;

  const enriched = useMemo(
    () => applyAdminVisibility(items, { category: scopeCategory }).map((p) => enrichProduct(p, overrides)),
    [items, overrides, scopeCategory],
  );

  // Search scope — smart matcher (synonyms + all fields), facets aa parthi.
  const searched = useMemo(() => {
    return enriched.filter((p) => matchesProduct(p, q));
  }, [enriched, q]);

  // ── Facet options (searched results parthi) ──
  const catOpts = useMemo(() => {
    const map = new Map();
    searched.forEach((p) => {
      if (!p.category) return;
      map.set(p.category, (map.get(p.category) || 0) + 1);
    });
    return [...map.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n);
  }, [searched]);

  const brandOpts = useMemo(() => {
    const map = new Map();
    searched.forEach((p) => {
      if (!p.brand) return;
      map.set(p.brand, (map.get(p.brand) || 0) + 1);
    });
    return [...map.entries()].map(([name, n]) => ({ name, n })).sort((a, b) => b.n - a.n);
  }, [searched]);

  const buckets = useMemo(() => priceBuckets(searched), [searched]);

  // ── Brand facet: KHALI house/brand name (sub-sections NAI) ─────────────
  // Category ma badhu avi j jay chhe, etle Brand ma flat list:
  // Chanel (house) + baki single brands. House select = badha member lines.
  const brandDisplayOpts = useMemo(() => {
    const byName = new Map(brandOpts.map((b) => [b.name, b.n]));
    const used = new Set();
    const houses = [];
    Object.entries(BRAND_GROUPS).forEach(([house, members]) => {
      const children = members.filter((m) => byName.has(m));
      if (children.length === 0) return;
      children.forEach((c) => used.add(c));
      houses.push({
        name: house,
        n: children.reduce((s, c) => s + (byName.get(c) || 0), 0),
        members: children,
      });
    });
    const singles = brandOpts
      .filter((b) => !used.has(b.name))
      .map((b) => ({ name: b.name, n: b.n, members: [b.name] }));
    return [...houses, ...singles].sort((a, b) => b.n - a.n);
  }, [brandOpts]);

  const matchesSelectedBrand = (productBrand, sel) => {
    if (sel === productBrand) return true;
    const members = BRAND_GROUPS[sel];
    if (members && members.includes(productBrand)) return true;
    return false;
  };

  const specFacets = useMemo(() => {
    const keys = new Map();
    searched.forEach((p) => {
      if (!p.specs) return;
      Object.entries(p.specs).forEach(([k, v]) => {
        if (!keys.has(k)) keys.set(k, new Map());
        const vals = keys.get(k);
        vals.set(v, (vals.get(v) || 0) + 1);
      });
    });
    return [...keys.entries()].slice(0, 8).map(([k, vals]) => ({
      key: k,
      values: [...vals.entries()].map(([v, n]) => ({ v: String(v), n })).sort((a, b) => b.n - a.n).slice(0, 10),
    }));
  }, [searched]);

  const hasDates = useMemo(() => searched.some((p) => p.createdAt), [searched]);

  // ── Apply facets (default order) ──
  const visible = useMemo(() => {
    const now = Date.now();
    const list = searched.filter((p) => {
      if (selCats.length > 0 && !selCats.includes(p.category)) return false;
      if (selBrands.length > 0) {
        const ok = selBrands.some((sel) => matchesSelectedBrand(p.brand, sel));
        if (!ok) return false;
      }
      if (priceIdx >= 0 && buckets[priceIdx]) {
        const bk = buckets[priceIdx];
        const pr = Number(p.price) || 0;
        const isLast = bk === buckets[buckets.length - 1];
        const inBk = isLast ? (pr >= bk.min && pr <= bk.max) : (pr >= bk.min && pr < bk.max);
        if (!inBk) return false;
      }
      if (minRating > 0 && Number(p.rating || 0) < minRating) return false;
      if (minOff > 0) {
        const off = p.mrp > p.price ? ((p.mrp - p.price) / p.mrp) * 100 : 0;
        if (off < minOff) return false;
      }
      if (inStockOnly && Number(p.stock ?? 0) <= 0) return false;
      if (onlyNew) {
        if (!p.createdAt) return false;
        if ((now - new Date(p.createdAt).getTime()) / 86400000 > NEW_DAYS) return false;
      }
      const sel = specSel;
      const keys = Object.keys(sel).filter((k) => sel[k].length > 0);
      for (const k of keys) {
        if (!sel[k].includes(String(p.specs?.[k]))) return false;
      }
      return true;
    });
    return list.filter((p) => p.status !== 'archived');
  }, [searched, selCats, selBrands, priceIdx, buckets, minRating, minOff, inStockOnly, onlyNew, specSel]);

  const activeCount =
    selCats.length + selBrands.length + (priceIdx >= 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) + (minOff > 0 ? 1 : 0) + (inStockOnly ? 1 : 0) +
    (onlyNew ? 1 : 0) + Object.values(specSel).reduce((s, v) => s + v.length, 0);

  // Filters sidebar default HIDDEN — toggle keval search karyu hoy,
  // panel khullu hoy, athva filters active hoy tyare j dekhashe.
  const showFilterToggle = q.trim() !== '' || filtersOpen || activeCount > 0;

  const clearAll = () => {
    setSelCats([]);
    setSelBrands([]);
    setPriceIdx(-1);
    setMinRating(0);
    setMinOff(0);
    setInStockOnly(false);
    setOnlyNew(false);
    setSpecSel({});
  };

  const toggleSpec = (k, v) => setSpecSel((prev) => ({ ...prev, [k]: toggleIn(prev[k] || [], v) }));

  const facet = (title, body) => (
    <details className="pf-group" open>
      <summary className="pf-title">{title}</summary>
      <div className="pf-opts">{body}</div>
    </details>
  );

  const checkRow = (checked, onChange, label, count, key) => (
    <label className="pf-opt" key={key}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="pf-label">{label}</span>
      {count != null && <span className="pf-n">({count})</span>}
    </label>
  );

  return (
    <>
      <div className="plist">
        <div className="plist__inner">
          {/* ── 1. FILTER BAR: ALL + every category, route-driven ── */}
          <CategoryNav categories={categories} activeSlug={activeSlug} />

          {/* ── 2. LAYOUT: results full-width; sidebar keval toggle par ── */}
          <div className={`plist-layout${filtersOpen ? '' : ' plist-layout--full'}`}>
            <aside id="plist-filters" className={`plist-side${filtersOpen ? ' plist-side--open' : ''}`} aria-label="Product filters" aria-hidden={!filtersOpen}>
              <div className="plist-side__head">
                <strong>Filters{activeCount > 0 && ` (${activeCount})`}</strong>
                {activeCount > 0 && (
                  <button type="button" className="pf-clear" onClick={clearAll}>Clear all</button>
                )}
              </div>

              {/* Category / Department — SAUTHI PAHELA (Amazon jevu) */}
              {catOpts.length > 1 && facet(
                'Category',
                catOpts.map((c) => checkRow(
                  selCats.includes(c.name),
                  () => setSelCats((prev) => toggleIn(prev, c.name)),
                  c.name, c.n, c.name,
                )),
              )}

              {/* Brand — KHALI brand name (flat), sub-sections NAI.
                  Category ma lines avi j jay chhe. House = badha lines. */}
              {brandDisplayOpts.length > 0 && facet(
                'Brand',
                brandDisplayOpts.map((b) => checkRow(
                  selBrands.includes(b.name),
                  () => setSelBrands((prev) => toggleIn(prev, b.name)),
                  b.name, b.n, `brand-${b.name}`,
                )),
              )}

              {buckets.length > 0 && facet(
                'Price',
                buckets.map((bk, i) => (
                  <label className="pf-opt" key={i}>
                    <input
                      type="radio" name="pf-price"
                      checked={priceIdx === i}
                      onChange={() => setPriceIdx(i)}
                    />
                    <span className="pf-label">{fmtBucket(bk, cur)}</span>
                  </label>
                )),
              )}

              {facet(
                'Customer Reviews',
                RATING_OPTS.map((r) => (
                  <label className="pf-opt" key={r.id}>
                    <input
                      type="radio" name="pf-rating"
                      checked={minRating === r.id}
                      onChange={() => setMinRating(r.id)}
                    />
                    <span className="pf-label">{r.id > 0 ? `★ ${r.label}` : r.label}</span>
                  </label>
                )),
              )}

              {facet(
                'Discount',
                OFF_OPTS.map((o) => (
                  <label className="pf-opt" key={o.id}>
                    <input
                      type="radio" name="pf-off"
                      checked={minOff === o.id}
                      onChange={() => setMinOff(o.id)}
                    />
                    <span className="pf-label">{o.label}</span>
                  </label>
                )),
              )}

              {facet(
                'Availability',
                checkRow(inStockOnly, () => setInStockOnly((v) => !v), 'In stock only', null, 'stock'),
              )}

              {hasDates && facet(
                'New Arrivals',
                checkRow(onlyNew, () => setOnlyNew((v) => !v), `Last ${NEW_DAYS} days`, null, 'new'),
              )}

              {/* Spec facets — data parthi auto (RAM, Storage, Pack size…) */}
              {specFacets.map((g) => facet(
                g.key,
                g.values.map((o) => checkRow(
                  (specSel[g.key] || []).includes(o.v),
                  () => toggleSpec(g.key, o.v),
                  o.v, o.n, `${g.key}-${o.v}`,
                )),
              ))}
            </aside>

            <div className="plist-main">
              {/* ── Shop toolbar: filters toggle + search (sort removed) ── */}
              <div className="plist-tools">
                {showFilterToggle && (
                  <button
                    type="button"
                    className="plist-tools__filters plist-tools__filters--show"
                    aria-expanded={filtersOpen}
                    aria-controls="plist-filters"
                    onClick={() => setFiltersOpen((v) => !v)}
                  >
                    <SlidersHorizontal size={14} aria-hidden="true" /> Filters{activeCount > 0 && ` (${activeCount})`}
                  </button>
                )}
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products…"
                  aria-label="Search products"
                  className="plist-tools__search"
                />
              </div>

              {/* ── 3. PRODUCT GRID ── */}
              {visible.length === 0 ? (
                <div>
                  <p className="plist-empty">No products match these filters.</p>
                  <button type="button" className="pf-clear" onClick={() => { clearAll(); setQ(''); }}>
                    Clear search &amp; filters
                  </button>
                </div>
              ) : (
                <ul className="plist-grid">
                  {visible.map((item) => (
                    <ProductCard
                      key={item.id || item.slug}
                      item={item}
                      onSelect={onSelectProduct}
                      onAdded={onAdded}
                    />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. PROCESS BAND: same UI under every product listing ── */}
      <ProcessBand />
    </>
  );
}
