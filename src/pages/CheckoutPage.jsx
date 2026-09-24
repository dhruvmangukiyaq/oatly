import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useShop } from '../hooks/useShop.js';
import { useCatalog, findProduct } from '../hooks/useCatalog.js';
import { getSession } from '../hooks/useAuth.js';
import { calcTotals, markCouponUsed, validateCoupon } from '../models/shopStore.js';
import { saveOrder } from '../models/adminStore.js';
import '../styles/Shop.css';

const PAYMENTS = [
  { id: 'cod', label: 'Cash on Delivery' },
  { id: 'card', label: 'Credit / Debit Card (demo)' },
  { id: 'upi', label: 'UPI (demo)' },
];

export default function CheckoutPage() {
  const { cart, clear, couponCode, setCouponCode, settings } = useShop();
  const { products } = useCatalog();
  const navigate = useNavigate();
  const session = getSession();

  const [form, setForm] = useState({
    name: session?.name || '', email: session?.email || '', phone: '',
    address: '', city: '', zip: '', country: 'USA',
  });
  const [pay, setPay] = useState('cod');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const lines = Object.entries(cart)
    .map(([id, qty]) => {
      const p = findProduct(products, id);
      return p ? { id, qty, name: p.name, price: p.price, image: p.image } : null;
    })
    .filter(Boolean);

  const totals = calcTotals(lines, { couponCode, settings });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const place = (e) => {
    e.preventDefault();
    setError('');
    if (lines.length === 0) { setError('Cart khali chhe.'); return; }
    if (form.name.trim().length < 2) { setError('Name lakho (2+ letters).'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) { setError('Email barabar lakho.'); return; }
    if (form.address.trim().length < 5) { setError('Address lakho.'); return; }
    if (form.city.trim().length < 2) { setError('City lakho.'); return; }
    if (form.zip.trim().length < 3) { setError('ZIP lakho.'); return; }

    const order = saveOrder({
      customer: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: { line: form.address.trim(), city: form.city.trim(), zip: form.zip.trim(), country: form.country },
      items: lines.map((l) => ({ id: l.id, name: l.name, price: l.price, qty: l.qty, image: l.image })),
      subtotal: totals.subtotal,
      discount: totals.discount,
      coupon: couponCode || null,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      payment: { method: pay },
      status: 'pending',
      notes: note,
      timeline: [{ status: 'pending', date: new Date().toISOString() }],
    });
    if (couponCode) {
      const v = validateCoupon(couponCode, totals.subtotal);
      if (v.ok) markCouponUsed(couponCode);
    }
    clear();
    setCouponCode('');
    navigate(`/order-success/${order.id}`);
  };

  return (
    <div className="shop-page">
      <SEO title="Checkout | Oatly Shop" description="Checkout securely." pathname="/checkout" />
      <div className="shop-shell">
        <p className="shop-kicker">Oatly shop</p>
        <h1>Checkout.</h1>
        <div className="steps">
          <span>Cart</span><span className="is-active">Details</span><span>Done</span>
        </div>
        {lines.length === 0 ? (
          <div className="shop-card shop-empty">
            <p><strong>Cart khali chhe.</strong></p>
            <Link to="/products" className="shop-btn">Shop now</Link>
          </div>
        ) : (
          <form onSubmit={place}>
            <div className="shop-grid2">
              <div>
                <div className="shop-card">
                  <h2>1 · Contact & shipping</h2>
                  <div className="shop-form shop-form--2">
                    <label>Name *<input value={form.name} onChange={set('name')} placeholder="FULL NAME" /></label>
                    <label>Email *<input value={form.email} onChange={set('email')} placeholder="YOU@EXAMPLE.COM" /></label>
                    <label>Phone<input value={form.phone} onChange={set('phone')} placeholder="+1 …" /></label>
                    <label>Country
                      <select value={form.country} onChange={set('country')}>
                        <option>USA</option><option>India</option><option>UK</option><option>Canada</option><option>Other</option>
                      </select>
                    </label>
                  </div>
                  <div className="shop-form" style={{ marginTop: 10 }}>
                    <label>Address *<input value={form.address} onChange={set('address')} placeholder="STREET, APT" /></label>
                    <div className="shop-form shop-form--2">
                      <label>City *<input value={form.city} onChange={set('city')} placeholder="CITY" /></label>
                      <label>ZIP *<input value={form.zip} onChange={set('zip')} placeholder="ZIP" /></label>
                    </div>
                    <label>Order note (optional)<textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Delivery note…" /></label>
                  </div>
                </div>
                <div className="shop-card">
                  <h2>2 · Payment</h2>
                  <div className="paymethods">
                    {PAYMENTS.map((p) => (
                      <label key={p.id}>
                        <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} />
                        {p.label}
                      </label>
                    ))}
                  </div>
                  <p className="shop-sub" style={{ margin: '10px 0 0' }}>Demo checkout — real payment gateway backend ma jodvanu raheshe.</p>
                </div>
                {error && <p className="shop-error">{error}</p>}
              </div>
              <div className="shop-card">
                <h2>Order summary ({lines.length})</h2>
                {lines.map((l) => (
                  <div key={l.id} className="shop-row"><span>{l.name} × {l.qty}</span><span>{settings.currency}{(l.price * l.qty).toFixed(2)}</span></div>
                ))}
                <div className="shop-row"><span>Subtotal</span><span>{settings.currency}{totals.subtotal.toFixed(2)}</span></div>
                {totals.discount > 0 && <div className="shop-row shop-row--discount"><span>Discount</span><span>−{settings.currency}{totals.discount.toFixed(2)}</span></div>}
                <div className="shop-row"><span>Shipping</span><span>{totals.shipping === 0 ? 'FREE' : `${settings.currency}${totals.shipping.toFixed(2)}`}</span></div>
                <div className="shop-row"><span>Tax</span><span>{settings.currency}{totals.tax.toFixed(2)}</span></div>
                <div className="shop-row shop-row--total"><span>Total</span><span>{settings.currency}{totals.total.toFixed(2)}</span></div>
                <div className="shop-actions">
                  <button type="submit" className="shop-btn shop-btn--big">Place order · {settings.currency}{totals.total.toFixed(2)}</button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
