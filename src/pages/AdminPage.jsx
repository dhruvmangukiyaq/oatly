import React, { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Home, Plus, Package, ShoppingCart, RotateCcw, MessageSquare, Tag, Star,
  Settings, X, Printer, Search, Users, Trash2,
  Bell, Download, Wallet, Activity, FileText, Truck, AlertTriangle,
  CheckCircle2, TrendingUp, Boxes, Megaphone, DollarSign, Store,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth, getAllAccounts, deleteAccount } from '../hooks/useAuth.js';
import { isAdmin } from '../hooks/useAuth.js';
import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';
import {
  mergeProducts, saveProductOverride, deleteProductAdmin, restoreProductAdmin,
  addCustomProduct, getProductOverrides,
  getOrders, saveOrder, updateOrderStatus, updateOrder,
  ORDER_STATUSES,
} from '../models/adminStore.js';
import {
  enrichProduct, getCoupons, saveCoupon, deleteCoupon,
  getSettings, saveSettings, getReviews, deleteReview, setReviewApproved,
  getCustomCategories,
  getPricingRules, savePricingRule, deletePricingRule,
  getCampaigns, saveCampaign, deleteCampaign, campaignAcos,
  getReturns, saveReturn, updateReturnStatus, deleteReturn,
  RETURN_REASONS, RETURN_STATUSES,
  getMessages, sendMessage, markMessageRead, deleteMessage,
  getLedger, logAdjustment,
  computeAccountHealth, orderFees,
  getDisbursements, saveDisbursement,
} from '../models/shopStore.js';
import { downloadCSV } from '../utils/csv.js';
import '../styles/AdminPage.css';

/* ==========================================================================
   SELLER HUB — marketplace-style admin structure + functionality.
   Menu: Home | Catalog | Inventory | Pricing | Orders | Advertising |
         Performance | Reports | Payments | Customers | Settings
   Keval admin (tame) maate.
   ========================================================================== */

const MENU = [
  { group: 'Home', items: [{ id: 'dashboard', label: 'Dashboard', icon: Home }] },
  {
    group: 'Catalog',
    items: [
      { id: 'catalog-add', label: 'Add Products', icon: Plus },
      { id: 'catalog-view', label: 'View Catalog', icon: Package },
    ],
  },
  {
    group: 'Inventory',
    items: [
      { id: 'inv-manage', label: 'Manage Inventory', icon: Boxes },
      { id: 'inv-plan', label: 'Inventory Planning', icon: TrendingUp },
    ],
  },
  {
    group: 'Pricing',
    items: [
      { id: 'price-dash', label: 'Pricing Dashboard', icon: DollarSign },
      { id: 'price-auto', label: 'Automate Pricing', icon: Activity },
    ],
  },
  {
    group: 'Orders',
    items: [
      { id: 'orders', label: 'Manage Orders', icon: ShoppingCart },
      { id: 'returns', label: 'Manage Returns', icon: RotateCcw },
      { id: 'messages', label: 'Buyer Messages', icon: MessageSquare },
    ],
  },
  {
    group: 'Advertising',
    items: [
      { id: 'camps', label: 'Campaign Manager', icon: Megaphone },
      { id: 'deals', label: 'Deals & Coupons', icon: Tag },
    ],
  },
  {
    group: 'Performance',
    items: [
      { id: 'health', label: 'Account Health', icon: CheckCircle2 },
      { id: 'feedback', label: 'Customer Feedback', icon: Star },
      { id: 'voc', label: 'Voice of the Customer', icon: AlertTriangle },
    ],
  },
  {
    group: 'Reports',
    items: [
      { id: 'rep-biz', label: 'Business Reports', icon: FileText },
      { id: 'rep-orders', label: 'Order Reports', icon: Download },
    ],
  },
  {
    group: 'Payments',
    items: [
      { id: 'pay-state', label: 'Statements', icon: Wallet },
      { id: 'pay-disb', label: 'Disbursements', icon: DollarSign },
    ],
  },
  {
    group: 'Customers',
    items: [{ id: 'customers', label: 'All Customers', icon: Users }],
  },
  {
    group: 'Settings',
    items: [
      { id: 'set-acct', label: 'Account Info', icon: Settings },
      { id: 'set-ship', label: 'Shipping Settings', icon: Truck },
      { id: 'set-ret', label: 'Return Settings', icon: RotateCcw },
    ],
  },
];

const RANGES = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: 'all', label: 'All time' },
];

function inRange(dateStr, range) {
  if (range === 'all') return true;
  const d = new Date(dateStr);
  const now = new Date();
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (range === 'today') return d >= day;
  if (range === 'yesterday') {
    const y = new Date(day);
    y.setDate(y.getDate() - 1);
    return d >= y && d < day;
  }
  const days = range === '7d' ? 7 : 30;
  const from = new Date(day);
  from.setDate(from.getDate() - (days - 1));
  return d >= from;
}

function money(n) {
  return `$${(Number(n) || 0).toFixed(2)}`;
}

function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin(user)) {
    return (
      <div className="sc">
        <div className="sc-denied sc-card">
          <h2>Access denied</h2>
          <p className="sc-note">This area is for the seller account only.</p>
          <p><Link to="/products" className="sc-link">Continue shopping</Link></p>
        </div>
      </div>
    );
  }
  return children;
}

export default function AdminPage() {
  return (
    <RequireAdmin>
      <AdminInner />
    </RequireAdmin>
  );
}

function AdminInner() {
  const { user, logout } = useAuth();
  const [view, setView] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [range, setRange] = useState('30d');
  const [refresh, setRefresh] = useState(0);

  const baseProducts = useApiData(() => ProductModel.getAllProducts(), []) || [];
  const baseCategories = useApiData(() => ProductModel.getProductCategories(), []) || [];
  const overrides = getProductOverrides();

  const products = useMemo(() => {
    const list = Array.isArray(baseProducts) ? baseProducts : [];
    return mergeProducts(list).map((p) => enrichProduct(p, overrides));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseProducts, refresh]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orders = useMemo(() => getOrders(), [refresh]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const accounts = useMemo(() => getAllAccounts(), [refresh]);
  const customers = accounts.filter((a) => a.role !== 'admin');
  const reload = () => setRefresh((v) => v + 1);

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unreadMsgs = useMemo(() => getMessages().filter((m) => m.from === 'buyer' && !m.read).length, [refresh]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const openReturns = useMemo(() => getReturns().filter((r) => r.status === 'requested').length, [refresh]);
  const bellCount = pendingOrders + unreadMsgs + openReturns;

  const dotFor = (id) => {
    if (id === 'orders' && pendingOrders > 0) return pendingOrders;
    if (id === 'messages' && unreadMsgs > 0) return unreadMsgs;
    if (id === 'returns' && openReturns > 0) return openReturns;
    return 0;
  };

  const ctx = {
    products, baseCategories, orders, customers, accounts,
    query, range, setRange, reload, user,
  };

  return (
    <div className="sc">
      <SEO title="Seller Hub | Oatly" description="Seller Hub — manage the Oatly shop." pathname="/admin" />

      {/* Top black bar */}
      <header className="sc-top">
        <Link to="/products" className="sc-logo" title="View storefront">
          <strong>oatly</strong>
        </Link>
        <div className="sc-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders, products, customers…"
            aria-label="Seller search"
          />
          <button type="button" aria-label="Search" onClick={() => setView('inv-manage')}>
            <Search size={17} />
          </button>
        </div>
        <div className="sc-topright">
          <button type="button" className="sc-bell" aria-label={`${bellCount} notifications`} onClick={() => setView('dashboard')}>
            <Bell size={18} />
            {bellCount > 0 && <span className="sc-bell__n">{bellCount}</span>}
          </button>
          <div className="sc-account">
            Hello, {user?.name}
            <strong>Account &amp; Lists</strong>
          </div>
          <button type="button" className="sc-logout" onClick={logout}>Sign out</button>
        </div>
      </header>

      <div className="sc-body">
        {/* Left menu — grouped admin navigation */}
        <aside className="sc-side">
          <nav className="sc-sidenav" aria-label="Seller navigation">
            {MENU.map((g) => (
              <div key={g.group}>
                <h4>{g.group}</h4>
                {g.items.map(({ id, label, icon: Icon }) => {
                  const dot = dotFor(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setView(id)}
                      className={`sc-sublink${view === id ? ' is-active' : ''}`}
                    >
                      <Icon size={15} aria-hidden="true" /> {label}
                      {dot > 0 && <span className="sc-dot">{dot}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="sc-main">
          {view === 'dashboard' && <DashboardView ctx={ctx} go={setView} />}
          {view === 'catalog-add' && <CatalogAddView ctx={ctx} />}
          {view === 'catalog-view' && <CatalogView ctx={ctx} />}
          {view === 'inv-manage' && <InvManageView ctx={ctx} />}
          {view === 'inv-plan' && <InvPlanView ctx={ctx} />}
          {view === 'price-dash' && <PriceDashView ctx={ctx} />}
          {view === 'price-auto' && <PriceAutoView ctx={ctx} />}
          {view === 'orders' && <OrdersView ctx={ctx} />}
          {view === 'returns' && <ReturnsView ctx={ctx} />}
          {view === 'messages' && <MessagesView ctx={ctx} />}
          {view === 'camps' && <CampsView ctx={ctx} />}
          {view === 'deals' && <DealsView ctx={ctx} />}
          {view === 'health' && <HealthView ctx={ctx} />}
          {view === 'feedback' && <FeedbackView ctx={ctx} />}
          {view === 'voc' && <VocView ctx={ctx} />}
          {view === 'rep-biz' && <BizReportsView ctx={ctx} />}
          {view === 'rep-orders' && <OrderReportsView ctx={ctx} />}
          {view === 'pay-state' && <PayStateView ctx={ctx} />}
          {view === 'pay-disb' && <PayDisbView ctx={ctx} />}
          {view === 'customers' && <CustomersView ctx={ctx} go={setView} />}
          {view === 'set-acct' && <SetAcctView ctx={ctx} />}
          {view === 'set-ship' && <SetShipView ctx={ctx} />}
          {view === 'set-ret' && <SetRetView ctx={ctx} />}
        </main>
      </div>
    </div>
  );
}

/* ═══════════ HOME / DASHBOARD ═══════════ */
function DashboardView({ ctx, go }) {
  const { products, orders, customers, range, setRange, reload } = ctx;
  const inR = orders.filter((o) => inRange(o.date, range) && o.status !== 'cancelled');
  const sales = inR.reduce((s, o) => s + Number(o.total || 0), 0);
  const units = inR.reduce((s, o) => s + (o.items || []).reduce((a, it) => a + Number(it.qty || 0), 0), 0);
  const aov = inR.length ? sales / inR.length : 0;

  const days = useMemo(() => {
    const arr = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      arr.push(d);
    }
    return arr;
  }, []);
  const byDay = days.map((d) => {
    const nx = new Date(d);
    nx.setDate(nx.getDate() + 1);
    return {
      day: d,
      total: orders.filter((o) => o.status !== 'cancelled')
        .filter((o) => { const t = new Date(o.date); return t >= d && t < nx; })
        .reduce((s, o) => s + Number(o.total || 0), 0),
    };
  });
  const max = Math.max(1, ...byDay.map((b) => b.total));

  const health = computeAccountHealth(orders, getReviews(), products);
  const unread = getMessages().filter((m) => m.from === 'buyer' && !m.read).length;
  const lowStock = products.filter((p) => (p.status || 'active') === 'active' && Number(p.stock ?? 99) <= 5);
  const drafts = products.filter((p) => p.status === 'draft');
  const pending = orders.filter((o) => o.status === 'pending');
  const recent = [...orders].slice(0, 5);

  const recos = [];
  if (pending.length) recos.push({ t: `${pending.length} order(s) need shipment confirmation`, go: 'orders' });
  if (unread) recos.push({ t: `${unread} unread buyer message(s)`, go: 'messages' });
  if (lowStock.length) recos.push({ t: `${lowStock.length} product(s) low on stock`, go: 'inv-plan' });
  if (drafts.length) recos.push({ t: `${drafts.length} draft listing(s) to complete`, go: 'catalog-view' });
  if (getReturns().some((r) => r.status === 'requested')) recos.push({ t: 'Return request(s) waiting for review', go: 'returns' });

  const seedDemo = () => {
    if (products.length === 0) return;
    const names = ['Aarav Shah', 'Priya Patel', 'Rahul Mehta', 'Sneha Desai', 'Vikram Rao', 'Kavya Nair'];
    for (let i = 0; i < 10; i++) {
      const p1 = products[i % products.length];
      const p2 = products[(i + 3) % products.length];
      const q1 = 1 + (i % 3);
      const d = new Date();
      d.setDate(d.getDate() - (i * 1.3));
      const sub = Number(p1.price) * q1 + (i % 2 === 0 ? Number(p2.price) : 0);
      const statuses = ['delivered', 'delivered', 'shipped', 'packed', 'pending'];
      saveOrder({
        customer: names[i % names.length],
        email: `demo${i}@example.com`,
        phone: '+1 555-0100',
        address: { line: '123 Oat Street', city: 'New York', zip: '10001', country: 'USA' },
        items: [
          { id: p1.id, name: p1.name, price: p1.price, qty: q1, image: p1.image },
          ...(i % 2 === 0 ? [{ id: p2.id, name: p2.name, price: p2.price, qty: 1, image: p2.image }] : []),
        ],
        subtotal: sub, discount: 0, shipping: sub >= 50 ? 0 : 4.99, tax: sub * 0.08,
        total: sub + (sub >= 50 ? 0 : 4.99) + sub * 0.08,
        payment: { method: i % 2 ? 'card' : 'cod' },
        status: statuses[i % statuses.length],
        date: d.toISOString(),
        timeline: [{ status: 'pending', date: d.toISOString() }],
      });
    }
    if (getMessages().length === 0) {
      sendMessage({ from: 'buyer', name: 'Priya Patel', email: 'demo1@example.com', orderId: orders[0]?.id || '', subject: 'Where is my order?', text: 'Hi, my order has not arrived yet. Can you share tracking?', read: false });
      sendMessage({ from: 'buyer', name: 'Rahul Mehta', email: 'demo2@example.com', orderId: '', subject: 'Is this gluten free?', text: 'Hello, is the Barista Edition gluten free?', read: false });
    }
    reload();
  };

  return (
    <div>
      <div className="sc-card__head">
        <h1 className="sc-h1">Hello, {ctx.user?.name}</h1>
        <select className="sc-select" value={range} onChange={(e) => setRange(e.target.value)} aria-label="Date range">
          {RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
        </select>
      </div>
      <p className="sc-sub">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · Here is your business at a glance.</p>

      <div className="sc-grid">
        <div className="sc-stat"><small>Ordered product sales</small><strong>{money(sales)}</strong><span className="sc-note">{inR.length} orders</span></div>
        <div className="sc-stat"><small>Units ordered</small><strong>{units}</strong><span className="sc-note">items</span></div>
        <div className="sc-stat"><small>Average order value</small><strong>{money(aov)}</strong><span className="sc-note">per order</span></div>
        <div className="sc-stat"><small>Account health</small><strong>{health.score}/100</strong><span className={`sc-badge ${health.status === 'Healthy' ? 'sc-b-green' : health.status === 'At risk' ? 'sc-b-orange' : 'sc-b-red'}`}>{health.status}</span></div>
      </div>

      <div className="sc-card">
        <div className="sc-card__head">
          <h2>Sales snapshot · last 14 days</h2>
          {orders.length === 0 && <button type="button" className="sc-btn sc-btn--sm" onClick={seedDemo}>Load demo data</button>}
        </div>
        <div className="sc-chart">
          {byDay.map((b, i) => (
            <div key={i} className="sc-bar" title={`${b.day.toLocaleDateString()}: ${money(b.total)}`}>
              <div className="sc-bar__fill" style={{ height: `${Math.max(3, (b.total / max) * 100)}%` }} />
              <span>{b.day.getDate()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sc-grid2">
        <div className="sc-card">
          <h2>Recommendations</h2>
          {recos.length === 0 ? <p className="sc-empty">All caught up. Nothing needs attention.</p> : (
            <ul className="sc-list">
              {recos.map((r, i) => (
                <li key={i}>
                  <AlertTriangle size={15} color="#E67A00" />
                  <button type="button" className="sc-link" onClick={() => go(r.go)}>{r.t} →</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sc-card">
          <div className="sc-card__head"><h2>Recent orders</h2><button type="button" className="sc-link" onClick={() => go('orders')}>Manage orders →</button></div>
          {recent.length === 0 ? <p className="sc-empty">No orders yet.</p> : (
            <ul className="sc-list">
              {recent.map((o) => (
                <li key={o.id}><strong>{o.id}</strong> · {o.customer || o.email} · {money(o.total)} <span className={`sc-badge sc-st-${o.status}`}>{o.status}</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="sc-card">
        <h2>Seller news</h2>
        <ul className="sc-list">
          <li>Free shipping threshold is {money(getSettings().freeShipThreshold)} — tune it under Settings › Shipping Settings.</li>
          <li>Automate Pricing rules keep your offers competitive — Pricing › Automate Pricing.</li>
          <li>{customers.length} registered customer(s). Message them from Orders › Buyer Messages.</li>
        </ul>
      </div>
    </div>
  );
}

/* ═══════════ CATALOG ═══════════ */
const EMPTY_PRODUCT = { name: '', category: 'Oat Drink', price: '', mrp: '', stock: 20, status: 'active', featured: false, image: '', tagline: '', description: '' };

function ProductModalForm({ initial, categories, onClose, onSaved }) {
  const [f, setF] = useState({
    name: initial?.name || '',
    category: initial?.category || categories[0] || 'Oat Drink',
    price: initial?.price ?? '',
    mrp: initial?.mrp ?? '',
    stock: initial?.stock ?? 20,
    status: initial?.status || 'active',
    featured: Boolean(initial?.featured),
    image: initial?.image || '',
    tagline: initial?.tagline || '',
    description: initial?.description || '',
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const save = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return;
    const payload = {
      name: f.name.trim(), category: f.category,
      price: Number(f.price) || 0, mrp: Number(f.mrp) || 0, stock: Number(f.stock) || 0,
      status: f.status, featured: f.featured, image: f.image,
      tagline: f.tagline, description: f.description || f.tagline,
    };
    if (initial && !initial.isCustom) {
      saveProductOverride(String(initial.id ?? initial.slug ?? initial.name), payload);
    } else if (initial?.isCustom) {
      const data = getProductOverrides();
      data.__custom = (data.__custom || []).map((p) => (String(p.id) === String(initial.id) ? { ...p, ...payload } : p));
      try { localStorage.setItem('oatly-admin-products', JSON.stringify(data)); } catch { /* ignore */ }
    } else {
      addCustomProduct(payload);
    }
    onSaved();
  };

  return (
    <div className="sc-modalbg" onClick={onClose}>
      <div className="sc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Product">
        <div className="sc-modal__head">
          <h3>{initial ? 'Edit listing' : 'Add a product'}</h3>
          <button type="button" className="sc-iconbtn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <form className="sc-stackform" onSubmit={save}>
          <label>Product name *<input className="sc-input" value={f.name} onChange={set('name')} /></label>
          <div className="sc-form" style={{ marginBottom: 0 }}>
            <label>Category
              <select className="sc-select" value={f.category} onChange={set('category')}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>Status
              <select className="sc-select" value={f.status} onChange={set('status')}>
                <option value="active">Active</option>
                <option value="draft">Draft (incomplete)</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label>Price ($)<input className="sc-input" type="number" min="0" step="0.01" value={f.price} onChange={set('price')} /></label>
            <label>List price / MRP ($)<input className="sc-input" type="number" min="0" step="0.01" value={f.mrp} onChange={set('mrp')} /></label>
            <label>Quantity<input className="sc-input" type="number" min="0" step="1" value={f.stock} onChange={set('stock')} /></label>
            <label>Image URL<input className="sc-input" value={f.image} onChange={set('image')} placeholder="https://…" /></label>
          </div>
          <label>Tagline<input className="sc-input" value={f.tagline} onChange={set('tagline')} /></label>
          <label>Description<input className="sc-input" value={f.description} onChange={set('description')} /></label>
          <label className="sc-check"><input type="checkbox" checked={f.featured} onChange={set('featured')} /> Featured offer</label>
          <button type="submit" className="sc-btn">Save and finish</button>
        </form>
      </div>
    </div>
  );
}

function catOptions(baseCategories) {
  const customs = getCustomCategories().map((c) => c.name);
  return ['Oat Drink', 'Oatgurt', 'Ice Cream', 'Cold Foam', 'Spread',
    ...(baseCategories || []).map((c) => c.name), ...customs]
    .filter((v, i, a) => a.indexOf(v) === i);
}

function CatalogAddView({ ctx }) {
  const { reload, baseCategories } = ctx;
  const [done, setDone] = useState(null);
  return (
    <div>
      <h1 className="sc-h1">Add Products</h1>
      <p className="sc-sub">Create a new listing. Drafts stay hidden until you set them Active.</p>
      {done && <div className="sc-card"><p><CheckCircle2 size={15} color="#067647" /> Listing saved: <strong>{done}</strong></p></div>}
      <div className="sc-card">
        <ProductFormInline categories={catOptions(baseCategories)} onSaved={(name) => { setDone(name); reload(); }} />
      </div>
    </div>
  );
}

function ProductFormInline({ categories, onSaved }) {
  const [f, setF] = useState(EMPTY_PRODUCT);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const save = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return;
    addCustomProduct({
      name: f.name.trim(), category: f.category,
      price: Number(f.price) || 0, mrp: Number(f.mrp) || 0, stock: Number(f.stock) || 0,
      status: f.status, featured: f.featured, image: f.image,
      tagline: f.tagline, description: f.description || f.tagline,
    });
    onSaved(f.name.trim());
    setF(EMPTY_PRODUCT);
  };
  return (
    <form className="sc-stackform" onSubmit={save}>
      <label>Product name *<input className="sc-input" value={f.name} onChange={set('name')} placeholder="e.g. Oat Drink Barista Edition" /></label>
      <div className="sc-form" style={{ marginBottom: 0 }}>
        <label>Category
          <select className="sc-select" value={f.category} onChange={set('category')}>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>Status
          <select className="sc-select" value={f.status} onChange={set('status')}>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label>Price ($)<input className="sc-input" type="number" min="0" step="0.01" value={f.price} onChange={set('price')} /></label>
        <label>List price ($)<input className="sc-input" type="number" min="0" step="0.01" value={f.mrp} onChange={set('mrp')} /></label>
        <label>Quantity<input className="sc-input" type="number" min="0" step="1" value={f.stock} onChange={set('stock')} /></label>
        <label>Image URL<input className="sc-input" value={f.image} onChange={set('image')} placeholder="https://…" /></label>
      </div>
      <label>Tagline<input className="sc-input" value={f.tagline} onChange={set('tagline')} /></label>
      <button type="submit" className="sc-btn">Add product</button>
    </form>
  );
}

function CatalogView({ ctx }) {
  const { products, query, reload } = ctx;
  const [editing, setEditing] = useState(null);
  const q = query.trim().toLowerCase();
  const list = products.filter((p) => !q || [p.name, p.category, p.id].filter(Boolean).join(' ').toLowerCase().includes(q));
  const drafts = list.filter((p) => p.status === 'draft');
  return (
    <div>
      <h1 className="sc-h1">View Catalog</h1>
      <p className="sc-sub">{products.length} listing(s) · {drafts.length} draft(s) need completion.</p>
      <div className="sc-card">
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Image</th><th>Product</th><th>Status</th><th>Price</th><th>Quantity</th><th /></tr></thead>
            <tbody>
              {list.map((p) => {
                const key = String(p.id ?? p.slug ?? p.name);
                return (
                  <tr key={key}>
                    <td>{p.image ? <img src={p.image} alt="" className="sc-thumb" /> : <span className="sc-thumb" />}</td>
                    <td><strong>{p.name}</strong><br /><small>{key} · {p.category}</small></td>
                    <td>
                      <span className={`sc-badge ${p.status === 'active' ? 'sc-b-green' : p.status === 'draft' ? 'sc-b-orange' : 'sc-b-gray'}`}>
                        {p.status || 'active'}
                      </span>
                    </td>
                    <td>{money(p.price)}</td>
                    <td>{p.stock ?? '—'}</td>
                    <td>
                      <span className="sc-cellmain">
                        <button type="button" className="sc-link" onClick={() => setEditing(p)}>Edit</button>
                        <button type="button" className="sc-link" onClick={() => { deleteProductAdmin(key, Boolean(p.isCustom)); reload(); }}>Delete</button>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <p className="sc-empty">No listings found.</p>}
      </div>
      {editing && (
        <ProductModalForm
          initial={editing}
          categories={catOptions(ctx.baseCategories)}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); reload(); }}
        />
      )}
    </div>
  );
}

/* ═══════════ INVENTORY ═══════════ */
function adjustStock(p, delta, reason, reload) {
  const key = String(p.id ?? p.slug ?? p.name);
  const next = Math.max(0, Number(p.stock ?? 0) + delta);
  saveProductOverride(key, { stock: next });
  logAdjustment({ productId: key, productName: p.name, change: delta, reason, by: 'seller' });
  reload();
}

function InvManageView({ ctx }) {
  const { products, query, reload } = ctx;
  const [f, setF] = useState('all');
  const [editing, setEditing] = useState(null);
  const [reason, setReason] = useState('Restock');
  const q = query.trim().toLowerCase();
  const list = products.filter((p) => {
    if (f === 'low' && !(Number(p.stock ?? 99) <= 5 && (p.status || 'active') === 'active')) return false;
    if (f === 'oos' && !(Number(p.stock ?? 1) <= 0)) return false;
    if (f === 'active' && (p.status || 'active') !== 'active') return false;
    if (!q) return true;
    return [p.name, p.category, p.id].filter(Boolean).join(' ').toLowerCase().includes(q);
  });

  return (
    <div>
      <h1 className="sc-h1">Manage Inventory</h1>
      <p className="sc-sub">Update stock, edit listings, fix stranded and low-stock offers.</p>
      <div className="sc-card">
        <div className="sc-card__head">
          <div className="sc-tabs" style={{ border: 'none', margin: 0 }}>
            {[['all', 'All'], ['active', 'Active'], ['low', 'Low stock'], ['oos', 'Out of stock']].map(([id, l]) => (
              <button key={id} type="button" className={f === id ? 'is-active' : ''} onClick={() => setF(id)}>{l}</button>
            ))}
          </div>
          <label className="sc-note">Reason for adjustments: <input className="sc-input" value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: 160 }} /></label>
        </div>
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Image</th><th>Listing</th><th>Price</th><th>Available</th><th>Adjust</th><th /></tr></thead>
            <tbody>
              {list.map((p) => {
                const key = String(p.id ?? p.slug ?? p.name);
                const oos = Number(p.stock ?? 1) <= 0;
                return (
                  <tr key={key}>
                    <td>{p.image ? <img src={p.image} alt="" className="sc-thumb" /> : <span className="sc-thumb" />}</td>
                    <td><strong>{p.name}</strong><br /><small>{key}</small></td>
                    <td>{money(p.price)}</td>
                    <td>
                      {oos ? <span className="sc-badge sc-b-red">Out of stock</span> : <strong>{p.stock}</strong>}
                    </td>
                    <td>
                      <span className="sc-cellmain">
                        <button type="button" className="sc-btn sc-btn--sec sc-btn--sm" onClick={() => adjustStock(p, -1, reason, reload)}>−1</button>
                        <button type="button" className="sc-btn sc-btn--sec sc-btn--sm" onClick={() => adjustStock(p, 10, reason, reload)}>+10</button>
                      </span>
                    </td>
                    <td><button type="button" className="sc-link" onClick={() => setEditing(p)}>Edit listing</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <p className="sc-empty">No inventory matches.</p>}
      </div>
      {editing && (
        <ProductModalForm
          initial={editing}
          categories={catOptions(ctx.baseCategories)}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); reload(); }}
        />
      )}
    </div>
  );
}

function InvPlanView({ ctx }) {
  const { products, reload } = ctx;
  const active = products.filter((p) => (p.status || 'active') === 'active');
  const inStock = active.filter((p) => Number(p.stock ?? 0) > 5).length;
  const ipi = active.length ? Math.round((inStock / active.length) * 1000) / 10 : 100;
  const restock = active.filter((p) => Number(p.stock ?? 99) <= 5)
    .map((p) => ({ ...p, suggested: Math.max(0, 20 - Number(p.stock || 0)) }));
  const stranded = products.filter((p) => p.status === 'archived');
  const ledger = getLedger().slice(0, 20);

  return (
    <div>
      <h1 className="sc-h1">Inventory Planning</h1>
      <p className="sc-sub">Keep bestsellers in stock and clear stranded listings.</p>
      <div className="sc-grid">
        <div className="sc-stat"><small>Inventory health (IPI-like)</small><strong>{ipi}%</strong><span className="sc-note">in-stock listings</span></div>
        <div className="sc-stat"><small>Need restock</small><strong>{restock.length}</strong><span className="sc-note">≤ 5 units</span></div>
        <div className="sc-stat"><small>Stranded</small><strong>{stranded.length}</strong><span className="sc-note">archived listings</span></div>
      </div>
      <div className="sc-card">
        <h2>Restock recommendations</h2>
        {restock.length === 0 ? <p className="sc-empty">Everything is stocked. Nice.</p> : (
          <div className="sc-tablewrap">
            <table className="sc-table">
              <thead><tr><th>Product</th><th>On hand</th><th>Suggested</th><th /></tr></thead>
              <tbody>
                {restock.map((p) => {
                  const key = String(p.id ?? p.slug ?? p.name);
                  return (
                    <tr key={key}>
                      <td><strong>{p.name}</strong></td>
                      <td>{p.stock}</td>
                      <td>+{p.suggested} (to 20)</td>
                      <td><button type="button" className="sc-btn sc-btn--sm" onClick={() => adjustStock(p, p.suggested, 'Restock recommendation', reload)}>Restock</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="sc-grid2">
        <div className="sc-card">
          <h2>Stranded inventory</h2>
          {stranded.length === 0 ? <p className="sc-empty">None stranded.</p> : (
            <ul className="sc-list">
              {stranded.map((p) => {
                const key = String(p.id ?? p.slug ?? p.name);
                return (
                  <li key={key}>
                    <strong>{p.name}</strong>
                    <button type="button" className="sc-link" onClick={() => { restoreProductAdmin(key); reload(); }}>Relist</button>
                    <button type="button" className="sc-link" onClick={() => { deleteProductAdmin(key, Boolean(p.isCustom)); reload(); }}>Remove</button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="sc-card">
          <h2>Recent adjustments</h2>
          {ledger.length === 0 ? <p className="sc-empty">No adjustments logged yet.</p> : (
            <ul className="sc-list">
              {ledger.map((e) => (
                <li key={e.id}>{e.change > 0 ? '+' : ''}{e.change} · <strong>{e.productName}</strong> · {e.reason} · <small>{new Date(e.date).toLocaleString()}</small></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════ PRICING ═══════════ */
function PriceDashView({ ctx }) {
  const { products, query } = ctx;
  const q = query.trim().toLowerCase();
  const list = products.filter((p) => !q || [p.name, p.category].filter(Boolean).join(' ').toLowerCase().includes(q));
  return (
    <div>
      <h1 className="sc-h1">Pricing Dashboard</h1>
      <p className="sc-sub">Every offer, its discount and Featured-offer status.</p>
      <div className="sc-card">
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Product</th><th>Your price</th><th>List price</th><th>Discount</th><th>Featured offer</th></tr></thead>
            <tbody>
              {list.map((p) => {
                const key = String(p.id ?? p.slug ?? p.name);
                const off = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
                const feat = (p.status || 'active') === 'active' && Number(p.stock ?? 0) > 0;
                return (
                  <tr key={key}>
                    <td><strong>{p.name}</strong><br /><small>{p.category}</small></td>
                    <td><strong>{money(p.price)}</strong></td>
                    <td>{money(p.mrp)}</td>
                    <td>{off > 0 ? <span className="sc-badge sc-b-green">{off}% off</span> : '—'}</td>
                    <td>{feat ? <span className="sc-badge sc-b-green">Featured ✓</span> : <span className="sc-badge sc-b-gray">Not featured</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PriceAutoView({ ctx }) {
  const { products, reload } = ctx;
  const [rules, setRules] = useState(() => getPricingRules());
  const [form, setForm] = useState({ name: '', scope: 'all', minPrice: '', maxPrice: '' });
  const refresh = () => { setRules(getPricingRules()); reload(); };

  const save = (e) => {
    e.preventDefault();
    savePricingRule({ ...form, name: form.name.trim() || 'Pricing rule' });
    setForm({ name: '', scope: 'all', minPrice: '', maxPrice: '' });
    refresh();
  };

  const applyRules = () => {
    const active = getPricingRules().filter((r) => r.active);
    let n = 0;
    products.forEach((p) => {
      const key = String(p.id ?? p.slug ?? p.name);
      const rule = active.find((r) => r.scope === 'all' || r.scope === key);
      if (!rule || !rule.maxPrice) return;
      const lo = Number(rule.minPrice) || 0;
      const hi = Number(rule.maxPrice) || Infinity;
      const cur = Number(p.price) || 0;
      const clamped = Math.min(hi, Math.max(lo, cur));
      if (clamped !== cur) {
        saveProductOverride(key, { price: Math.round(clamped * 100) / 100 });
        n += 1;
      }
    });
    refresh();
    return n;
  };
  const [applied, setApplied] = useState(null);

  return (
    <div>
      <h1 className="sc-h1">Automate Pricing</h1>
      <p className="sc-sub">Rules reprice your offers inside a min–max band so you stay competitive.</p>
      <div className="sc-card">
        <form className="sc-form" onSubmit={save}>
          <input className="sc-input" placeholder="Rule name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className="sc-select" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })}>
            <option value="all">All products</option>
            {products.map((p) => {
              const key = String(p.id ?? p.slug ?? p.name);
              return <option key={key} value={key}>{p.name}</option>;
            })}
          </select>
          <input className="sc-input" type="number" min="0" step="0.01" placeholder="Min price" value={form.minPrice} onChange={(e) => setForm({ ...form, minPrice: e.target.value })} />
          <input className="sc-input" type="number" min="0" step="0.01" placeholder="Max price" value={form.maxPrice} onChange={(e) => setForm({ ...form, maxPrice: e.target.value })} />
          <button type="submit" className="sc-btn sc-btn--sm">Create rule</button>
          <button type="button" className="sc-btn sc-btn--sec sc-btn--sm" onClick={() => setApplied(applyRules())}>Apply rules now</button>
        </form>
        {applied != null && <p className="sc-note">{applied} offer(s) repriced into their bands.</p>}
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Rule</th><th>Scope</th><th>Min</th><th>Max</th><th>Status</th><th /></tr></thead>
            <tbody>
              {rules.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.scope === 'all' ? 'All products' : r.scope}</td>
                  <td>{money(r.minPrice)}</td>
                  <td>{money(r.maxPrice)}</td>
                  <td>
                    <button type="button" className="sc-link" onClick={() => { savePricingRule({ ...r, active: !r.active }); refresh(); }}>
                      {r.active ? 'Active' : 'Paused'}
                    </button>
                  </td>
                  <td><button type="button" className="sc-iconbtn" aria-label="Delete rule" onClick={() => { deletePricingRule(r.id); refresh(); }}><Trash2 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rules.length === 0 && <p className="sc-empty">No pricing rules yet.</p>}
      </div>
    </div>
  );
}

/* ═══════════ ORDERS ═══════════ */
const ORDER_TABS = [
  ['all', 'All'],
  ['pending', 'Pending'],
  ['packed', 'Unshipped'],
  ['shipped', 'Shipped'],
  ['cancelled', 'Cancelled'],
];

function tabMatch(o, t) {
  if (t === 'all') return true;
  if (t === 'pending') return o.status === 'pending';
  if (t === 'packed') return o.status === 'packed';
  if (t === 'shipped') return o.status === 'shipped' || o.status === 'delivered';
  if (t === 'cancelled') return o.status === 'cancelled';
  return true;
}

function OrdersView({ ctx }) {
  const { orders, query, reload } = ctx;
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const [ship, setShip] = useState(null);
  const [refund, setRefund] = useState(null);
  const q = query.trim().toLowerCase();
  const list = orders.filter((o) => tabMatch(o, tab))
    .filter((o) => !q || [o.id, o.customer, o.email, o.phone, o.status].filter(Boolean).join(' ').toLowerCase().includes(q));

  return (
    <div>
      <h1 className="sc-h1">Manage Orders</h1>
      <p className="sc-sub">Confirm shipments, print invoices, issue refunds.</p>
      <div className="sc-card">
        <div className="sc-tabs">
          {ORDER_TABS.map(([id, l]) => {
            const n = orders.filter((o) => tabMatch(o, id)).length;
            return (
              <button key={id} type="button" className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
                {l} ({id === 'all' ? orders.length : n})
              </button>
            );
          })}
        </div>
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Order ID</th><th>Date</th><th>Buyer</th><th>Items</th><th>Total</th><th>Status</th><th /></tr></thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id}>
                  <td><button type="button" className="sc-link" onClick={() => setSelected(o)}>{o.id}</button></td>
                  <td><small>{new Date(o.date).toLocaleString()}</small></td>
                  <td>{o.customer || '—'}<br /><small>{o.email || ''}</small></td>
                  <td>{(o.items || []).reduce((s, it) => s + Number(it.qty || 0), 0)}</td>
                  <td><strong>{money(o.total)}</strong>{Number(o.refunded) > 0 && <><br /><small>Refunded {money(o.refunded)}</small></>}</td>
                  <td><span className={`sc-badge sc-st-${o.status}`}>{o.status}</span></td>
                  <td>
                    <span className="sc-cellmain">
                      {(o.status === 'pending' || o.status === 'packed') && (
                        <button type="button" className="sc-btn sc-btn--sm" onClick={() => setShip(o)}>Confirm shipment</button>
                      )}
                      <button type="button" className="sc-link" onClick={() => setRefund(o)}>Refund</button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <p className="sc-empty">No orders in this view.</p>}
      </div>
      {selected && <OrderDetailModal order={selected} onClose={() => { setSelected(null); reload(); }} onShip={(o) => { setSelected(null); setShip(o); }} />}
      {ship && <ShipModal order={ship} onClose={() => { setShip(null); reload(); }} />}
      {refund && <RefundModal order={refund} onClose={() => { setRefund(null); reload(); }} />}
    </div>
  );
}

function OrderDetailModal({ order, onClose, onShip }) {
  const addr = order.address || {};
  const fees = orderFees(order);
  return (
    <div className="sc-modalbg" onClick={onClose}>
      <div className="sc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={order.id}>
        <div className="sc-modal__head">
          <h3>Order {order.id}</h3>
          <button type="button" className="sc-iconbtn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <p className="sc-note">{new Date(order.date).toLocaleString()} · {order.payment?.method?.toUpperCase()} · {order.coupon ? `Coupon ${order.coupon}` : 'No coupon'}</p>
        <h4>Buyer &amp; ship-to</h4>
        <p>{order.customer} · {order.email} · {order.phone || '—'}<br />{addr.line}, {addr.city} {addr.zip}, {addr.country || ''}</p>
        {order.tracking?.trackingId && <p><Truck size={14} /> {order.tracking.carrier} · Tracking: <strong>{order.tracking.trackingId}</strong></p>}
        {order.notes && <p className="sc-note">Note: {order.notes}</p>}
        <h4>Items</h4>
        <ul className="sc-list">
          {(order.items || []).map((it, i) => <li key={i}>{it.name} × {it.qty} — {money(Number(it.price) * Number(it.qty))}</li>)}
        </ul>
        <div className="sc-kv"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
        {!!order.discount && <div className="sc-kv"><span>Discount</span><span>−{money(order.discount)}</span></div>}
        <div className="sc-kv"><span>Shipping</span><span>{money(order.shipping)}</span></div>
        <div className="sc-kv"><span>Tax</span><span>{money(order.tax)}</span></div>
        <div className="sc-kv sc-kv--total"><span>Total</span><span>{money(order.total)}</span></div>
        <h4>Fees (est.)</h4>
        <div className="sc-kv"><span>Referral fee (15%)</span><span>−{money(fees.referral)}</span></div>
        <div className="sc-kv"><span>Closing fee</span><span>−{money(fees.closing)}</span></div>
        {!!fees.refund && <div className="sc-kv"><span>Refunded</span><span>−{money(fees.refund)}</span></div>}
        <h4>History</h4>
        <ul className="sc-list">
          {(order.timeline || [{ status: order.status, date: order.date }]).map((t, i) => (
            <li key={i}>{t.status} · {new Date(t.date).toLocaleString()}</li>
          ))}
        </ul>
        <div className="sc-frow" style={{ marginTop: 12 }}>
          {(order.status === 'pending' || order.status === 'packed') && (
            <button type="button" className="sc-btn sc-btn--sm" onClick={() => onShip(order)}>Confirm shipment</button>
          )}
          <button type="button" className="sc-btn sc-btn--sec sc-btn--sm" onClick={() => window.print()}>
            <Printer size={14} /> Print invoice
          </button>
          <select className="sc-select" value={order.status}
            onChange={(e) => { updateOrderStatus(order.id, e.target.value); onClose(); }} aria-label="Order status">
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

function ShipModal({ order, onClose }) {
  const [carrier, setCarrier] = useState('Standard');
  const [tid, setTid] = useState('');
  const save = (e) => {
    e.preventDefault();
    updateOrder(order.id, {
      status: 'shipped',
      tracking: { carrier, trackingId: tid.trim() || `TRK-${Date.now().toString().slice(-8)}`, date: new Date().toISOString() },
    });
    onClose();
  };
  return (
    <div className="sc-modalbg" onClick={onClose}>
      <div className="sc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Confirm shipment">
        <div className="sc-modal__head">
          <h3>Confirm shipment · {order.id}</h3>
          <button type="button" className="sc-iconbtn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <form className="sc-stackform" onSubmit={save}>
          <label>Carrier
            <select className="sc-select" value={carrier} onChange={(e) => setCarrier(e.target.value)}>
              <option>Standard</option><option>Express</option><option>USPS</option><option>FedEx</option><option>UPS</option><option>India Post</option>
            </select>
          </label>
          <label>Tracking ID (optional — auto-generated)<input className="sc-input" value={tid} onChange={(e) => setTid(e.target.value)} placeholder="TRK-…" /></label>
          <button type="submit" className="sc-btn">Confirm shipment</button>
        </form>
      </div>
    </div>
  );
}

function RefundModal({ order, onClose }) {
  const max = Math.max(0, Number(order.total || 0) - Number(order.refunded || 0));
  const [amt, setAmt] = useState(max.toFixed(2));
  const save = (e) => {
    e.preventDefault();
    const v = Math.min(max, Math.max(0, Number(amt) || 0));
    if (v <= 0) return;
    updateOrder(order.id, { refunded: Number(order.refunded || 0) + v });
    onClose();
  };
  return (
    <div className="sc-modalbg" onClick={onClose}>
      <div className="sc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Issue refund">
        <div className="sc-modal__head">
          <h3>Refund · {order.id}</h3>
          <button type="button" className="sc-iconbtn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <p className="sc-note">Order total {money(order.total)} · already refunded {money(order.refunded)} · refundable {money(max)}</p>
        <form className="sc-stackform" onSubmit={save}>
          <label>Refund amount ($)<input className="sc-input" type="number" min="0" max={max} step="0.01" value={amt} onChange={(e) => setAmt(e.target.value)} /></label>
          <button type="submit" className="sc-btn">Issue refund</button>
        </form>
      </div>
    </div>
  );
}

function ReturnsView({ ctx }) {
  const { orders, reload } = ctx;
  const [list, setList] = useState(() => getReturns());
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ orderId: '', product: '', reason: RETURN_REASONS[0], amount: '' });
  const refresh = () => { setList(getReturns()); reload(); };

  const create = (e) => {
    e.preventDefault();
    if (!form.orderId) return;
    const o = getOrders().find((x) => String(x.id) === String(form.orderId));
    saveReturn({
      orderId: form.orderId,
      product: form.product || (o?.items || []).map((it) => `${it.name} ×${it.qty}`).join(', '),
      customer: o?.customer || '', email: o?.email || '',
      reason: form.reason, amount: Number(form.amount) || Number(o?.total || 0),
    });
    setForm({ orderId: '', product: '', reason: RETURN_REASONS[0], amount: '' });
    setShowNew(false);
    refresh();
  };

  const refundReturn = (r) => {
    const o = getOrders().find((x) => String(x.id) === String(r.orderId));
    if (o) updateOrder(o.id, { refunded: Number(o.refunded || 0) + Number(r.amount || 0) });
    updateReturnStatus(r.id, 'refunded');
    refresh();
  };

  return (
    <div>
      <h1 className="sc-h1">Manage Returns</h1>
      <p className="sc-sub">Review return requests, send labels, issue refunds.</p>
      <div className="sc-card">
        <div className="sc-card__head">
          <h2>Return requests ({list.length})</h2>
          <button type="button" className="sc-btn sc-btn--sm" onClick={() => setShowNew((v) => !v)}>{showNew ? 'Close' : 'New return'}</button>
        </div>
        {showNew && (
          <form className="sc-form" onSubmit={create}>
            <select className="sc-select" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })}>
              <option value="">Select order…</option>
              {orders.map((o) => <option key={o.id} value={o.id}>{o.id} · {o.customer} · {money(o.total)}</option>)}
            </select>
            <input className="sc-input" placeholder="Product (auto)" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} />
            <select className="sc-select" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
              {RETURN_REASONS.map((r) => <option key={r}>{r}</option>)}
            </select>
            <input className="sc-input" type="number" min="0" step="0.01" placeholder="Amount ($)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <button type="submit" className="sc-btn sc-btn--sm">Create</button>
          </form>
        )}
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Return</th><th>Order</th><th>Reason</th><th>Amount</th><th>Status</th><th /></tr></thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.id}</strong><br /><small>{new Date(r.date).toLocaleString()} · {r.customer}</small></td>
                  <td><small>{r.orderId}</small><br /><small>{r.product}</small></td>
                  <td>{r.reason}</td>
                  <td>{money(r.amount)}</td>
                  <td>
                    <select className="sc-select" value={r.status} onChange={(e) => { updateReturnStatus(r.id, e.target.value); refresh(); }} aria-label={`Return ${r.id}`}>
                      {RETURN_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <span className="sc-cellmain">
                      {r.status !== 'refunded' && <button type="button" className="sc-link" onClick={() => refundReturn(r)}>Refund</button>}
                      <button type="button" className="sc-iconbtn" aria-label="Delete" onClick={() => { deleteReturn(r.id); refresh(); }}><Trash2 size={15} /></button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <p className="sc-empty">No return requests.</p>}
      </div>
    </div>
  );
}

function MessagesView({ ctx }) {
  const { reload } = ctx;
  const [list, setList] = useState(() => getMessages());
  const [filter, setFilter] = useState('all');
  const [replyTo, setReplyTo] = useState(null);
  const [reply, setReply] = useState('');
  const [comp, setComp] = useState(false);
  const [form, setForm] = useState({ email: '', name: '', orderId: '', subject: '', text: '' });
  const refresh = () => { setList(getMessages()); reload(); };

  const shown = list.filter((m) => {
    if (filter === 'unread') return m.from === 'buyer' && !m.read;
    if (filter === 'sent') return m.from === 'seller';
    return true;
  });

  const sendReply = (e) => {
    e.preventDefault();
    if (!reply.trim() || !replyTo) return;
    sendMessage({
      from: 'seller', name: 'Oatly Store', email: replyTo.email,
      orderId: replyTo.orderId, subject: `Re: ${replyTo.subject}`,
      text: reply.trim(),
    });
    markMessageRead(replyTo.id, true);
    setReply('');
    setReplyTo(null);
    refresh();
  };

  const compose = (e) => {
    e.preventDefault();
    if (!form.email.trim() || !form.text.trim()) return;
    sendMessage({ from: 'seller', name: 'Oatly Store', ...form });
    setForm({ email: '', name: '', orderId: '', subject: '', text: '' });
    setComp(false);
    refresh();
  };

  return (
    <div>
      <h1 className="sc-h1">Buyer Messages</h1>
      <p className="sc-sub">Answer within 24 hours to protect your response metric.</p>
      <div className="sc-card">
        <div className="sc-card__head">
          <div className="sc-tabs" style={{ border: 'none', margin: 0 }}>
            {[['all', 'All'], ['unread', 'Unread'], ['sent', 'Sent']].map(([id, l]) => (
              <button key={id} type="button" className={filter === id ? 'is-active' : ''} onClick={() => setFilter(id)}>{l}</button>
            ))}
          </div>
          <button type="button" className="sc-btn sc-btn--sm" onClick={() => setComp((v) => !v)}>Compose</button>
        </div>
        {comp && (
          <form className="sc-form" onSubmit={compose}>
            <input className="sc-input" placeholder="Buyer email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input className="sc-input" placeholder="Buyer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="sc-input" placeholder="Order ID" value={form.orderId} onChange={(e) => setForm({ ...form, orderId: e.target.value })} />
            <input className="sc-input" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <input className="sc-input" placeholder="Message *" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
            <button type="submit" className="sc-btn sc-btn--sm">Send</button>
          </form>
        )}
        <ul className="sc-list">
          {shown.map((m) => (
            <li key={m.id} style={{ display: 'block' }}>
              <div className="sc-cellmain" style={{ justifyContent: 'space-between' }}>
                <span>
                  <span className={`sc-badge ${m.from === 'buyer' ? 'sc-b-orange' : 'sc-b-blue'}`}>{m.from === 'buyer' ? 'Buyer' : 'You'}</span>{' '}
                  <strong>{m.subject || '(no subject)'}</strong>{' '}
                  <small>· {m.name} · {m.email} {m.orderId && `· order ${m.orderId}`} · {new Date(m.date).toLocaleString()}</small>
                  {m.from === 'buyer' && !m.read && <span className="sc-badge sc-b-red">unread</span>}
                </span>
                <span className="sc-cellmain">
                  {m.from === 'buyer' && <button type="button" className="sc-link" onClick={() => { setReplyTo(m); markMessageRead(m.id, true); refresh(); }}>Reply</button>}
                  <button type="button" className="sc-iconbtn" aria-label="Delete" onClick={() => { deleteMessage(m.id); refresh(); }}><Trash2 size={14} /></button>
                </span>
              </div>
              <p style={{ margin: '6px 0 0' }}>{m.text}</p>
              {replyTo?.id === m.id && (
                <form onSubmit={sendReply} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  <input className="sc-input" style={{ flex: 1 }} placeholder="Write reply…" value={reply} onChange={(e) => setReply(e.target.value)} />
                  <button type="submit" className="sc-btn sc-btn--sm">Send</button>
                </form>
              )}
            </li>
          ))}
        </ul>
        {shown.length === 0 && <p className="sc-empty">No messages.</p>}
      </div>
    </div>
  );
}

/* ═══════════ ADVERTISING ═══════════ */
function CampsView({ ctx }) {
  const { products, reload } = ctx;
  const [list, setList] = useState(() => getCampaigns());
  const [editing, setEditing] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const refresh = () => { setList(getCampaigns()); reload(); };

  const seedStats = () => {
    getCampaigns().forEach((c) => {
      const impr = 1000 + Math.floor(Math.random() * 9000);
      const clicks = Math.floor(impr * (0.02 + Math.random() * 0.05));
      const spend = Math.round(clicks * (0.4 + Math.random() * 0.8) * 100) / 100;
      const sales = Math.round(spend * (2 + Math.random() * 5) * 100) / 100;
      saveCampaign({ ...c, impressions: impr, clicks, spend, sales });
    });
    refresh();
  };

  const totals = list.reduce((s, c) => ({ spend: s.spend + Number(c.spend || 0), sales: s.sales + Number(c.sales || 0), clicks: s.clicks + Number(c.clicks || 0), impr: s.impr + Number(c.impressions || 0) }), { spend: 0, sales: 0, clicks: 0, impr: 0 });
  const acos = totals.sales ? (totals.spend / totals.sales) * 100 : 0;

  return (
    <div>
      <h1 className="sc-h1">Campaign Manager</h1>
      <p className="sc-sub">Sponsored Products — budgets, spend and ACoS.</p>
      <div className="sc-grid">
        <div className="sc-stat"><small>Ad spend</small><strong>{money(totals.spend)}</strong></div>
        <div className="sc-stat"><small>Ad sales</small><strong>{money(totals.sales)}</strong></div>
        <div className="sc-stat"><small>ACoS</small><strong>{acos.toFixed(1)}%</strong></div>
        <div className="sc-stat"><small>Clicks</small><strong>{totals.clicks}</strong><span className="sc-note">{totals.impr} impressions</span></div>
      </div>
      <div className="sc-card">
        <div className="sc-card__head">
          <h2>Campaigns ({list.length})</h2>
          <span className="sc-cellmain">
            {list.length > 0 && <button type="button" className="sc-btn sc-btn--sec sc-btn--sm" onClick={seedStats}>Simulate performance</button>}
            <button type="button" className="sc-btn sc-btn--sm" onClick={() => setShowNew(true)}>Create campaign</button>
          </span>
        </div>
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Campaign</th><th>Status</th><th>Budget/day</th><th>Impr.</th><th>Clicks</th><th>Spend</th><th>Sales</th><th>ACoS</th><th /></tr></thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong><br /><small>{(c.products || []).length} product(s) · since {c.startDate}</small></td>
                  <td>
                    <button type="button" className="sc-link" onClick={() => { saveCampaign({ ...c, status: c.status === 'enabled' ? 'paused' : 'enabled' }); refresh(); }}>
                      {c.status}
                    </button>
                  </td>
                  <td>{money(c.dailyBudget)}</td>
                  <td>{c.impressions || 0}</td>
                  <td>{c.clicks || 0}</td>
                  <td>{money(c.spend)}</td>
                  <td>{money(c.sales)}</td>
                  <td>{campaignAcos(c).toFixed(1)}%</td>
                  <td>
                    <span className="sc-cellmain">
                      <button type="button" className="sc-link" onClick={() => setEditing(c)}>Edit</button>
                      <button type="button" className="sc-iconbtn" aria-label="Delete" onClick={() => { deleteCampaign(c.id); refresh(); }}><Trash2 size={15} /></button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <p className="sc-empty">No campaigns yet. Create one to promote your listings.</p>}
      </div>
      {(editing || showNew) && (
        <CampaignForm
          initial={editing} products={products}
          onClose={() => { setEditing(null); setShowNew(false); }}
          onSaved={() => { setEditing(null); setShowNew(false); refresh(); }}
        />
      )}
    </div>
  );
}

function CampaignForm({ initial, products, onClose, onSaved }) {
  const [f, setF] = useState({
    name: initial?.name || '',
    dailyBudget: initial?.dailyBudget ?? 10,
    status: initial?.status || 'enabled',
    products: initial?.products || [],
  });
  const toggleP = (id) => setF({
    ...f,
    products: f.products.includes(id) ? f.products.filter((x) => x !== id) : [...f.products, id],
  });
  const save = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    saveCampaign({ ...(initial || {}), name: f.name.trim(), dailyBudget: Number(f.dailyBudget) || 10, status: f.status, products: f.products });
    onSaved();
  };
  return (
    <div className="sc-modalbg" onClick={onClose}>
      <div className="sc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Campaign">
        <div className="sc-modal__head">
          <h3>{initial ? 'Edit campaign' : 'Create campaign'}</h3>
          <button type="button" className="sc-iconbtn" onClick={onClose} aria-label="Close"><X size={16} /></button>
        </div>
        <form className="sc-stackform" onSubmit={save}>
          <label>Campaign name *<input className="sc-input" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
          <div className="sc-form" style={{ marginBottom: 0 }}>
            <label>Daily budget ($)<input className="sc-input" type="number" min="1" step="1" value={f.dailyBudget} onChange={(e) => setF({ ...f, dailyBudget: e.target.value })} /></label>
            <label>Status
              <select className="sc-select" value={f.status} onChange={(e) => setF({ ...f, status: e.target.value })}>
                <option value="enabled">Enabled</option>
                <option value="paused">Paused</option>
              </select>
            </label>
          </div>
          <label>Advertised products
            <span style={{ display: 'grid', gap: 4, maxHeight: 180, overflowY: 'auto', fontWeight: 400 }}>
              {products.map((p) => {
                const key = String(p.id ?? p.slug ?? p.name);
                return (
                  <label key={key} className="sc-check">
                    <input type="checkbox" checked={f.products.includes(key)} onChange={() => toggleP(key)} /> {p.name} · {money(p.price)}
                  </label>
                );
              })}
            </span>
          </label>
          <button type="submit" className="sc-btn">Save campaign</button>
        </form>
      </div>
    </div>
  );
}

function DealsView({ ctx }) {
  const { reload } = ctx;
  const [coupons, setCoupons] = useState(() => getCoupons());
  const [form, setForm] = useState({ code: '', type: 'percent', value: 10, minOrder: 0, startsAt: '', endsAt: '', active: true });
  const refresh = () => { setCoupons(getCoupons()); reload(); };

  const save = (e) => {
    e.preventDefault();
    if (!form.code.trim()) return;
    saveCoupon({
      ...form, code: form.code.trim().toUpperCase(),
      value: Number(form.value), minOrder: Number(form.minOrder),
      startsAt: form.startsAt || '', endsAt: form.endsAt || '',
    });
    setForm({ code: '', type: 'percent', value: 10, minOrder: 0, startsAt: '', endsAt: '', active: true });
    refresh();
  };

  const sched = (c) => {
    if (c.startsAt || c.endsAt) return `${c.startsAt || '…'} → ${c.endsAt || '…'}`;
    return 'Always on';
  };

  return (
    <div>
      <h1 className="sc-h1">Deals &amp; Coupons</h1>
      <p className="sc-sub">Schedule promotions like Lightning Deals — live only inside their window.</p>
      <div className="sc-card">
        <form className="sc-form" onSubmit={save}>
          <input className="sc-input" placeholder="CODE *" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
          <select className="sc-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="percent">% off</option>
            <option value="flat">Flat $ off</option>
            <option value="freeship">Free shipping</option>
          </select>
          <input className="sc-input" type="number" min="0" placeholder="Value" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
          <input className="sc-input" type="number" min="0" placeholder="Min order" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} />
          <input className="sc-input" type="date" aria-label="Starts" value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} />
          <input className="sc-input" type="date" aria-label="Ends" value={form.endsAt} onChange={(e) => setForm({ ...form, endsAt: e.target.value })} />
          <button type="submit" className="sc-btn sc-btn--sm"><Plus size={14} /> Create</button>
        </form>
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Code</th><th>Offer</th><th>Schedule</th><th>Used</th><th>Status</th><th /></tr></thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.code}>
                  <td><strong>{c.code}</strong><br /><small>min {money(c.minOrder)}</small></td>
                  <td>{c.type === 'percent' ? `${c.value}%` : c.type === 'flat' ? money(c.value) : 'FREESHIP'}</td>
                  <td><small>{sched(c)}</small></td>
                  <td>{c.used || 0}</td>
                  <td>
                    <button type="button" className="sc-link" onClick={() => { saveCoupon({ ...c, active: !c.active }); refresh(); }}>
                      {c.active ? 'Active' : 'Paused'}
                    </button>
                  </td>
                  <td><button type="button" className="sc-iconbtn" aria-label={`Delete ${c.code}`} onClick={() => { deleteCoupon(c.code); refresh(); }}><Trash2 size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ═══════════ PERFORMANCE ═══════════ */
function HealthView({ ctx }) {
  const { products, orders } = ctx;
  const h = computeAccountHealth(orders, getReviews(), products);
  const m = h.metrics;
  const row = (label, val, target, pass) => (
    <tr>
      <td>{label}</td>
      <td><strong>{val}</strong></td>
      <td><small>{target}</small></td>
      <td>{pass ? <span className="sc-badge sc-b-green">Within target</span> : <span className="sc-badge sc-b-red">Needs attention</span>}</td>
    </tr>
  );
  return (
    <div>
      <h1 className="sc-h1">Account Health</h1>
      <p className="sc-sub">Your Account Health Rating, based on real store data.</p>
      <div className="sc-card">
        <div className="sc-health">
          <div className={`sc-ring${h.status === 'Healthy' ? '' : h.status === 'At risk' ? ' warn' : ' bad'}`}>
            <strong>{h.score}</strong><small>/ 100</small>
          </div>
          <div>
            <h2 style={{ margin: '0 0 4px' }}>{h.status}</h2>
            <p className="sc-note">Fix the red rows below to raise your rating.</p>
          </div>
        </div>
      </div>
      <div className="sc-card">
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Metric</th><th>Yours</th><th>Target</th><th>Status</th></tr></thead>
            <tbody>
              {row('Order cancellation rate', `${m.cancelRate}%`, 'Under 2.5%', m.cancelRate < 2.5)}
              {row('Refund rate', `${m.refundRate}%`, 'As low as possible', m.refundRate < 5)}
              {row('Average product rating', `${m.avgRating} ★`, 'Above 4.0', m.avgRating >= 4)}
              {row('1–2 star reviews', `${m.negPct}%`, 'Under 10%', m.negPct < 10)}
              {row('Out-of-stock listings', `${m.outOfStock} (${m.oosPct}%)`, '0%', m.outOfStock === 0)}
              {row('Tracked orders', `${m.totalOrders}`, '—', true)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FeedbackView({ ctx }) {
  const { reload } = ctx;
  const [list, setList] = useState(() => getReviews());
  const refresh = () => { setList(getReviews()); reload(); };
  const avg = list.length ? (list.reduce((s, r) => s + Number(r.rating || 0), 0) / list.length) : 0;
  return (
    <div>
      <h1 className="sc-h1">Customer Feedback</h1>
      <p className="sc-sub">Star ratings and reviews buyers left on your listings.</p>
      <div className="sc-grid">
        <div className="sc-stat"><small>Average rating</small><strong>{avg.toFixed(1)} ★</strong></div>
        <div className="sc-stat"><small>Total reviews</small><strong>{list.length}</strong></div>
        <div className="sc-stat"><small>1–2 star</small><strong>{list.filter((r) => Number(r.rating) <= 2).length}</strong></div>
      </div>
      <div className="sc-card">
        <ul className="sc-list">
          {list.map((r) => (
            <li key={r.id} style={{ display: 'block' }}>
              <div className="sc-cellmain" style={{ justifyContent: 'space-between' }}>
                <span><strong>{'★'.repeat(Number(r.rating) || 0)}</strong> · <strong>{r.author}</strong> · {r.productId} · <small>{new Date(r.date).toLocaleString()}</small></span>
                <span className="sc-cellmain">
                  <button type="button" className="sc-link" onClick={() => { setReviewApproved(r.id, !r.approved); refresh(); }}>{r.approved ? 'Hide' : 'Show'}</button>
                  <button type="button" className="sc-iconbtn" aria-label="Delete" onClick={() => { deleteReview(r.id); refresh(); }}><Trash2 size={14} /></button>
                </span>
              </div>
              <p style={{ margin: '6px 0 0' }}>{r.text}</p>
            </li>
          ))}
        </ul>
        {list.length === 0 && <p className="sc-empty">No feedback yet.</p>}
      </div>
    </div>
  );
}

function VocView({ ctx }) {
  const { products } = ctx;
  const reviews = getReviews().filter((r) => r.approved !== false);
  const byProduct = {};
  reviews.forEach((r) => {
    const k = String(r.productId);
    byProduct[k] = byProduct[k] || { ratings: [], texts: [] };
    byProduct[k].ratings.push(Number(r.rating) || 0);
    if (Number(r.rating) <= 2) byProduct[k].texts.push(r);
  });
  const rows = Object.entries(byProduct).map(([pid, v]) => {
    const p = products.find((x) => String(x.id ?? x.slug ?? x.name) === pid);
    const avg = v.ratings.reduce((s, r) => s + r, 0) / v.ratings.length;
    return { pid, name: p?.name || pid, avg, count: v.ratings.length, neg: v.texts };
  }).sort((a, b) => a.avg - b.avg);

  return (
    <div>
      <h1 className="sc-h1">Voice of the Customer</h1>
      <p className="sc-sub">Listings sorted by customer sentiment — fix the top rows first.</p>
      <div className="sc-card">
        {rows.length === 0 ? <p className="sc-empty">No customer signals yet.</p> : (
          <div className="sc-tablewrap">
            <table className="sc-table">
              <thead><tr><th>Listing</th><th>Avg. rating</th><th>Reviews</th><th>Top complaint</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.pid}>
                    <td><strong>{r.name}</strong></td>
                    <td>
                      <span className={`sc-badge ${r.avg >= 4 ? 'sc-b-green' : r.avg >= 3 ? 'sc-b-orange' : 'sc-b-red'}`}>
                        {r.avg.toFixed(1)} ★
                      </span>
                    </td>
                    <td>{r.count}</td>
                    <td><small>{r.neg[0]?.text || '—'}</small></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════ REPORTS ═══════════ */
function BizReportsView({ ctx }) {
  const { products, orders, range, setRange } = ctx;
  const inR = orders.filter((o) => inRange(o.date, range) && o.status !== 'cancelled');

  const per = {};
  inR.forEach((o) => (o.items || []).forEach((it) => {
    const k = it.name || it.id;
    per[k] = per[k] || { name: k, units: 0, revenue: 0 };
    per[k].units += Number(it.qty || 0);
    per[k].revenue += Number(it.price || 0) * Number(it.qty || 0);
  }));
  const rows = Object.values(per).sort((a, b) => b.revenue - a.revenue);
  const totalRev = rows.reduce((s, r) => s + r.revenue, 0);

  const byCat = {};
  rows.forEach((r) => {
    const p = products.find((x) => x.name === r.name);
    const c = p?.category || 'Other';
    byCat[c] = byCat[c] || { cat: c, units: 0, revenue: 0 };
    byCat[c].units += r.units;
    byCat[c].revenue += r.revenue;
  });

  const csvBiz = () => downloadCSV(`business-report-${range}.csv`, [
    ['Product', 'Units ordered', 'Revenue', 'Share %'],
    ...rows.map((r) => [r.name, r.units, r.revenue.toFixed(2), totalRev ? ((r.revenue / totalRev) * 100).toFixed(1) : 0]),
  ]);

  return (
    <div>
      <h1 className="sc-h1">Business Reports</h1>
      <p className="sc-sub">Detail Page Sales and Traffic by product.</p>
      <div className="sc-card">
        <div className="sc-card__head">
          <select className="sc-select" value={range} onChange={(e) => setRange(e.target.value)} aria-label="Date range">
            {RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <button type="button" className="sc-btn sc-btn--sm" onClick={csvBiz}><Download size={14} /> Download CSV</button>
        </div>
        <div className="sc-grid">
          <div className="sc-stat"><small>Revenue ({range})</small><strong>{money(totalRev)}</strong></div>
          <div className="sc-stat"><small>Units</small><strong>{rows.reduce((s, r) => s + r.units, 0)}</strong></div>
          <div className="sc-stat"><small>Orders</small><strong>{inR.length}</strong></div>
        </div>
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Product</th><th>Units ordered</th><th>Revenue</th><th>Share</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.units}</td>
                  <td>{money(r.revenue)}</td>
                  <td>{totalRev ? ((r.revenue / totalRev) * 100).toFixed(1) : 0}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <p className="sc-empty">No sales in this period.</p>}
      </div>
      <div className="sc-card">
        <h2>By category</h2>
        <ul className="sc-list">
          {Object.values(byCat).map((c) => (
            <li key={c.cat}><strong>{c.cat}</strong> · {c.units} units · {money(c.revenue)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OrderReportsView({ ctx }) {
  const { orders, range, setRange } = ctx;
  const inR = orders.filter((o) => inRange(o.date, range));
  const lines = [];
  inR.forEach((o) => {
    (o.items || []).forEach((it) => {
      lines.push([o.date, o.id, o.status, o.customer, o.email, it.name, it.qty, Number(it.price).toFixed(2), (Number(it.price) * Number(it.qty)).toFixed(2)]);
    });
  });
  const csv = () => downloadCSV(`order-report-${range}.csv`, [
    ['Date', 'Order ID', 'Status', 'Buyer', 'Email', 'Item', 'Qty', 'Unit price', 'Line total'],
    ...lines,
  ]);
  return (
    <div>
      <h1 className="sc-h1">Order Reports</h1>
      <p className="sc-sub">Every ordered line item, ready for accounting.</p>
      <div className="sc-card">
        <div className="sc-card__head">
          <select className="sc-select" value={range} onChange={(e) => setRange(e.target.value)} aria-label="Date range">
            {RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <button type="button" className="sc-btn sc-btn--sm" onClick={csv}><Download size={14} /> Download CSV ({lines.length} lines)</button>
        </div>
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Date</th><th>Order</th><th>Item</th><th>Qty</th><th>Total</th></tr></thead>
            <tbody>
              {lines.slice(0, 100).map((l, i) => (
                <tr key={i}><td><small>{new Date(l[0]).toLocaleDateString()}</small></td><td><small>{l[1]}</small></td><td>{l[5]}</td><td>{l[6]}</td><td>{money(l[8])}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        {lines.length === 0 && <p className="sc-empty">No lines in this period.</p>}
        {lines.length > 100 && <p className="sc-note">Showing first 100 of {lines.length} — full data is in the CSV.</p>}
      </div>
    </div>
  );
}

/* ═══════════ PAYMENTS ═══════════ */
function PayStateView({ ctx }) {
  const { orders, range, setRange } = ctx;
  const inR = orders.filter((o) => inRange(o.date, range));
  const fees = inR.map((o) => ({ o, f: orderFees(o) }));
  const gross = fees.reduce((s, x) => s + x.f.total, 0);
  const ref = fees.reduce((s, x) => s + x.f.referral, 0);
  const close = fees.reduce((s, x) => s + x.f.closing, 0);
  const refd = fees.reduce((s, x) => s + x.f.refund, 0);
  const net = gross - ref - close - refd;

  const csv = () => downloadCSV(`settlement-${range}.csv`, [
    ['Order', 'Date', 'Gross', 'Referral fee', 'Closing fee', 'Refunds', 'Net proceeds'],
    ...fees.map((x) => [x.o.id, x.o.date, x.f.total.toFixed(2), x.f.referral.toFixed(2), x.f.closing.toFixed(2), x.f.refund.toFixed(2), x.f.net.toFixed(2)]),
  ]);

  return (
    <div>
      <h1 className="sc-h1">Statements</h1>
      <p className="sc-sub">Sales proceeds, fees and refunds — 15% referral + $1 closing per order.</p>
      <div className="sc-grid">
        <div className="sc-stat"><small>Gross sales</small><strong>{money(gross)}</strong></div>
        <div className="sc-stat"><small>Fees</small><strong>−{money(ref + close)}</strong></div>
        <div className="sc-stat"><small>Refunds</small><strong>−{money(refd)}</strong></div>
        <div className="sc-stat"><small>Net proceeds</small><strong>{money(net)}</strong></div>
      </div>
      <div className="sc-card">
        <div className="sc-card__head">
          <select className="sc-select" value={range} onChange={(e) => setRange(e.target.value)} aria-label="Date range">
            {RANGES.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
          <button type="button" className="sc-btn sc-btn--sm" onClick={csv}><Download size={14} /> Download CSV</button>
        </div>
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Order</th><th>Date</th><th>Gross</th><th>Referral</th><th>Closing</th><th>Refund</th><th>Net</th></tr></thead>
            <tbody>
              {fees.map((x) => (
                <tr key={x.o.id}>
                  <td><small>{x.o.id}</small></td>
                  <td><small>{new Date(x.o.date).toLocaleDateString()}</small></td>
                  <td>{money(x.f.total)}</td>
                  <td>−{money(x.f.referral)}</td>
                  <td>−{money(x.f.closing)}</td>
                  <td>−{money(x.f.refund)}</td>
                  <td><strong>{money(x.f.net)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {fees.length === 0 && <p className="sc-empty">No transactions in this period.</p>}
      </div>
    </div>
  );
}

function PayDisbView({ ctx }) {
  const { orders, reload } = ctx;
  const net = orders.filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + orderFees(o).net, 0);
  const [list, setList] = useState(() => getDisbursements());
  const paid = list.reduce((s, d) => s + Number(d.amount || 0), 0);
  const balance = Math.max(0, net - paid);
  const [dest, setDest] = useState('Bank ****1234');

  const transfer = () => {
    if (balance <= 0) return;
    saveDisbursement({ amount: Math.round(balance * 100) / 100, destination: dest });
    setList(getDisbursements());
    reload();
  };

  return (
    <div>
      <h1 className="sc-h1">Disbursements</h1>
      <p className="sc-sub">Transfer your balance to your bank account.</p>
      <div className="sc-grid">
        <div className="sc-stat"><small>Available balance</small><strong>{money(balance)}</strong></div>
        <div className="sc-stat"><small>Total disbursed</small><strong>{money(paid)}</strong></div>
      </div>
      <div className="sc-card">
        <div className="sc-frow">
          <input className="sc-input" value={dest} onChange={(e) => setDest(e.target.value)} aria-label="Destination" style={{ minWidth: 200 }} />
          <button type="button" className="sc-btn" disabled={balance <= 0} onClick={transfer}>
            Transfer {money(balance)}
          </button>
        </div>
      </div>
      <div className="sc-card">
        <h2>History</h2>
        {list.length === 0 ? <p className="sc-empty">No disbursements yet.</p> : (
          <ul className="sc-list">
            {list.map((d) => (
              <li key={d.id}><strong>{d.id}</strong> · {money(d.amount)} · {d.destination} · {new Date(d.date).toLocaleString()} <span className="sc-badge sc-b-green">{d.status}</span></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ═══════════ CUSTOMERS ═══════════ */
function CustomersView({ ctx, go }) {
  const { customers, orders, query, reload } = ctx;
  const [selected, setSelected] = useState(null);
  const q = query.trim().toLowerCase();
  const list = customers.filter((c) => !q || [c.name, c.email].filter(Boolean).join(' ').toLowerCase().includes(q));
  const spent = (email) => orders.filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase() && o.status !== 'cancelled')
    .reduce((s, o) => s + Number(o.total || 0), 0);
  const count = (email) => orders.filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase()).length;

  return (
    <div>
      <h1 className="sc-h1">All Customers</h1>
      <p className="sc-sub">Registered buyers, their orders and lifetime spend.</p>
      <div className="sc-card">
        <div className="sc-tablewrap">
          <table className="sc-table">
            <thead><tr><th>Buyer</th><th>Orders</th><th>Lifetime spend</th><th /></tr></thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.email}>
                  <td><strong>{c.name}</strong><br /><small>{c.email} · since {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</small></td>
                  <td>{count(c.email)}</td>
                  <td><strong>{money(spent(c.email))}</strong></td>
                  <td>
                    <span className="sc-cellmain">
                      <button type="button" className="sc-link" onClick={() => setSelected(c)}>View</button>
                      <button type="button" className="sc-link" onClick={() => go('messages')}>Message</button>
                      <button type="button" className="sc-iconbtn" aria-label="Remove" onClick={() => { deleteAccount(c.email); reload(); }}><Trash2 size={15} /></button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {list.length === 0 && <p className="sc-empty">No customers yet.</p>}
      </div>
      {selected && (
        <div className="sc-modalbg" onClick={() => setSelected(null)}>
          <div className="sc-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={selected.email}>
            <div className="sc-modal__head">
              <h3>{selected.name}</h3>
              <button type="button" className="sc-iconbtn" onClick={() => setSelected(null)} aria-label="Close"><X size={16} /></button>
            </div>
            <p className="sc-note">{selected.email} · {count(selected.email)} order(s) · {money(spent(selected.email))} lifetime</p>
            <ul className="sc-list">
              {orders.filter((o) => String(o.email || '').toLowerCase() === String(selected.email).toLowerCase()).map((o) => (
                <li key={o.id}><strong>{o.id}</strong> · {new Date(o.date).toLocaleDateString()} · {money(o.total)} <span className={`sc-badge sc-st-${o.status}`}>{o.status}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════ SETTINGS ═══════════ */
function useStoreForm(ctx) {
  const [s, setS] = useState(() => getSettings());
  const save = (e) => {
    e.preventDefault();
    saveSettings({
      ...s,
      shippingFee: Number(s.shippingFee), freeShipThreshold: Number(s.freeShipThreshold),
      taxRate: Number(s.taxRate), returnWindowDays: Number(s.returnWindowDays) || 30,
    });
    ctx.reload();
  };
  const set = (k) => (e) => setS({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  return [s, set, save];
}

function SetAcctView({ ctx }) {
  const [s, set, save] = useStoreForm(ctx);
  return (
    <div>
      <h1 className="sc-h1">Account Info</h1>
      <p className="sc-sub">Your seller profile and notification preferences.</p>
      <div className="sc-card">
        <form className="sc-stackform" onSubmit={save}>
          <label>Store name<input className="sc-input" value={s.storeName} onChange={set('storeName')} /></label>
          <label>Currency<input className="sc-input" value={s.currency} onChange={set('currency')} maxLength={3} /></label>
          <label className="sc-check"><input type="checkbox" checked={s.notifyOrders !== false} onChange={set('notifyOrders')} /> Email me on new orders</label>
          <label className="sc-check"><input type="checkbox" checked={s.notifyStock !== false} onChange={set('notifyStock')} /> Email me on low stock</label>
          <label className="sc-check"><input type="checkbox" checked={!!s.notifyReviews} onChange={set('notifyReviews')} /> Email me on new reviews</label>
          <button type="submit" className="sc-btn">Save</button>
        </form>
      </div>
      <div className="sc-card">
        <h2>Admin access</h2>
        <p className="sc-note">First registered user becomes admin automatically. To pin a specific email, add it to ADMIN_EMAILS in <code>src/config/adminConfig.js</code>.</p>
        <p><Link to="/products" className="sc-link"><Store size={13} /> View storefront</Link></p>
      </div>
    </div>
  );
}

function SetShipView({ ctx }) {
  const [s, set, save] = useStoreForm(ctx);
  return (
    <div>
      <h1 className="sc-h1">Shipping Settings</h1>
      <p className="sc-sub">Standard delivery rates buyers see at checkout.</p>
      <div className="sc-card">
        <form className="sc-stackform" onSubmit={save}>
          <label>Standard shipping fee ($)<input className="sc-input" type="number" step="0.01" min="0" value={s.shippingFee} onChange={set('shippingFee')} /></label>
          <label>Free shipping over ($)<input className="sc-input" type="number" step="1" min="0" value={s.freeShipThreshold} onChange={set('freeShipThreshold')} /></label>
          <label>Tax rate (0.08 = 8%)<input className="sc-input" type="number" step="0.01" min="0" max="1" value={s.taxRate} onChange={set('taxRate')} /></label>
          <button type="submit" className="sc-btn">Save</button>
        </form>
      </div>
    </div>
  );
}

function SetRetView({ ctx }) {
  const [s, set, save] = useStoreForm(ctx);
  const clearDemo = () => {
    try {
      localStorage.removeItem('oatly-orders');
      localStorage.removeItem('oatly-cart');
      localStorage.removeItem('oatly-coupons');
      localStorage.removeItem('oatly-reviews');
      localStorage.removeItem('oatly-returns');
      localStorage.removeItem('oatly-messages');
      localStorage.removeItem('oatly-campaigns');
    } catch { /* ignore */ }
    ctx.reload();
  };
  return (
    <div>
      <h1 className="sc-h1">Return Settings</h1>
      <p className="sc-sub">Your return policy, shown during returns.</p>
      <div className="sc-card">
        <form className="sc-stackform" onSubmit={save}>
          <label>Return window (days)<input className="sc-input" type="number" min="1" max="90" value={s.returnWindowDays || 30} onChange={set('returnWindowDays')} /></label>
          <label>Return address<input className="sc-input" value={s.returnAddress || ''} onChange={set('returnAddress')} placeholder="Warehouse address" /></label>
          <button type="submit" className="sc-btn">Save</button>
        </form>
      </div>
      <div className="sc-card">
        <h2>Danger zone</h2>
        <button type="button" className="sc-btn sc-btn--sec sc-btn--sm" onClick={clearDemo}>Clear demo data (orders, returns, messages, campaigns)</button>
      </div>
    </div>
  );
}
