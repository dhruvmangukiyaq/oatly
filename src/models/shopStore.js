// ─── SHOP STORE (proper e-commerce, frontend demo) ───────────────────────────
// Cart, wishlist, coupons, settings, reviews + enriched product catalog.
// Badhu localStorage ma persist thay chhe. Backend aavse tyare aa j
// function names API calls ma feravvana raheshe.
//
// Keys:
//   oatly-cart        → { [productId]: qty }
//   oatly-wishlist    → [productId]
//   oatly-coupons     → [{ code, type, value, minOrder, expiry, active, used }]
//   oatly-settings    → { storeName, currency, shippingFee, freeShipThreshold, taxRate, announcement }
//   oatly-reviews     → [{ id, productId, author, rating, text, date, approved }]
//   oatly-admin-products (adminStore) → price/stock overrides + custom products
//   oatly-orders      → full e-commerce orders (niche schema juo)

const CART_KEY = 'oatly-cart';
const WISH_KEY = 'oatly-wishlist';
const COUPON_KEY = 'oatly-coupons';
const SETTINGS_KEY = 'oatly-settings';
const REVIEWS_KEY = 'oatly-reviews';

export const EVENT_SHOP = 'oatly-shop';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function notifyShop() {
  window.dispatchEvent(new Event(EVENT_SHOP));
}

// ── Default catalog pricing (backend ma price nathi etle deterministic) ──
function defaultPrice(p) {
  const id = String(p.id ?? p.name ?? 'x');
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 1000;
  const base = 3.49 + ((h % 40) / 10); // 3.49 … 7.39
  return Math.round(base * 100) / 100;
}

export function enrichProduct(p, overrides = {}) {
  const key = String(p.id ?? p.slug ?? p.name);
  const ov = overrides[key] || {};
  const price = ov.price != null ? Number(ov.price) : defaultPrice(p);
  const mrp = ov.mrp != null ? Number(ov.mrp) : Math.round(price * 1.2 * 100) / 100;
  return {
    rating: 4 + ((String(key).length % 10) / 10), // 4.0–4.9 deterministic
    reviewsCount: 20 + (String(key).length * 13) % 300,
    stock: 25,
    status: 'active',
    featured: false,
    ...p,
    ...ov,
    price,
    mrp,
  };
}

// ── Cart ──
export function getCart() {
  return read(CART_KEY, {});
}

export function setQty(id, qty) {
  const cart = getCart();
  const q = Math.max(0, Math.floor(Number(qty) || 0));
  if (q <= 0) delete cart[String(id)];
  else cart[String(id)] = q;
  write(CART_KEY, cart);
  notifyShop();
  return cart;
}

export function addToCart(id, qty = 1) {
  const cart = getCart();
  cart[String(id)] = (cart[String(id)] || 0) + qty;
  write(CART_KEY, cart);
  notifyShop();
  return cart;
}

export function removeFromCart(id) {
  return setQty(id, 0);
}

export function clearCart() {
  write(CART_KEY, {});
  notifyShop();
}

export function cartCount() {
  return Object.values(getCart()).reduce((s, q) => s + (Number(q) || 0), 0);
}

// ── Wishlist ──
export function getWishlist() {
  return read(WISH_KEY, []);
}

export function toggleWishlist(id) {
  const key = String(id);
  const list = getWishlist();
  const next = list.includes(key) ? list.filter((x) => x !== key) : [...list, key];
  write(WISH_KEY, next);
  notifyShop();
  return next;
}

export function isWishlisted(id) {
  return getWishlist().includes(String(id));
}

// ── Settings ──
export function getSettings() {
  return {
    storeName: 'Oatly Shop',
    currency: '$',
    shippingFee: 4.99,
    freeShipThreshold: 50,
    taxRate: 0.08,
    announcement: 'Free shipping over $50 · OAT10 = 10% off',
    ...read(SETTINGS_KEY, {}),
  };
}

export function saveSettings(patch) {
  const next = { ...getSettings(), ...patch };
  write(SETTINGS_KEY, next);
  notifyShop();
  return next;
}

// ── Coupons ──
const DEFAULT_COUPONS = [
  { code: 'OAT10', type: 'percent', value: 10, minOrder: 0, expiry: '', active: true, used: 0 },
  { code: 'WELCOME15', type: 'percent', value: 15, minOrder: 30, expiry: '', active: true, used: 0 },
  { code: 'FREESHIP', type: 'freeship', value: 0, minOrder: 20, expiry: '', active: true, used: 0 },
];

export function getCoupons() {
  const saved = read(COUPON_KEY, null);
  if (!saved) {
    write(COUPON_KEY, DEFAULT_COUPONS);
    return DEFAULT_COUPONS;
  }
  return saved;
}

export function saveCoupon(coupon) {
  const list = getCoupons();
  const code = String(coupon.code || '').trim().toUpperCase();
  if (!code) return list;
  const idx = list.findIndex((c) => c.code === code);
  const entry = { type: 'percent', value: 10, minOrder: 0, expiry: '', active: true, used: 0, ...coupon, code };
  const next = idx >= 0 ? list.map((c, i) => (i === idx ? entry : c)) : [...list, entry];
  write(COUPON_KEY, next);
  notifyShop();
  return next;
}

export function deleteCoupon(code) {
  const next = getCoupons().filter((c) => c.code !== code);
  write(COUPON_KEY, next);
  notifyShop();
  return next;
}

export function validateCoupon(code, subtotal) {
  const c = getCoupons().find((x) => x.code === String(code || '').trim().toUpperCase());
  if (!c) return { ok: false, error: 'Invalid coupon code.' };
  if (!c.active) return { ok: false, error: 'This coupon is inactive.' };
  const now = new Date();
  if (c.startsAt && new Date(c.startsAt) > now) return { ok: false, error: 'This coupon is not live yet.' };
  if (c.endsAt && new Date(c.endsAt) < now) return { ok: false, error: 'This coupon expired.' };
  if (c.expiry && new Date(c.expiry) < now) return { ok: false, error: 'This coupon expired.' };
  if (Number(subtotal) < Number(c.minOrder || 0)) {
    return { ok: false, error: `Minimum order $${Number(c.minOrder).toFixed(2)} required.` };
  }
  return { ok: true, coupon: c };
}

export function markCouponUsed(code) {
  const next = getCoupons().map((c) => (c.code === code ? { ...c, used: (c.used || 0) + 1 } : c));
  write(COUPON_KEY, next);
  return next;
}

// ── Totals ──
export function calcTotals(lines, { couponCode = '', settings = null } = {}) {
  const s = settings || getSettings();
  const subtotal = lines.reduce((sum, l) => sum + Number(l.price || 0) * Number(l.qty || 0), 0);
  let discount = 0;
  let freeShip = false;
  let coupon = null;
  if (couponCode) {
    const v = validateCoupon(couponCode, subtotal);
    if (v.ok) {
      coupon = v.coupon;
      if (coupon.type === 'percent') discount = (subtotal * Number(coupon.value)) / 100;
      else if (coupon.type === 'flat') discount = Math.min(Number(coupon.value), subtotal);
      else if (coupon.type === 'freeship') freeShip = true;
    }
  }
  const afterDiscount = Math.max(0, subtotal - discount);
  const shipping = afterDiscount === 0 || freeShip || afterDiscount >= Number(s.freeShipThreshold) ? 0 : Number(s.shippingFee);
  const tax = afterDiscount * Number(s.taxRate);
  const total = afterDiscount + shipping + tax;
  return { subtotal, discount, shipping, tax, total, coupon, freeShip };
}

// ── Reviews ──
export function getReviews(productId = null) {
  const all = read(REVIEWS_KEY, []);
  return productId ? all.filter((r) => String(r.productId) === String(productId)) : all;
}

export function addReview({ productId, author, rating, text }) {
  const all = read(REVIEWS_KEY, []);
  const entry = {
    id: `rev-${Date.now()}`,
    productId: String(productId),
    author: String(author || 'Guest'),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    text: String(text || '').slice(0, 500),
    date: new Date().toISOString(),
    approved: true,
  };
  write(REVIEWS_KEY, [entry, ...all]);
  notifyShop();
  return entry;
}

export function deleteReview(id) {
  const next = read(REVIEWS_KEY, []).filter((r) => r.id !== id);
  write(REVIEWS_KEY, next);
  notifyShop();
  return next;
}

export function setReviewApproved(id, approved) {
  const next = read(REVIEWS_KEY, []).map((r) => (r.id === id ? { ...r, approved } : r));
  write(REVIEWS_KEY, next);
  notifyShop();
  return next;
}

// ── Categories (admin-managed, backend + local merge) ──
const CATS_KEY = 'oatly-admin-categories';

export function getCustomCategories() {
  return read(CATS_KEY, []);
}

export function saveCategory(cat) {
  const list = getCustomCategories();
  const slug = String(cat.slug || cat.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const entry = { name: cat.name, slug, description: cat.description || '' };
  const idx = list.findIndex((c) => c.slug === slug);
  const next = idx >= 0 ? list.map((c, i) => (i === idx ? entry : c)) : [...list, entry];
  write(CATS_KEY, next);
  notifyShop();
  return next;
}

export function deleteCategory(slug) {
  const next = getCustomCategories().filter((c) => c.slug !== slug);
  write(CATS_KEY, next);
  notifyShop();
  return next;
}

// ── Automate Pricing rules (Amazon: Pricing > Automate Pricing) ─────────────
// Rule: { id, name, scope: 'all' | productId, minPrice, maxPrice, active }
const RULES_KEY = 'oatly-pricing-rules';

export function getPricingRules() {
  return read(RULES_KEY, []);
}

export function savePricingRule(rule) {
  const list = getPricingRules();
  const entry = {
    id: rule.id || `rule-${Date.now()}`,
    name: rule.name || 'Pricing rule',
    scope: rule.scope || 'all',
    minPrice: Number(rule.minPrice) || 0,
    maxPrice: Number(rule.maxPrice) || 0,
    active: rule.active !== false,
  };
  const idx = list.findIndex((r) => r.id === entry.id);
  const next = idx >= 0 ? list.map((r, i) => (i === idx ? entry : r)) : [...list, entry];
  write(RULES_KEY, next);
  notifyShop();
  return next;
}

export function deletePricingRule(id) {
  const next = getPricingRules().filter((r) => r.id !== id);
  write(RULES_KEY, next);
  notifyShop();
  return next;
}

// ── Advertising campaigns (Amazon: Advertising > Campaign Manager) ──────────
// Campaign: { id, name, products: [ids], dailyBudget, status, startDate,
//             impressions, clicks, spend, sales }
const CAMPS_KEY = 'oatly-campaigns';

export function getCampaigns() {
  return read(CAMPS_KEY, []);
}

export function saveCampaign(c) {
  const list = getCampaigns();
  const entry = {
    id: c.id || `camp-${Date.now()}`,
    name: c.name || 'Sponsored Products',
    products: c.products || [],
    dailyBudget: Number(c.dailyBudget) || 10,
    status: c.status || 'enabled',
    startDate: c.startDate || new Date().toISOString().slice(0, 10),
    impressions: Number(c.impressions) || 0,
    clicks: Number(c.clicks) || 0,
    spend: Number(c.spend) || 0,
    sales: Number(c.sales) || 0,
  };
  const idx = list.findIndex((x) => x.id === entry.id);
  const next = idx >= 0 ? list.map((x, i) => (i === idx ? entry : x)) : [...list, entry];
  write(CAMPS_KEY, next);
  notifyShop();
  return next;
}

export function deleteCampaign(id) {
  const next = getCampaigns().filter((c) => c.id !== id);
  write(CAMPS_KEY, next);
  notifyShop();
  return next;
}

export function campaignAcos(c) {
  if (!Number(c.sales)) return 0;
  return (Number(c.spend) / Number(c.sales)) * 100;
}

// ── Returns (Amazon: Orders > Manage Returns) ───────────────────────────────
// Return: { id, orderId, product, reason, status, date, customer, email }
const RETURNS_KEY = 'oatly-returns';
export const RETURN_REASONS = ['Defective', 'Wrong item', 'Not as described', 'Changed mind', 'Late delivery', 'Other'];
export const RETURN_STATUSES = ['requested', 'approved', 'label-sent', 'received', 'refunded', 'rejected'];

export function getReturns() {
  return read(RETURNS_KEY, []);
}

export function saveReturn(r) {
  const list = getReturns();
  const entry = {
    id: r.id || `RET-${Date.now().toString().slice(-6)}`,
    date: r.date || new Date().toISOString(),
    status: r.status || 'requested',
    ...r,
  };
  write(RETURNS_KEY, [entry, ...list]);
  notifyShop();
  return entry;
}

export function updateReturnStatus(id, status) {
  const next = getReturns().map((r) => (String(r.id) === String(id) ? { ...r, status } : r));
  write(RETURNS_KEY, next);
  notifyShop();
  return next;
}

export function deleteReturn(id) {
  const next = getReturns().filter((r) => String(r.id) !== String(id));
  write(RETURNS_KEY, next);
  notifyShop();
  return next;
}

// ── Buyer–Seller Messages (Amazon: buyer messages) ──────────────────────────
// Message: { id, from: 'buyer'|'seller', name, email, orderId, subject, text, date, read }
const MSGS_KEY = 'oatly-messages';

export function getMessages() {
  return read(MSGS_KEY, []);
}

export function sendMessage(m) {
  const list = getMessages();
  const entry = {
    id: m.id || `msg-${Date.now()}`,
    date: m.date || new Date().toISOString(),
    read: false,
    ...m,
  };
  write(MSGS_KEY, [entry, ...list]);
  notifyShop();
  return entry;
}

export function markMessageRead(id, read = true) {
  const next = getMessages().map((m) => (String(m.id) === String(id) ? { ...m, read } : m));
  write(MSGS_KEY, next);
  notifyShop();
  return next;
}

export function deleteMessage(id) {
  const next = getMessages().filter((m) => String(m.id) !== String(id));
  write(MSGS_KEY, next);
  notifyShop();
  return next;
}

// ── Inventory ledger (Amazon: Inventory planning / stock history) ───────────
// Entry: { id, productId, productName, change, reason, date, by }
const LEDGER_KEY = 'oatly-inventory-log';

export function getLedger(productId = null) {
  const all = read(LEDGER_KEY, []);
  return productId ? all.filter((e) => String(e.productId) === String(productId)) : all;
}

export function logAdjustment({ productId, productName, change, reason, by }) {
  const all = read(LEDGER_KEY, []);
  const entry = {
    id: `adj-${Date.now()}`,
    productId: String(productId),
    productName: productName || String(productId),
    change: Number(change) || 0,
    reason: reason || 'Manual adjustment',
    date: new Date().toISOString(),
    by: by || 'seller',
  };
  write(LEDGER_KEY, [entry, ...all].slice(0, 500));
  notifyShop();
  return entry;
}

// ── Account Health (Amazon: Performance > Account Health) ───────────────────
// Returns { score 0-100, status, metrics } computed from real store data.
export function computeAccountHealth(orders = [], reviews = [], products = []) {
  const total = orders.length;
  const cancelled = orders.filter((o) => o.status === 'cancelled').length;
  const refunded = orders.filter((o) => Number(o.refunded || 0) > 0).length;
  const cancelRate = total ? (cancelled / total) * 100 : 0;
  const refundRate = total ? (refunded / total) * 100 : 0;
  const ratings = reviews.filter((r) => r.approved !== false).map((r) => Number(r.rating) || 0);
  const avgRating = ratings.length ? ratings.reduce((s, r) => s + r, 0) / ratings.length : 5;
  const negPct = ratings.length ? (ratings.filter((r) => r <= 2).length / ratings.length) * 100 : 0;
  const active = products.filter((p) => (p.status || 'active') === 'active');
  const outOfStock = active.filter((p) => Number(p.stock ?? 1) <= 0).length;
  const oosPct = active.length ? (outOfStock / active.length) * 100 : 0;

  let score = 100;
  score -= Math.min(30, cancelRate * 6); // Amazon target <2.5%
  score -= Math.min(20, refundRate * 4);
  score -= Math.min(25, negPct * 1.2);
  score -= Math.min(15, oosPct * 0.8);
  score = Math.max(0, Math.round(score));

  const status = score >= 80 ? 'Healthy' : score >= 50 ? 'At risk' : 'Unhealthy';
  return {
    score, status,
    metrics: {
      cancelRate: round1(cancelRate), cancelTarget: 2.5,
      refundRate: round1(refundRate),
      avgRating: round1(avgRating), negPct: round1(negPct),
      outOfStock, oosPct: round1(oosPct),
      totalOrders: total,
    },
  };
}

function round1(n) {
  return Math.round(Number(n) * 10) / 10;
}

// ── Payments math (Amazon: Payments > Statement/Transaction view) ───────────
// Referral fee 15% + closing fee $1 per order (demo schedule).
export function orderFees(order) {
  const total = Number(order.total) || 0;
  const referral = total * 0.15;
  const closing = total > 0 ? 1 : 0;
  const refund = Number(order.refunded) || 0;
  const net = total - referral - closing - refund;
  return { total, referral, closing, refund, net };
}

// ── Disbursements (Amazon: Payments > Disbursements) ────────────────────────
// Entry: { id, amount, date, status: 'paid', destination }
const DISB_KEY = 'oatly-disbursements';

export function getDisbursements() {
  return read(DISB_KEY, []);
}

export function saveDisbursement({ amount, destination }) {
  const list = getDisbursements();
  const entry = {
    id: `DISB-${Date.now().toString().slice(-6)}`,
    amount: Number(amount) || 0,
    destination: destination || 'Bank ****1234',
    date: new Date().toISOString(),
    status: 'paid',
  };
  write(DISB_KEY, [entry, ...list]);
  notifyShop();
  return entry;
}
