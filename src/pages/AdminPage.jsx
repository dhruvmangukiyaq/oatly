import React, { useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, Plus, Trash2,
  Pencil, Search, LogOut, Store, RotateCcw, Tag, Star,
  FolderOpen, Settings as SettingsIcon, Eye, X, Printer,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth, getAllAccounts, deleteAccount } from '../hooks/useAuth.js';
import { isAdmin } from '../hooks/useAuth.js';
import ProductModel from '../models/productModel.js';
import { useApiData } from '../hooks/useApiData.js';
import {
  mergeProducts, saveProductOverride, deleteProductAdmin, restoreProductAdmin,
  addCustomProduct, getProductOverrides,
  getOrders, saveOrder, updateOrderStatus, deleteOrder, getRevenue,
  ORDER_STATUSES,
} from '../models/adminStore.js';
import {
  enrichProduct, getCoupons, saveCoupon, deleteCoupon,
  getSettings, saveSettings, getReviews, deleteReview, setReviewApproved,
  getCustomCategories, saveCategory, deleteCategory,
} from '../models/shopStore.js';
import '../styles/AdminPage.css';

/* ==========================================================================
   ADMIN PANEL — proper e-commerce dashboard (Flipkart/Shopify jevu).
   Keval admin (tame) maate. Sections:
   Dashboard | Orders | Products | Categories | Customers | Coupons | Reviews | Settings
   ========================================================================== */

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'categories', label: 'Categories', icon: FolderOpen },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'coupons', label: 'Coupons', icon: Tag },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

function RequireAdmin({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin(user)) {
    return (
      <div className="admin-page">
        <div className="admin-card admin-denied">
          <h1>Access denied.</h1>
          <p>Aa page keval admin maate chhe. Tamaaru account customer chhe.</p>
          <div className="admin-actions">
            <Link to="/products" className="admin-btn">Shop now</Link>
            <Link to="/" className="admin-btn admin-btn--ghost">Home</Link>
          </div>
        </div>
      </div>
    );
  }
  return children;
}

function Stat({ label, value, sub }) {
  return (
    <div className="admin-stat">
      <p className="admin-stat__value">{value}</p>
      <p className="admin-stat__label">{label}</p>
      {sub && <p className="admin-stat__sub">{sub}</p>}
    </div>
  );
}

function money(n) {
  return `$${(Number(n) || 0).toFixed(2)}`;
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
  const [tab, setTab] = useState('dashboard');
  const [query, setQuery] = useState('');
  const [refresh, setRefresh] = useState(0);

  const baseProducts = useApiData(() => ProductModel.getAllProducts(), []) || [];
  const baseCategories = useApiData(() => ProductModel.getProductCategories(), []) || [];
  const overrides = getProductOverrides();

  const products = useMemo(() => {
    const list = Array.isArray(baseProducts) ? baseProducts : [];
    return mergeProducts(list).map((p) => enrichProduct(p, overrides));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseProducts, refresh]);

  const orders = useMemo(() => getOrders(), // eslint-disable-next-line react-hooks/exhaustive-deps
  [refresh]);
  const accounts = useMemo(() => getAllAccounts(), // eslint-disable-next-line react-hooks/exhaustive-deps
  [refresh]);
  const customers = accounts.filter((a) => a.role !== 'admin');
  const revenue = getRevenue(orders);

  const reload = () => setRefresh((v) => v + 1);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const pendingReviews = getReviews().filter((r) => !r.approved).length;

  return (
    <div className="admin-page">
      <SEO title="Admin Panel | Oatly" description="Shop admin — orders, products, customers." pathname="/admin" />
      <div className="admin-shell">
        <aside className="admin-side">
          <p className="admin-kicker">Oatly shop</p>
          <h1>Admin panel</h1>
          <p className="admin-who">
            Logged in as <strong>{user?.name}</strong>
            <span className="admin-badge">ADMIN</span>
          </p>
          <nav className="admin-tabs" aria-label="Admin sections">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={tab === id ? 'is-active' : ''}
                onClick={() => { setTab(id); setQuery(''); }}
              >
                <Icon size={16} aria-hidden="true" /> {label}
                {id === 'orders' && pendingCount > 0 && <span className="admin-count">{pendingCount}</span>}
                {id === 'reviews' && pendingReviews > 0 && <span className="admin-count">{pendingReviews}</span>}
              </button>
            ))}
          </nav>
          <div className="admin-side__foot">
            <Link to="/products" className="admin-btn admin-btn--ghost admin-btn--small">
              <Store size={15} aria-hidden="true" /> View shop
            </Link>
            <Link to="/login" onClick={logout} className="admin-btn admin-btn--small admin-btn--ghost">
              <LogOut size={15} aria-hidden="true" /> Logout
            </Link>
          </div>
        </aside>

        <section className="admin-main">
          <div className="admin-toolbar">
            <div className="admin-search">
              <Search size={16} aria-hidden="true" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${tab}…`} aria-label="Search" />
            </div>
          </div>

          {tab === 'dashboard' && <Dashboard products={products} orders={orders} customers={customers} revenue={revenue} onGo={setTab} reload={reload} />}
          {tab === 'orders' && <OrdersTab items={orders} query={query} reload={reload} />}
          {tab === 'products' && <ProductsTab items={products} query={query} reload={reload} baseCategories={baseCategories} />}
          {tab === 'categories' && <CategoriesTab baseCategories={baseCategories} reload={reload} />}
          {tab === 'customers' && <CustomersTab items={customers} query={query} orders={orders} reload={reload} />}
          {tab === 'coupons' && <CouponsTab reload={reload} />}
          {tab === 'reviews' && <ReviewsTab reload={reload} />}
          {tab === 'settings' && <SettingsTab reload={reload} />}
        </section>
      </div>
    </div>
  );
}

/* ── Dashboard ── */
function last14Days() {
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }
  return days;
}

function Dashboard({ products, orders, customers, revenue, onGo, reload }) {
  const days = useMemo(() => last14Days(), []);
  const byDay = days.map((d) => {
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const total = orders
      .filter((o) => o.status !== 'cancelled')
      .filter((o) => { const t = new Date(o.date); return t >= d && t < next; })
      .reduce((s, o) => s + Number(o.total || 0), 0);
    return { day: d, total };
  });
  const max = Math.max(1, ...byDay.map((b) => b.total));
  const aov = orders.length ? revenue / orders.length : 0;
  const pending = orders.filter((o) => o.status === 'pending').length;
  const lowStock = products.filter((p) => Number(p.stock ?? 999) <= 5 && p.status === 'active');

  const statusBreak = ORDER_STATUSES.map((s) => ({ s, n: orders.filter((o) => o.status === s).length }));

  // Top products by revenue from order items
  const prodSales = {};
  orders.forEach((o) => (o.items || []).forEach((it) => {
    const k = it.name || it.id;
    prodSales[k] = prodSales[k] || { name: k, qty: 0, rev: 0 };
    prodSales[k].qty += Number(it.qty || 0);
    prodSales[k].rev += Number(it.price || 0) * Number(it.qty || 0);
  }));
  const top = Object.values(prodSales).sort((a, b) => b.rev - a.rev).slice(0, 5);
  const recent = orders.slice(0, 5);

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
        subtotal: sub,
        discount: 0,
        shipping: sub >= 50 ? 0 : 4.99,
        tax: sub * 0.08,
        total: sub + (sub >= 50 ? 0 : 4.99) + sub * 0.08,
        payment: { method: i % 2 ? 'card' : 'cod' },
        status: statuses[i % statuses.length],
        date: d.toISOString(),
        timeline: [{ status: 'pending', date: d.toISOString() }],
      });
    }
    reload();
  };

  return (
    <div>
      <div className="admin-grid">
        <Stat label="Revenue" value={money(revenue)} sub={`${orders.length} orders`} />
        <Stat label="Avg. order" value={money(aov)} sub="AOV" />
        <Stat label="Products" value={products.filter((p) => p.status === 'active').length} sub={`${products.length} total`} />
        <Stat label="Pending" value={pending} sub="need action" />
        <Stat label="Customers" value={customers.length} sub="registered" />
      </div>

      <div className="admin-panel">
        <div className="admin-panel__head">
          <h2>Revenue · last 14 days</h2>
          {orders.length === 0 && <button type="button" className="admin-btn admin-btn--small" onClick={seedDemo}>Load demo data</button>}
        </div>
        <div className="admin-chart">
          {byDay.map((b, i) => (
            <div key={i} className="admin-bar" title={`${b.day.toLocaleDateString()}: ${money(b.total)}`}>
              <div className="admin-bar__fill" style={{ height: `${Math.max(3, (b.total / max) * 100)}%` }} />
              <span>{b.day.getDate()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-grid2">
        <div className="admin-panel">
          <div className="admin-panel__head"><h2>Order status</h2></div>
          <ul className="admin-list">
            {statusBreak.map(({ s, n }) => (
              <li key={s}><span className={`admin-pill admin-pill--${s}`}>{s}</span> <strong>{n}</strong></li>
            ))}
          </ul>
          <button type="button" className="admin-link" onClick={() => onGo('orders')}>Manage orders →</button>
        </div>
        <div className="admin-panel">
          <div className="admin-panel__head"><h2>Top products</h2></div>
          {top.length === 0 ? <p className="admin-empty">Haju sales nathi.</p> : (
            <ul className="admin-list">
              {top.map((t) => <li key={t.name}><strong>{t.name}</strong> · {t.qty} sold · {money(t.rev)}</li>)}
            </ul>
          )}
        </div>
      </div>

      <div className="admin-grid2">
        <div className="admin-panel">
          <div className="admin-panel__head"><h2>Low stock (≤5)</h2><button type="button" className="admin-link" onClick={() => onGo('products')}>Restock →</button></div>
          {lowStock.length === 0 ? <p className="admin-empty">Badhu stock OK chhe.</p> : (
            <ul className="admin-list">{lowStock.slice(0, 6).map((p) => <li key={p.id}><strong>{p.name}</strong> · {p.stock} left · {money(p.price)}</li>)}</ul>
          )}
        </div>
        <div className="admin-panel">
          <div className="admin-panel__head"><h2>Recent orders</h2><button type="button" className="admin-link" onClick={() => onGo('orders')}>All →</button></div>
          {recent.length === 0 ? <p className="admin-empty">Haju koi order nathi.</p> : (
            <ul className="admin-list">
              {recent.map((o) => (
                <li key={o.id}><strong>{o.id}</strong> · {o.customer || o.email} · {money(o.total)} <span className={`admin-pill admin-pill--${o.status}`}>{o.status}</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Orders ── */
function OrdersTab({ items, query, reload }) {
  const [statusF, setStatusF] = useState('all');
  const [selected, setSelected] = useState(null);
  const q = query.trim().toLowerCase();
  const list = items.filter((o) => {
    if (statusF !== 'all' && o.status !== statusF) return false;
    if (!q) return true;
    return [o.id, o.customer, o.email, o.phone, o.status].filter(Boolean).join(' ').toLowerCase().includes(q);
  });

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <h2>Orders ({list.length})</h2>
        <select value={statusF} onChange={(e) => setStatusF(e.target.value)} className="admin-select" aria-label="Filter by status">
          <option value="all">All statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="admin-tablewrap">
        <table className="admin-table">
          <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th /></tr></thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id}>
                <td><strong>{o.id}</strong><br /><small>{new Date(o.date).toLocaleString()}</small></td>
                <td>{o.customer || '—'}<br /><small>{o.email || ''}</small></td>
                <td>{(o.items || []).reduce((s, it) => s + Number(it.qty || 0), 0)}</td>
                <td><strong>{money(o.total)}</strong><br /><small>{o.payment?.method?.toUpperCase()}</small></td>
                <td>
                  <select className={`admin-pill admin-pill--${o.status}`} value={o.status}
                    onChange={(e) => { updateOrderStatus(o.id, e.target.value); reload(); }} aria-label={`Status for ${o.id}`}>
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="admin-rowactions">
                  <button type="button" className="admin-iconbtn" aria-label="View" onClick={() => setSelected(o)}><Eye size={15} /></button>
                  <button type="button" className="admin-iconbtn admin-iconbtn--danger" aria-label="Delete" onClick={() => { deleteOrder(o.id); reload(); }}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {list.length === 0 && <p className="admin-empty">Koi order nathi.</p>}
      {selected && <OrderDetail order={selected} onClose={() => { setSelected(null); reload(); }} />}
    </div>
  );
}

function OrderDetail({ order, onClose }) {
  const [status, setStatus] = useState(order.status);
  const save = () => { updateOrderStatus(order.id, status); onClose(); };
  const addr = order.address || {};
  return (
    <div className="admin-modalbg" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={`Order ${order.id}`}>
        <div className="admin-modal__head">
          <h3>{order.id}</h3>
          <button type="button" className="admin-iconbtn" onClick={onClose} aria-label="Close"><X size={15} /></button>
        </div>
        <p className="admin-note">{new Date(order.date).toLocaleString()} · {order.payment?.method?.toUpperCase()} · {order.coupon ? `Coupon ${order.coupon}` : 'No coupon'}</p>
        <h4>Customer</h4>
        <p>{order.customer} · {order.email} · {order.phone || '—'}</p>
        <p>{addr.line}, {addr.city} {addr.zip}, {addr.country || ''}</p>
        {order.notes && <p className="admin-note">Note: {order.notes}</p>}
        <h4>Items</h4>
        <ul className="admin-list">
          {(order.items || []).map((it, i) => (
            <li key={i}>{it.name} × {it.qty} — {money(Number(it.price) * Number(it.qty))}</li>
          ))}
        </ul>
        <div className="shop-row"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
        {!!order.discount && <div className="shop-row"><span>Discount</span><span>−{money(order.discount)}</span></div>}
        <div className="shop-row"><span>Shipping</span><span>{money(order.shipping)}</span></div>
        <div className="shop-row"><span>Tax</span><span>{money(order.tax)}</span></div>
        <div className="shop-row shop-row--total"><span>Total</span><span>{money(order.total)}</span></div>
        <h4>Timeline</h4>
        <ul className="admin-list">
          {(order.timeline || [{ status: order.status, date: order.date }]).map((t, i) => (
            <li key={i}>{t.status} · {new Date(t.date).toLocaleString()}</li>
          ))}
        </ul>
        <div className="admin-form">
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="button" className="admin-btn admin-btn--small" onClick={save}>Update status</button>
          <button type="button" className="admin-btn admin-btn--small admin-btn--ghost" onClick={() => window.print()}>
            <Printer size={14} /> Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Products ── */
function ProductsTab({ items, query, reload, baseCategories }) {
  const [catF, setCatF] = useState('all');
  const [statusF, setStatusF] = useState('all');
  const [editing, setEditing] = useState(null);
  const [showNew, setShowNew] = useState(false);
  const deleted = getProductOverrides().__deleted || [];
  const cats = ['Oat Drink', 'Oatgurt', 'Ice Cream', 'Cold Foam', 'Spread', ...(baseCategories || []).map((c) => c.name)].filter((v, i, a) => a.indexOf(v) === i);

  const q = query.trim().toLowerCase();
  const list = items.filter((p) => {
    if (catF !== 'all' && p.category !== catF) return false;
    if (statusF !== 'all' && (p.status || 'active') !== statusF) return false;
    if (!q) return true;
    return [p.name, p.category, p.id].filter(Boolean).join(' ').toLowerCase().includes(q);
  });

  return (
    <div className="admin-panel">
      <div className="admin-panel__head">
        <h2>Products ({list.length})</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select value={catF} onChange={(e) => setCatF(e.target.value)} className="admin-select" aria-label="Category">
            <option value="all">All categories</option>
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusF} onChange={(e) => setStatusF(e.target.value)} className="admin-select" aria-label="Status">
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <button type="button" className="admin-btn admin-btn--small" onClick={() => setShowNew(true)}>
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {deleted.length > 0 && (
        <p className="admin-note">
          {deleted.length} hidden.
          {deleted.slice(0, 5).map((id) => (
            <button key={id} type="button" className="admin-link" onClick={() => { restoreProductAdmin(id); reload(); }}>
              <RotateCcw size={13} /> {id}
            </button>
          ))}
        </p>
      )}

      <div className="admin-tablewrap">
        <table className="admin-table">
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th>★</th><th /></tr></thead>
          <tbody>
            {list.map((p) => {
              const key = String(p.id ?? p.slug ?? p.name);
              return (
                <tr key={key}>
                  <td>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {p.image && <img src={p.image} alt="" style={{ width: 40, height: 40, objectFit: 'cover', border: '2px solid #111', borderRadius: 8 }} />}
                      <span><strong>{p.name}</strong><br /><small>{key}</small></span>
                    </div>
                  </td>
                  <td>{p.category || '—'}</td>
                  <td><strong>{money(p.price)}</strong><br /><small><s>{money(p.mrp)}</s></small></td>
                  <td>
                    <input
                      className="admin-cellinput" type="number" min="0" defaultValue={p.stock ?? ''}
                      onBlur={(e) => { saveProductOverride(key, { stock: Number(e.target.value) }); reload(); }}
                      aria-label={`Stock for ${p.name}`}
                    />
                  </td>
                  <td>
                    <select
                      className="admin-pill" value={p.status || 'active'}
                      onChange={(e) => { saveProductOverride(key, { status: e.target.value }); reload(); }}
                      aria-label={`Status for ${p.name}`}
                    >
                      <option value="active">active</option>
                      <option value="draft">draft</option>
                      <option value="archived">archived</option>
                    </select>
                  </td>
                  <td>
                    <button type="button" className="admin-iconbtn" aria-label="Featured" title="Featured"
                      onClick={() => { saveProductOverride(key, { featured: !p.featured }); reload(); }}
                      style={{ background: p.featured ? '#fceb50' : '#fff' }}>
                      <Star size={15} fill={p.featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="admin-rowactions">
                    <button type="button" className="admin-iconbtn" aria-label="Edit" onClick={() => setEditing(p)}><Pencil size={15} /></button>
                    <button type="button" className="admin-iconbtn admin-iconbtn--danger" aria-label="Delete"
                      onClick={() => { deleteProductAdmin(key, Boolean(p.isCustom)); reload(); }}><Trash2 size={15} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {list.length === 0 && <p className="admin-empty">Koi product nathi.</p>}

      {(editing || showNew) && (
        <ProductForm
          initial={editing}
          categories={cats}
          onClose={() => { setEditing(null); setShowNew(false); }}
          onSaved={() => { setEditing(null); setShowNew(false); reload(); }}
        />
      )}
    </div>
  );
}

function ProductForm({ initial, categories, onClose, onSaved }) {
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
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const save = (e) => {
    e.preventDefault();
    if (f.name.trim().length < 2) return;
    const payload = {
      name: f.name.trim(),
      category: f.category,
      price: Number(f.price) || 0,
      mrp: Number(f.mrp) || 0,
      stock: Number(f.stock) || 0,
      status: f.status,
      featured: f.featured,
      image: f.image,
      tagline: f.tagline,
    };
    if (initial && !initial.isCustom) {
      saveProductOverride(String(initial.id ?? initial.slug ?? initial.name), payload);
    } else if (initial?.isCustom) {
      const data = getProductOverrides();
      data.__custom = (data.__custom || []).map((p) =>
        String(p.id) === String(initial.id) ? { ...p, ...payload } : p,
      );
      try { localStorage.setItem('oatly-admin-products', JSON.stringify(data)); } catch { /* ignore */ }
    } else {
      addCustomProduct({ ...payload, description: payload.tagline });
    }
    onSaved();
  };

  return (
    <div className="admin-modalbg" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Product form">
        <div className="admin-modal__head">
          <h3>{initial ? 'Edit product' : 'New product'}</h3>
          <button type="button" className="admin-iconbtn" onClick={onClose} aria-label="Close"><X size={15} /></button>
        </div>
        <form className="shop-form" onSubmit={save}>
          <label>Name *<input value={f.name} onChange={set('name')} /></label>
          <div className="shop-form shop-form--2">
            <label>Category
              <select value={f.category} onChange={set('category')}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>Status
              <select value={f.status} onChange={set('status')}>
                <option value="active">active</option>
                <option value="draft">draft</option>
                <option value="archived">archived</option>
              </select>
            </label>
            <label>Price ($)<input type="number" min="0" step="0.01" value={f.price} onChange={set('price')} /></label>
            <label>MRP ($)<input type="number" min="0" step="0.01" value={f.mrp} onChange={set('mrp')} /></label>
            <label>Stock<input type="number" min="0" step="1" value={f.stock} onChange={set('stock')} /></label>
            <label>Image URL<input value={f.image} onChange={set('image')} placeholder="https://…" /></label>
          </div>
          <label>Tagline<input value={f.tagline} onChange={set('tagline')} /></label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" checked={f.featured} onChange={set('featured')} style={{ width: 18, height: 18 }} /> Featured product
          </label>
          <button type="submit" className="admin-btn">Save product</button>
        </form>
      </div>
    </div>
  );
}

/* ── Categories ── */
function CategoriesTab({ baseCategories, reload }) {
  const [form, setForm] = useState({ name: '', description: '' });
  const custom = getCustomCategories();
  const all = [...(baseCategories || []), ...custom];

  const add = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return;
    saveCategory({ name: form.name.trim(), description: form.description });
    setForm({ name: '', description: '' });
    reload();
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__head"><h2>Categories ({all.length})</h2></div>
      <form className="admin-form" onSubmit={add}>
        <input placeholder="New category name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button type="submit" className="admin-btn admin-btn--small"><Plus size={14} /> Add</button>
      </form>
      <ul className="admin-list">
        {(baseCategories || []).map((c) => <li key={c.slug}><strong>{c.name}</strong> <small>· builtin · {(c.items || []).length} items</small></li>)}
        {custom.map((c) => (
          <li key={c.slug}><strong>{c.name}</strong> <small>· custom</small>
            <button type="button" className="admin-iconbtn admin-iconbtn--danger" onClick={() => { deleteCategory(c.slug); reload(); }} aria-label={`Delete ${c.name}`}>
              <Trash2 size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Customers ── */
function CustomersTab({ items, query, orders, reload }) {
  const [selected, setSelected] = useState(null);
  const q = query.trim().toLowerCase();
  const list = items.filter((c) => !q || [c.name, c.email].filter(Boolean).join(' ').toLowerCase().includes(q));
  const spent = (email) => orders.filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase() && o.status !== 'cancelled')
    .reduce((s, o) => s + Number(o.total || 0), 0);
  const count = (email) => orders.filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase()).length;

  return (
    <div className="admin-panel">
      <div className="admin-panel__head"><h2>Customers ({list.length})</h2></div>
      <div className="admin-tablewrap">
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Orders</th><th>Spent</th><th /></tr></thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.email}>
                <td><strong>{c.name}</strong><br /><small>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</small></td>
                <td>{c.email}</td>
                <td>{count(c.email)}</td>
                <td><strong>{money(spent(c.email))}</strong></td>
                <td className="admin-rowactions">
                  <button type="button" className="admin-iconbtn" aria-label="View" onClick={() => setSelected(c)}><Eye size={15} /></button>
                  <button type="button" className="admin-iconbtn admin-iconbtn--danger" aria-label="Remove" onClick={() => { deleteAccount(c.email); reload(); }}><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {list.length === 0 && <p className="admin-empty">Haju koi customer nathi.</p>}
      {selected && (
        <div className="admin-modalbg" onClick={() => setSelected(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={selected.email}>
            <div className="admin-modal__head">
              <h3>{selected.name}</h3>
              <button type="button" className="admin-iconbtn" onClick={() => setSelected(null)} aria-label="Close"><X size={15} /></button>
            </div>
            <p className="admin-note">{selected.email} · Total spent {money(spent(selected.email))}</p>
            <ul className="admin-list">
              {orders.filter((o) => String(o.email || '').toLowerCase() === String(selected.email).toLowerCase()).map((o) => (
                <li key={o.id}><strong>{o.id}</strong> · {new Date(o.date).toLocaleDateString()} · {money(o.total)} <span className={`admin-pill admin-pill--${o.status}`}>{o.status}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Coupons ── */
function CouponsTab({ reload }) {
  const [coupons, setCoupons] = useState(() => getCoupons());
  const [form, setForm] = useState({ code: '', type: 'percent', value: 10, minOrder: 0, expiry: '', active: true });
  const refresh = () => { setCoupons(getCoupons()); reload(); };

  const save = (e) => {
    e.preventDefault();
    if (!form.code.trim()) return;
    saveCoupon({ ...form, code: form.code.trim().toUpperCase(), value: Number(form.value), minOrder: Number(form.minOrder) });
    setForm({ code: '', type: 'percent', value: 10, minOrder: 0, expiry: '', active: true });
    refresh();
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__head"><h2>Coupons ({coupons.length})</h2></div>
      <form className="admin-form" onSubmit={save}>
        <input placeholder="CODE *" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
        <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
          <option value="percent">% off</option>
          <option value="flat">Flat $ off</option>
          <option value="freeship">Free shipping</option>
        </select>
        <input type="number" min="0" placeholder="Value" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        <input type="number" min="0" placeholder="Min order" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} />
        <input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} />
        <button type="submit" className="admin-btn admin-btn--small"><Plus size={14} /> Save</button>
      </form>
      <div className="admin-tablewrap">
        <table className="admin-table">
          <thead><tr><th>Code</th><th>Offer</th><th>Min</th><th>Expiry</th><th>Used</th><th>Active</th><th /></tr></thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code}>
                <td><strong>{c.code}</strong></td>
                <td>{c.type === 'percent' ? `${c.value}%` : c.type === 'flat' ? money(c.value) : 'FREESHIP'}</td>
                <td>{money(c.minOrder)}</td>
                <td><small>{c.expiry || '—'}</small></td>
                <td>{c.used || 0}</td>
                <td>
                  <button type="button" className="admin-iconbtn" onClick={() => { saveCoupon({ ...c, active: !c.active }); refresh(); }}>
                    {c.active ? 'ON' : 'OFF'}
                  </button>
                </td>
                <td>
                  <button type="button" className="admin-iconbtn admin-iconbtn--danger" onClick={() => { deleteCoupon(c.code); refresh(); }} aria-label={`Delete ${c.code}`}>
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Reviews ── */
function ReviewsTab({ reload }) {
  const [list, setList] = useState(() => getReviews());
  const refresh = () => { setList(getReviews()); reload(); };
  return (
    <div className="admin-panel">
      <div className="admin-panel__head"><h2>Reviews ({list.length})</h2></div>
      {list.length === 0 && <p className="admin-empty">Haju koi review nathi. Product page par customer review aapshe etle ahiya dekhase.</p>}
      <ul className="admin-list">
        {list.map((r) => (
          <li key={r.id}>
            <strong>{r.author}</strong> · ★{r.rating} · {r.productId}
            <br /><small>{r.text} · {new Date(r.date).toLocaleString()}</small>
            <span style={{ display: 'flex', gap: 6 }}>
              <button type="button" className="admin-iconbtn" onClick={() => { setReviewApproved(r.id, !r.approved); refresh(); }}>
                {r.approved ? 'Hide' : 'Show'}
              </button>
              <button type="button" className="admin-iconbtn admin-iconbtn--danger" onClick={() => { deleteReview(r.id); refresh(); }} aria-label="Delete review">
                <Trash2 size={14} />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Settings ── */
function SettingsTab({ reload }) {
  const [s, setS] = useState(() => getSettings());
  const save = (e) => {
    e.preventDefault();
    saveSettings({ ...s, shippingFee: Number(s.shippingFee), freeShipThreshold: Number(s.freeShipThreshold), taxRate: Number(s.taxRate) });
    reload();
  };
  const set = (k) => (e) => setS({ ...s, [k]: e.target.value });

  const clearDemo = () => {
    try {
      localStorage.removeItem('oatly-orders');
      localStorage.removeItem('oatly-cart');
      localStorage.removeItem('oatly-coupons');
      localStorage.removeItem('oatly-reviews');
    } catch { /* ignore */ }
    reload();
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__head"><h2>Store settings</h2></div>
      <form className="shop-form" onSubmit={save}>
        <label>Store name<input value={s.storeName} onChange={set('storeName')} /></label>
        <label>Announcement bar<input value={s.announcement} onChange={set('announcement')} /></label>
        <div className="shop-form shop-form--2">
          <label>Currency<input value={s.currency} onChange={set('currency')} maxLength={3} /></label>
          <label>Shipping fee ($)<input type="number" step="0.01" min="0" value={s.shippingFee} onChange={set('shippingFee')} /></label>
          <label>Free shipping over ($)<input type="number" step="1" min="0" value={s.freeShipThreshold} onChange={set('freeShipThreshold')} /></label>
          <label>Tax rate (0.08 = 8%)<input type="number" step="0.01" min="0" max="1" value={s.taxRate} onChange={set('taxRate')} /></label>
        </div>
        <button type="submit" className="admin-btn">Save settings</button>
      </form>
      <hr style={{ margin: '18px 0', border: '1px dashed #111' }} />
      <h4>Danger zone</h4>
      <button type="button" className="admin-btn admin-btn--ghost admin-btn--small" onClick={clearDemo}>
        Clear demo orders/cart/coupons
      </button>
      <p className="admin-note">Admin: pahelo signup karnar auto-admin. Chokkas email fix karva mate <code>src/config/adminConfig.js</code> ma ADMIN_EMAILS vapro.</p>
    </div>
  );
}
