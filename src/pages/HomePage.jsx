import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Truck,
  RefreshCw,
  ShieldCheck,
  Headphones,
} from 'lucide-react';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Storefront home: ticker → scroll-scrubbed video hero → hero (search)
// → deals rail → brand roster →
// wardrobe rail (ZARA & MUFTI) → oat-drink rail → scent rail →
// promos → service strip. Category/product data comes from
// the Model (one call to /products/categories), the same payload /products
// uses, so every count, colour and price below is real — nothing is hardcoded.
import SEO from '../components/SEO';
import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { enrichProduct, getSettings } from '../models/shopStore.js';
import { applyAdminVisibility, getProductOverrides } from '../models/adminStore.js';
import { BRAND_HOUSE } from '../utils/productSearch.js';
import { useShop } from '../hooks/useShop.js';
import '../styles/HomeShop.css';
import '../styles/VideoHero.css';

// Scroll-scrubbed video intro (HTML5 MP4) — lazy so the main bundle stays
// light; the .hp-video wrapper reserves its height up front (no layout shift).
const VideoHero = React.lazy(() => import('../components/VideoHero.jsx'));

// Product photo with a quiet fallback (remote asset missing → plain tile)
function ShopImg({ src, alt }) {
  const [ok, setOk] = useState(!!src);
  if (!ok || !src) return <span className="hp-card__ph" aria-hidden="true" />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />;
}

// Section title sitting on the shelf rule, with rail arrows on the right and
// an optional "See all" link through to the full search results for it
function SectionHead({ title, note, railKey, onScroll, count, to }) {
  return (
    <div className="hp-head">
      <h2 className="hp-head__title">{title}</h2>
      <div className="hp-head__side">
        {note && <span className="hp-head__note">{note}</span>}
        {to && (
          <Link className="hp-head__link" to={to}>
            See all <ArrowRight size={13} aria-hidden="true" />
          </Link>
        )}
        {railKey && (
          <div className="hp-railbtns">
            <button
              type="button"
              className="hp-railbtn"
              aria-label={`Scroll ${title} left`}
              onClick={() => onScroll(railKey, -1)}
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="hp-railbtn"
              aria-label={`Scroll ${title} right`}
              onClick={() => onScroll(railKey, 1)}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
        {count != null && <span className="hp-head__count">{count}</span>}
      </div>
    </div>
  );
}

function ProductTile({ item, currency, added, onAdd }) {
  const { wishlist, toggleWish } = useShop();
  const price = Number(item.price) || 0;
  const mrp = Number(item.mrp) || 0;
  const off = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const key = String(item.id ?? item.slug ?? item.name);
  const wished = wishlist.includes(key);

  return (
    <article className="hp-card">
      <Link to={`/products/item/${item.id ?? item.slug ?? item.name}`} className="hp-card__media">
        <ShopImg src={item.image} alt={item.name} />
      </Link>
      {item.brand && <p className="hp-card__brand">{item.brand}</p>}
      <h3 className="hp-card__name">
        <Link to={`/products/item/${item.id ?? item.slug ?? item.name}`}>{item.name}</Link>
      </h3>
      <p className="hp-card__meta">
        {item.volume || item.packSize || item.category}
      </p>
      {/* Price row — same plain type + inline discount as the listing page */}
      <p className="hp-card__price">
        <span>{currency}{price.toFixed(2)}</span>
        {mrp > price && <s>{currency}{mrp.toFixed(2)}</s>}
        {off > 0 && <span className="hp-card__off">{off}% off</span>}
      </p>
      <div className="hp-card__buy">
        <button
          type="button"
          className={`hp-card__add${added ? ' is-added' : ''}`}
          onClick={() => onAdd(key)}
        >
          {added ? 'Added ✓' : 'Add to cart +'}
        </button>
        <button
          type="button"
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
          className={`hp-card__wish${wished ? ' is-active' : ''}`}
          onClick={() => toggleWish(key)}
        >
          <Heart size={14} fill={wished ? 'currentColor' : 'none'} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

// Brand roster: every house the counter carries. Order is editorial (the
// house brand first, then the ranges a shopper looks for); counts and the
// three photo thumbs are derived from the catalogue, never hardcoded.
const BRAND_ROSTER = [
  { key: 'Oatara', q: 'oatara', country: 'Sweden' },
  { key: 'MUFTI', q: 'mufti', country: 'India' },
  { key: 'ZARA', q: 'zara', country: 'Spain' },
  { key: 'Chanel', q: 'chanel', country: 'France' },
  { key: 'Godiva', q: 'godiva', country: 'Belgium' },
  { key: 'Amedei', q: 'amedei', country: 'Italy' },
  { key: 'Magnum', q: 'magnum', country: 'Denmark' },
];

// Chanel ships eight named lines; the roster shows them as one house
const brandOf = (p) => BRAND_HOUSE[p.brand] || p.brand;

// Alternate two lists A,B,A,B… so a brand rail mixes houses instead of
// running one brand's block after the other
const interleave = (a, b) => {
  const out = [];
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) {
    if (a[i]) out.push(a[i]);
    if (b[i]) out.push(b[i]);
  }
  return out;
};

export default function HomePage() {
  const navigate = useNavigate();
  const { add } = useShop();
  const settings = getSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [addedKey, setAddedKey] = useState(null);
  const rails = useRef({});
  const addedTimer = useRef(null);
  const tickerRef = useRef(null);

  // Search bar → /search?q=… (a real page with the results + filters, not a popup)
  const submitSearch = (e) => {
    e.preventDefault();
    const v = String(searchTerm || '').trim();
    if (v) navigate(`/search?q=${encodeURIComponent(v)}`);
  };

  // MODEL (async API — the storefront renders once the catalogue arrives)
  const categories = useApiData(() => ProductModel.getProductCategories(), []);

  // FULL-BLEED HERO: --hero-pull lifts the video journey to the very top of
  // the viewport so the film runs BEHIND the navbar and ticker (both float
  // over it). pull = header margin-top + header height + ticker height.
  // HomePage renders `null` until categories arrive, so the effect re-runs
  // when the markup commits (deps [categories] → set before paint, no snap);
  // next-frame retry covers the navbar, which also arrives async (nav items
  // come from the API). A ResizeObserver keeps it exact afterwards (mobile
  // drawer, font swap, resize).
  useLayoutEffect(() => {
    const html = document.documentElement;
    let ro = null;
    let raf = 0;
    let tries = 0;
    let alive = true;

    const parts = () => {
      const header = document.querySelector('.oatly-header');
      const ticker = tickerRef.current || document.querySelector('.hp-ticker');
      return header && ticker ? { header, ticker } : null;
    };

    const apply = () => {
      const p = parts();
      if (!p) return false;
      const marginTop = parseFloat(getComputedStyle(p.header).marginTop) || 0;
      // subpixel-accurate heights (offsetHeight truncates to integers)
      const { height: headerH } = p.header.getBoundingClientRect();
      const { height: tickerH } = p.ticker.getBoundingClientRect();
      html.style.setProperty('--hero-pull', `${marginTop + headerH + tickerH}px`);
      return true;
    };

    const watch = () => {
      const p = parts();
      if (p && typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(apply);
        ro.observe(p.header);
        ro.observe(p.ticker);
      }
      window.addEventListener('resize', apply);
    };

    const tryApply = () => {
      if (!alive) return;
      if (apply()) watch();
      else if (tries++ < 600) raf = requestAnimationFrame(tryApply); // ~10s cap
    };
    tryApply();

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener('resize', apply);
      html.style.removeProperty('--hero-pull');
    };
  }, [categories]);

  const handleAdd = (key) => {
    add(key, 1);
    setAddedKey(key);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAddedKey(null), 1600);
  };

  const scrollRail = (key, dir) => {
    const el = rails.current[key];
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  // AUTO-SLIDE: every product rail (deals, wardrobe, oat drink, scent)
  // advances ONE
  // CARD PER SECOND and wraps back to the start at the end. It pauses while
  // the pointer or keyboard focus is on the rail (so clicking a product is
  // never a moving target), while the rail is off-screen or the tab is
  // hidden, and it is off entirely for prefers-reduced-motion. The ‹ ›
  // buttons still work on top of it.
  useEffect(() => {
    if (!categories) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const railsList = () => Object.values(rails.current).filter(Boolean);
    const held = new Set(); // pointer/focus/touch inside the rail
    const visible = new Set(); // rail at least a quarter on screen

    const wire = [];
    railsList().forEach((el) => {
      const hold = () => held.add(el);
      const release = () => held.delete(el);
      el.addEventListener('mouseenter', hold);
      el.addEventListener('mouseleave', release);
      el.addEventListener('focusin', hold);
      el.addEventListener('focusout', release);
      el.addEventListener('touchstart', hold, { passive: true });
      el.addEventListener('touchend', release);
      wire.push([el, hold, release]);
    });

    // Only slide what the visitor can actually see
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }),
      { threshold: 0.25 },
    );
    railsList().forEach((el) => io.observe(el));

    const tick = () => {
      if (document.hidden) return;
      railsList().forEach((el) => {
        if (held.has(el) || !visible.has(el)) return;
        if (el.scrollWidth <= el.clientWidth + 4) return; // nothing to slide
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        const step = (el.firstElementChild?.getBoundingClientRect().width || 0) + gap;
        if (!step) return;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
        el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: 'smooth' });
      });
    };

    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      io.disconnect();
      wire.forEach(([el, hold, release]) => {
        el.removeEventListener('mouseenter', hold);
        el.removeEventListener('mouseleave', release);
        el.removeEventListener('focusin', hold);
        el.removeEventListener('focusout', release);
        el.removeEventListener('touchstart', hold);
        el.removeEventListener('touchend', release);
      });
    };
  }, [categories]);

  if (!categories || categories.length === 0) return null;

  // Catalogue → same enrichment the /products page uses (admin visibility +
  // deterministic pricing), so a tile price here always matches the listing.
  const overrides = getProductOverrides();
  const raw = categories.flatMap((cat) =>
    (cat.items || []).map((i) => ({ ...i, __cat: cat.slug })),
  );
  const visible = applyAdminVisibility(raw);
  const items = visible.map((p) => enrichProduct(p, overrides));
  const total = items.length;
  const currency = settings.currency || '$';

  // Deals = products whose price really drops below their listed MRP.
  // Clothing aisles stay out of it: the home front page deals rail is for
  // the food & fragrance range (clothes are found via search + /products).
  const clothingSlugs = new Set(['mens-clothes', 'womens-clothes', 'zara-fragrances']);
  const deals = visible
    .filter(
      (i) =>
        Number(i.price) > 0 &&
        Number(i.mrp) > Number(i.price) &&
        !clothingSlugs.has(i.__cat),
    )
    .map((i) => {
      const e = enrichProduct(i, overrides);
      return { ...e, off: Math.round(((e.mrp - e.price) / e.mrp) * 100) };
    })
    .sort((a, b) => b.off - a.off)
    .slice(0, 12);
  const maxOff = deals.reduce((m, d) => Math.max(m, d.off), 0);

  const oatAisle = items.filter((i) => i.__cat === 'oat-drink' || i.__cat === 'chilled-oat-drink');
  const oatRail = oatAisle.slice(0, 12);

  const pints = items.filter((i) => i.__cat === 'ice-cream' && Number(i.price) > 0);
  const pintFrom = pints.length
    ? `${currency}${Math.min(...pints.map((p) => Number(p.price))).toFixed(2)}`
    : null;

  // Brand roster — real counts, three thumbs spread across each house's range
  const roster = BRAND_ROSTER.map((b) => {
    const own = items.filter((p) => brandOf(p) === b.key);
    const thumbs = [];
    [0, Math.floor(own.length / 2), own.length - 1].forEach((i) => {
      const img = own[i] && own[i].image;
      if (img && !thumbs.includes(img)) thumbs.push(img);
    });
    return { ...b, count: own.length, thumbs };
  }).filter((b) => b.count > 0);

  // Fashion rail: ZARA's wardrobe alternating with MUFTI, piece by piece
  const zaraWard = items.filter(
    (p) => p.brand === 'ZARA' && (p.__cat === 'mens-clothes' || p.__cat === 'womens-clothes'),
  );
  const muftiWard = items.filter((p) => p.brand === 'MUFTI');
  const wardrobe = interleave(zaraWard, muftiWard).slice(0, 14);
  const wardrobeTotal = zaraWard.length + muftiWard.length;

  // Scent rail: the Chanel lines alternating with ZARA's fragrance shelf
  const chanel = items.filter((p) => brandOf(p) === 'Chanel');
  const zaraScent = items.filter((p) => p.__cat === 'zara-fragrances');
  const scent = interleave(chanel, zaraScent).slice(0, 14);
  const scentTotal = chanel.length + zaraScent.length;

  const ticker = [
    `Free shipping over ${currency}${Number(settings.freeShipThreshold ?? 40)}`,
    'New — Cold Foam Barista, 1 L',
    `${total} products in stock`,
    pintFrom ? `Frozen treats from ${pintFrom}` : 'Frozen treats in stock',
    'ZARA & MUFTI clothing in stock',
    'Godiva gift boxes in stock',
  ];

  const services = [
    { icon: Truck, title: 'Free shipping', text: `Orders over ${currency}${Number(settings.freeShipThreshold ?? 40)} ship free.` },
    { icon: RefreshCw, title: 'Easy returns', text: 'Send it back within 7 days if it is not your thing.' },
    { icon: ShieldCheck, title: 'Secure checkout', text: 'Cards, UPI and wallets — your details stay yours.' },
    { icon: Headphones, title: 'Real human help', text: 'Weekdays, 9 to 6. A person answers.' },
  ];

  return (
    <div className="hp">
      <SEO
        title="the Original Oat Drink Company"
        description="A site filled with everything you could possibly think of, and also probably not think of, related to an oat drink company called Oatara."
      />

      {/* ── 1. TICKER — the one moving thing on the page ── */}
      <div className="hp-ticker" ref={tickerRef} role="region" aria-label="Store announcements">
        <div className="hp-ticker__track">
          {[0, 1].map((group) => (
            <span className="hp-ticker__group" key={group} aria-hidden={group === 1 ? 'true' : undefined}>
              {ticker.map((line) => (
                <span className="hp-ticker__item" key={line}>
                  {line}
                  <i className="hp-ticker__sep" aria-hidden="true" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── 2. VIDEO HERO — scroll scrubs the MP4 timeline; the sticky stage
             releases at the end and the shop flows in (no shift, no flash) ── */}
      <div className="hp-video">
        <React.Suspense fallback={null}>
          <VideoHero />
        </React.Suspense>
      </div>

      {/* ── 3. HERO — the counter, nothing else ── */}
      <section className="hp-hero">
        <div className="hp-hero__copy">
          {/* The counter: type here and press Enter → /search results page */}
          <div className="hp-hero__actions">
            <form className="hp-search" role="search" onSubmit={submitSearch}>
              <Search size={20} aria-hidden="true" />
              <input
                type="search"
                name="q"
                className="hp-search__input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
              />
            </form>
          </div>
        </div>
      </section>

      <div className="hp-wrap">
        {/* ── 4. DEALS RAIL ── */}
        {deals.length > 0 && (
          <section className="hp-section">
            <SectionHead
              title="Today's deals"
              note={maxOff ? `Up to ${maxOff}% off` : null}
              railKey="deals"
              onScroll={scrollRail}
            />
            <div
              className="hp-rail"
              ref={(el) => { rails.current.deals = el; }}
            >
              {deals.map((item) => (
                <ProductTile
                  key={item.id ?? item.slug ?? item.name}
                  item={item}
                  currency={currency}
                  added={addedKey === String(item.id ?? item.slug ?? item.name)}
                  onAdd={handleAdd}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 5. BRANDS — every house, real counts, photo thumbs ── */}
        {roster.length > 0 && (
          <section className="hp-section">
            <SectionHead
              title="Brands at the counter"
              note={`${roster.length} houses · ${total} things`}
            />
            <div className="hp-brands">
              {roster.map((b) => (
                <Link key={b.key} to={`/search?q=${b.q}`} className="hp-brand">
                  <span className="hp-brand__thumbs" aria-hidden="true">
                    {b.thumbs.map((src) => (
                      <ShopImg key={src} src={src} alt="" />
                    ))}
                  </span>
                  <span className="hp-brand__body">
                    <span className="hp-brand__mark">{b.key}</span>
                    <span className="hp-brand__meta">
                      <span>{b.country}</span>
                      <span>{b.count} products</span>
                    </span>
                    <span className="hp-brand__ghost" aria-hidden="true">
                      {b.key.charAt(0)}
                    </span>
                    <ArrowRight className="hp-brand__go" size={15} aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── 6. WARDROBE RAIL — ZARA & MUFTI, the clothes off the search path ── */}
        {wardrobe.length > 0 && (
          <section className="hp-section">
            <SectionHead
              title="Wear it too"
              note={`ZARA & MUFTI · ${wardrobeTotal} pieces`}
              railKey="wardrobe"
              onScroll={scrollRail}
              to="/search?q=clothes"
            />
            <div
              className="hp-rail"
              ref={(el) => { rails.current.wardrobe = el; }}
            >
              {wardrobe.map((item) => (
                <ProductTile
                  key={item.id ?? item.slug ?? item.name}
                  item={item}
                  currency={currency}
                  added={addedKey === String(item.id ?? item.slug ?? item.name)}
                  onAdd={handleAdd}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 7. OAT DRINK RAIL — the shelf the brand is named after ── */}
        <section className="hp-section">
          <SectionHead
            title="The oat drink aisle"
            note={`${oatAisle.length} cartons · 250 ml to 5 L`}
            railKey="oat"
            onScroll={scrollRail}
          />
          <div className="hp-rail" ref={(el) => { rails.current.oat = el; }}>
            {oatRail.map((item) => (
              <ProductTile
                key={item.id ?? item.slug ?? item.name}
                item={item}
                currency={currency}
                added={addedKey === String(item.id ?? item.slug ?? item.name)}
                onAdd={handleAdd}
              />
            ))}
          </div>
        </section>

        {/* ── 8. SCENT RAIL — Chanel's lines interleaved with ZARA parfums ── */}
        {scent.length > 0 && (
          <section className="hp-section">
            <SectionHead
              title="The scent counter"
              note={`Chanel & ZARA · ${scentTotal} bottles`}
              railKey="scent"
              onScroll={scrollRail}
              to="/search?q=perfume"
            />
            <div
              className="hp-rail"
              ref={(el) => { rails.current.scent = el; }}
            >
              {scent.map((item) => (
                <ProductTile
                  key={item.id ?? item.slug ?? item.name}
                  item={item}
                  currency={currency}
                  added={addedKey === String(item.id ?? item.slug ?? item.name)}
                  onAdd={handleAdd}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── 9. PROMOS ── */}
        <section className="hp-section">
          <div className="hp-promos">
            <Link to="/products/item/cold-foam-barista-1l" className="hp-promo hp-promo--surface">
              <img
                src="https://assets.oatly.com/asset/29894ee5-3ba7-4a20-ae65-35f831e5cd44/w640/WEB-62442-Oatly-Barista-Cold-Foam-Edge-1L-Right-large.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="hp-promo__img"
              />
              <span className="hp-promo__body">
                <span className="hp-promo__kicker">New</span>
                <span className="hp-promo__title">Cold Foam Barista</span>
                <span className="hp-promo__text">
                  Press the nozzle and a cloud of sweet oat foam lands on your iced coffee.
                </span>
                <span className="hp-promo__link">
                  Shop now <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
            </Link>

            <Link to="/products/godiva-gifts" className="hp-promo hp-promo--canvas">
              <img
                src="/images/godiva/gold-15pc.webp"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="hp-promo__img hp-promo__img--chip"
              />
              <span className="hp-promo__body">
                <span className="hp-promo__kicker">Gifting</span>
                <span className="hp-promo__title">Godiva gift boxes</span>
                <span className="hp-promo__text">
                  Gold collections, truffles and bar sets for the person nobody knows what to buy for.
                </span>
                <span className="hp-promo__link">
                  See the boxes <ArrowRight size={15} aria-hidden="true" />
                </span>
              </span>
            </Link>
          </div>
        </section>

        {/* ── 10. SERVICE STRIP ── */}
        <ul className="hp-service">
          {services.map(({ icon: Icon, title, text }) => (
            <li key={title} className="hp-service__item">
              <Icon size={20} aria-hidden="true" />
              <div>
                <p className="hp-service__title">{title}</p>
                <p className="hp-service__text">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
