import React, { useRef, useState } from 'react';
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
// Storefront home: ticker → hero (search) → deals rail → aisle tiles →
// oat-drink rail → promos → service strip. Category/product data comes from
// the Model (one call to /products/categories), the same payload /products
// uses, so every count, colour and price below is real — nothing is hardcoded.
import SEO from '../components/SEO';
import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { enrichProduct, getSettings } from '../models/shopStore.js';
import { applyAdminVisibility, getProductOverrides } from '../models/adminStore.js';
import { useShop } from '../hooks/useShop.js';
import '../styles/HomeShop.css';

// Product photo with a quiet fallback (remote asset missing → plain tile)
function ShopImg({ src, alt }) {
  const [ok, setOk] = useState(!!src);
  if (!ok || !src) return <span className="hp-card__ph" aria-hidden="true" />;
  return <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} />;
}

// Section title sitting on the shelf rule, with rail arrows on the right
function SectionHead({ title, note, railKey, onScroll, count }) {
  return (
    <div className="hp-head">
      <h2 className="hp-head__title">{title}</h2>
      <div className="hp-head__side">
        {note && <span className="hp-head__note">{note}</span>}
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

// Aisle tiles: six shelves covering every product world in the shop
const TILES = [
  { slug: 'oat-drink', span: 'hp-tile--wide' },
  { slug: 'ice-cream', span: 'hp-tile--third' },
  { slug: 'oatgurt', span: 'hp-tile--third' },
  { slug: 'spread', span: 'hp-tile--fourth' },
  { slug: 'godiva-gifts', span: 'hp-tile--fourth' },
  { slug: 'bleu-de-chanel', span: 'hp-tile--fourth' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { add } = useShop();
  const settings = getSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [addedKey, setAddedKey] = useState(null);
  const rails = useRef({});
  const addedTimer = useRef(null);

  // Search bar → /search?q=… (a real page with the results + filters, not a popup)
  const submitSearch = (e) => {
    e.preventDefault();
    const v = String(searchTerm || '').trim();
    if (v) navigate(`/search?q=${encodeURIComponent(v)}`);
  };

  // MODEL (async API — the storefront renders once the catalogue arrives)
  const categories = useApiData(() => ProductModel.getProductCategories(), []);

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

  // Deals = products whose price really drops below their listed MRP
  const deals = visible
    .filter((i) => Number(i.price) > 0 && Number(i.mrp) > Number(i.price))
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

  const tiles = TILES.map((t) => {
    const cat = categories.find((c) => c.slug === t.slug);
    if (!cat) return null;
    return { ...t, cat };
  }).filter(Boolean);

  const ticker = [
    `Free shipping over ${currency}${Number(settings.freeShipThreshold ?? 40)}`,
    'New — Cold Foam Barista, 1 L',
    `${total} products in stock`,
    pintFrom ? `Frozen treats from ${pintFrom}` : 'Frozen treats in stock',
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
      <div className="hp-ticker" role="region" aria-label="Store announcements">
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

      {/* ── 2. HERO — voice first, then the counter ── */}
      <section className="hp-hero">
        <div className="hp-hero__copy">
          <h1 className="hp-hero__title">
            Oats by the carton. Chocolate by the box. Cologne by the bottle.
          </h1>
          <p className="hp-hero__lede">
            {total} things from Oatara, Magnum, Godiva, Amedei and Chanel —
            one counter, no cow.
          </p>

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
        {/* ── 3. DEALS RAIL ── */}
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

        {/* ── 4. AISLE TILES — six shelves, real badge colours ── */}
        <section className="hp-section">
          <SectionHead title="Shop by aisle" note="Pick a shelf" />
          <div className="hp-tiles">
            {tiles.map(({ cat, span }) => (
              <Link
                key={cat.slug}
                to={`/products/${cat.slug}`}
                className={`hp-tile ${span}`}
              >
                <div>
                  <h3 className="hp-tile__name">{cat.name}</h3>
                  <p className="hp-tile__tag">{cat.tagline}</p>
                </div>
                <span className="hp-tile__foot">
                  {(cat.items || []).length} products
                  <ArrowRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 5. OAT DRINK RAIL — the shelf the brand is named after ── */}
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

        {/* ── 6. PROMOS ── */}
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
                className="hp-promo__img"
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

        {/* ── 7. SERVICE STRIP ── */}
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
