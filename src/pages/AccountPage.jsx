import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Heart, Package, User as UserIcon, LogOut, RotateCcw, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth, getSession } from '../hooks/useAuth.js';
import { useShop } from '../hooks/useShop.js';
import { useCatalog, findProduct } from '../hooks/useCatalog.js';
import { getOrders } from '../models/adminStore.js';
import {
  getReturns, saveReturn, RETURN_REASONS,
  getMessages, sendMessage, getSettings,
} from '../models/shopStore.js';
import '../styles/Shop.css';

export default function AccountPage() {
  const session = getSession();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');

  if (!session) return <Navigate to="/login" replace />;

  return (
    <div className="shop-page">
      <SEO title="My Account | Oatly Shop" description="Orders, wishlist and profile." pathname="/account" />
      <div className="shop-shell">
        <p className="shop-kicker">Oatly shop</p>
        <h1>Hi, {session.name}.</h1>
        <p className="shop-sub">{session.email} · {session.role === 'admin' ? 'ADMIN' : 'CUSTOMER'}</p>
        <div className="acct-tabs">
          <button type="button" className={tab === 'orders' ? 'is-active' : ''} onClick={() => setTab('orders')}>
            <Package size={14} className="acct-ic" /> My orders
          </button>
          <button type="button" className={tab === 'returns' ? 'is-active' : ''} onClick={() => setTab('returns')}>
            <RotateCcw size={14} className="acct-ic" /> Returns
          </button>
          <button type="button" className={tab === 'messages' ? 'is-active' : ''} onClick={() => setTab('messages')}>
            <MessageSquare size={14} className="acct-ic" /> Messages
          </button>
          <button type="button" className={tab === 'wishlist' ? 'is-active' : ''} onClick={() => setTab('wishlist')}>
            <Heart size={14} className="acct-ic" /> Wishlist
          </button>
          <button type="button" className={tab === 'profile' ? 'is-active' : ''} onClick={() => setTab('profile')}>
            <UserIcon size={14} className="acct-ic" /> Profile
          </button>
          {session.role === 'admin' && <Link to="/admin" className="shop-btn shop-btn--small">Seller Central</Link>}
          <button type="button" className="shop-btn shop-btn--small shop-btn--ghost" onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
        {tab === 'orders' && <MyOrders email={session.email} />}
        {tab === 'returns' && <MyReturns email={session.email} name={session.name} />}
        {tab === 'messages' && <MyMessages email={session.email} name={session.name} />}
        {tab === 'wishlist' && <MyWishlist />}
        {tab === 'profile' && <Profile session={session} />}
      </div>
    </div>
  );
}

function MyOrders({ email }) {
  const mine = getOrders().filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase());
  if (mine.length === 0) {
    return (
      <div className="shop-card shop-empty">
        <p><strong>Haju koi order nathi.</strong></p>
        <Link to="/products" className="shop-btn shop-btn--small">Shop now</Link>
      </div>
    );
  }
  return (
    <div>
      {mine.map((o) => (
        <div key={o.id} className="order-card">
          <div className="order-card__head">
            <strong>{o.id}</strong>
            <span className={`status-pill status-${o.status}`}>{o.status}</span>
          </div>
          <p className="shop-sub">{new Date(o.date).toLocaleString()} · ${(Number(o.total) || 0).toFixed(2)}</p>
          <ul className="order-items">
            {(o.items || []).map((it, i) => (
              <li key={i}>{it.name} × {it.qty} — ${(Number(it.price) * Number(it.qty)).toFixed(2)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MyWishlist() {
  const { wishlist, toggleWish, add } = useShop();
  const { products } = useCatalog();
  const items = wishlist.map((id) => findProduct(products, id)).filter(Boolean);
  if (items.length === 0) return <div className="shop-card shop-empty"><p><strong>Wishlist khali chhe.</strong></p><p className="shop-sub">Products par ♥ dabavo.</p></div>;
  return (
    <div className="shop-card">
      {items.map((p) => (
        <div key={p.id} className="shop-line">
          {p.image ? <img src={p.image} alt={p.name} /> : <span />}
          <div>
            <p className="shop-line__name">{p.name}</p>
            <p className="shop-line__meta">${Number(p.price).toFixed(2)}</p>
            <div className="shop-actions shop-stack">
              <button type="button" className="shop-btn shop-btn--small" onClick={() => add(p.id, 1)}>Add to cart</button>
              <button type="button" className="shop-linkbtn" onClick={() => toggleWish(p.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Profile({ session }) {
  return (
    <div className="shop-card">
      <h2>Profile</h2>
      <div className="shop-row"><span>Name</span><span>{session.name}</span></div>
      <div className="shop-row"><span>Email</span><span>{session.email}</span></div>
      <div className="shop-row"><span>Role</span><span>{session.role}</span></div>
      <p className="shop-sub">Password change ane address book backend saathe aavshe.</p>
    </div>
  );
}

/* Amazon jevu: delivered/shipped order par return request */
function MyReturns({ email, name }) {
  const [tick, setTick] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState(RETURN_REASONS[0]);
  const windowDays = Number(getSettings().returnWindowDays) || 30;

  const mine = getOrders().filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase());
  const eligible = mine.filter((o) => {
    if (!(o.status === 'shipped' || o.status === 'delivered')) return false;
    const age = (Date.now() - new Date(o.date).getTime()) / 86400000;
    return age <= windowDays;
  });
  const myRets = getReturns().filter((r) => String(r.email || '').toLowerCase() === String(email).toLowerCase());

  const submit = (e) => {
    e.preventDefault();
    const o = mine.find((x) => String(x.id) === String(orderId));
    if (!o) return;
    saveReturn({
      orderId: o.id,
      product: (o.items || []).map((it) => `${it.name} ×${it.qty}`).join(', '),
      customer: name, email,
      reason, amount: Number(o.total || 0),
    });
    setOrderId('');
    setTick((v) => v + 1);
  };

  return (
    <div>
      <div className="shop-card">
        <h2>Request a return ({windowDays}-day window)</h2>
        {eligible.length === 0 ? (
          <p className="shop-sub">Koi eligible order nathi (shipped/delivered + {windowDays} divas ni andar).</p>
        ) : (
          <form className="shop-form" onSubmit={submit}>
            <label>Order
              <select value={orderId} onChange={(e) => setOrderId(e.target.value)}>
                <option value="">Select order…</option>
                {eligible.map((o) => <option key={o.id} value={o.id}>{o.id} · ${(Number(o.total) || 0).toFixed(2)}</option>)}
              </select>
            </label>
            <label>Reason
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                {RETURN_REASONS.map((r) => <option key={r}>{r}</option>)}
              </select>
            </label>
            <button type="submit" className="shop-btn shop-btn--small" disabled={!orderId}>Submit return request</button>
          </form>
        )}
      </div>
      {myRets.map((r) => (
        <div key={`${r.id}-${tick}`} className="order-card">
          <div className="order-card__head">
            <strong>{r.id}</strong>
            <span className="status-pill status-pending">{r.status}</span>
          </div>
          <p className="shop-sub">{r.orderId} · {r.reason} · ${(Number(r.amount) || 0).toFixed(2)} · {new Date(r.date).toLocaleDateString()}</p>
          <p className="shop-sub">{r.product}</p>
        </div>
      ))}
      {myRets.length === 0 && <p className="shop-sub">Haju koi return request nathi.</p>}
    </div>
  );
}

/* Amazon jevu: buyer–seller messages */
function MyMessages({ email, name }) {
  const [tick, setTick] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const mine = getOrders().filter((o) => String(o.email || '').toLowerCase() === String(email).toLowerCase());
  const threads = getMessages().filter((m) => String(m.email || '').toLowerCase() === String(email).toLowerCase());

  const send = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage({ from: 'buyer', name, email, orderId, subject: subject.trim() || 'Question about my order', text: text.trim() });
    setOrderId('');
    setSubject('');
    setText('');
    setTick((v) => v + 1);
  };

  return (
    <div>
      <div className="shop-card">
        <h2>Message the seller</h2>
        <form className="shop-form" onSubmit={send}>
          <label>Order (optional)
            <select value={orderId} onChange={(e) => setOrderId(e.target.value)}>
              <option value="">General question…</option>
              {mine.map((o) => <option key={o.id} value={o.id}>{o.id}</option>)}
            </select>
          </label>
          <label>Subject<input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" /></label>
          <label>Message<input value={text} onChange={(e) => setText(e.target.value)} placeholder="Tamaro prashna lakho…" /></label>
          <button type="submit" className="shop-btn shop-btn--small" disabled={!text.trim()}>Send</button>
        </form>
      </div>
      {threads.map((m) => (
        <div key={`${m.id}-${tick}`} className="order-card">
          <div className="order-card__head">
            <strong>{m.subject}</strong>
            <span className="status-pill status-pending">{m.from === 'buyer' ? 'You' : 'Seller'}</span>
          </div>
          <p className="shop-sub">{m.orderId ? `${m.orderId} · ` : ''}{new Date(m.date).toLocaleString()}</p>
          <p>{m.text}</p>
        </div>
      ))}
      {threads.length === 0 && <p className="shop-sub">Haju koi message nathi.</p>}
    </div>
  );
}
