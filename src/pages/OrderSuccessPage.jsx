import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { getOrders } from '../models/adminStore.js';
import { getSettings } from '../models/shopStore.js';
import '../styles/Shop.css';

export default function OrderSuccessPage() {
  const { id } = useParams();
  const order = getOrders().find((o) => String(o.id) === String(id));
  const s = getSettings();

  return (
    <div className="shop-page">
      <SEO title="Order confirmed | Oatly Shop" description="Thank you for your order." pathname={`/order-success/${id}`} />
      <div className="shop-shell shop-shell--narrow">
        <div className="shop-card" style={{ textAlign: 'center' }}>
          <CheckCircle2 size={48} style={{ margin: '0 auto' }} />
          <p className="shop-kicker" style={{ marginTop: 12 }}>Order confirmed</p>
          <h1>Thank you!</h1>
          <p className="shop-sub">
            {order ? (
              <>Order <strong>{order.id}</strong> · {s.currency}{Number(order.total).toFixed(2)} · {order.payment?.method?.toUpperCase()}</>
            ) : (
              <>Tamaru order mali gayo chhe.</>
            )}
          </p>
          <p className="shop-sub">Confirmation email to mokalvama aavse (demo). Status Account → Orders ma joi shako cho.</p>
          <div className="shop-actions" style={{ justifyContent: 'center' }}>
            <Link to="/products" className="shop-btn">Continue shopping</Link>
            <Link to="/account" className="shop-btn shop-btn--ghost">My orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
