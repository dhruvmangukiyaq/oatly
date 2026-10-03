import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, X, Menu, ChevronRight, User as UserIcon, ShoppingCart, Heart } from 'lucide-react';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Item order/labels come from the Model (navigationModel.js); this file only
// renders. NOTE: react-router <Link> outputs a semantic <a href> in the DOM,
// so the result stays <header><nav><ul><li><a> as required.
// STRUCTURE:
//   toolbar: Home icon (left) | current-page breadcrumb | spacer | FAQ BIZ Globe X (right)
//   nav row: PRODUCTS TASTEBUDS NEWS SUSTAINABILITY HEALTH (same order)
import NavigationModel from '../models/navigationModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { useAuth, isAdmin as checkIsAdmin } from '../hooks/useAuth.js';
import { useShop } from '../hooks/useShop.js';
import '../styles/OatlyNav.css';

export default function Navbar({ onCartOpen }) {
  const [, setOpenMenu] = useState(null); // kept for menu-reset timers (no dropdown UI)
  const [mobileOpen, setMobileOpen] = useState(false); // X/Menu drawer toggle
  const [, setExpandedSection] = useState(null); // kept for nav-reset (no sublist UI)
  const closeTimer = useRef(null);
  const location = useLocation();
  const { user } = useAuth();
  const { count: cartCount, wishlist } = useShop();
  const showAdmin = checkIsAdmin(user);
  // MODEL (async API — header renders once items arrive)
  const navItems = useApiData(() => NavigationModel.getNavItems(), []);
  const headerCrumbs =
    useApiData(
      () => NavigationModel.getHeaderBreadcrumbs(location.pathname),
      [location.pathname],
    ) || [];

  // Reset menus on navigation (minimal JS — no animation library)
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setExpandedSection(null);
  }, [location.pathname]);

  // Small close delay so moving cursor into the panel doesn't flicker it shut
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  // A11y: Esc closes dropdown / drawer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Tab switch / window blur: never return to a stuck-open dropdown
  useEffect(() => {
    const closeAll = () => {
      clearTimeout(closeTimer.current);
      setOpenMenu(null);
    };
    const onVis = () => {
      if (document.hidden) closeAll();
    };
    window.addEventListener('blur', closeAll);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('blur', closeAll);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  if (!navItems) return null;

  return (
    <header className="oatly-header">
      {/* ── Toolbar row: Home (left) | spacer | FAQ BIZ Globe X (right) ── */}
      <div className="oatly-toolbar">
        <Link to="/" className="oatly-toolbar__home" aria-label="Home">
          <Home size={20} aria-hidden="true" />
        </Link>

        {headerCrumbs.length > 0 && (
          <nav className="oatly-crumb" aria-label="Breadcrumb">
            <ChevronRight size={16} className="oatly-crumb__separator" aria-hidden="true" />
            <ol className="oatly-crumb__list">
              {headerCrumbs.map((crumb, index) => {
                const isCurrent = index === headerCrumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${index}`} className="oatly-crumb__item">
                    {index > 0 && (
                      <ChevronRight size={14} className="oatly-crumb__separator" aria-hidden="true" />
                    )}
                    {crumb.to && !isCurrent ? (
                      <Link to={crumb.to} className="oatly-crumb__link">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="oatly-crumb__current" aria-current="page">
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        <div className="oatly-toolbar__spacer" aria-hidden="true" />

        <div className="oatly-toolbar__utils">
          {/* ADMIN link shows only for the admin login — customers never see it */}
          {showAdmin && (
            <Link to="/admin" className="oatly-toolbar__link oatly-toolbar__admin">
              ADMIN
            </Link>
          )}
          <Link to="/contact" className="oatly-toolbar__link">
            FAQ
          </Link>
          <Link
            to="/contact"
            className="oatly-toolbar__link"
          >
            BIZ
          </Link>
          <button
            type="button"
            className="oatly-toolbar__btn"
            aria-label="Language: United States (EN)"
            onClick={() => alert('Region: United States (EN)')}
          >
            <Globe size={16} aria-hidden="true" />
          </button>
          <Link
            to="/login"
            className="oatly-toolbar__btn oatly-toolbar__account"
            aria-label={user ? `Account: ${user.name}` : 'Log in or create account'}
            title={user ? user.name : 'Account'}
          >
            {user ? (
              <span className="oatly-toolbar__avatar" aria-hidden="true">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <UserIcon size={16} aria-hidden="true" />
            )}
          </Link>
          {/* Shop: wishlist + cart — never shown to the admin (admins don't buy) */}
          {!showAdmin && (
            <Link to="/account" className="oatly-toolbar__btn" aria-label={`Wishlist (${wishlist.length})`} title="Wishlist">
              <Heart size={16} aria-hidden="true" />
              {wishlist.length > 0 && <span className="oatly-toolbar__count">{wishlist.length}</span>}
            </Link>
          )}
          {!showAdmin && (
            <button
              type="button"
              className="oatly-toolbar__btn"
              aria-label={`Cart (${cartCount})`}
              title="Cart"
              onClick={() => onCartOpen && onCartOpen()}
            >
              <ShoppingCart size={16} aria-hidden="true" />
              {cartCount > 0 && <span className="oatly-toolbar__count">{cartCount}</span>}
            </button>
          )}
          <button
            type="button"
            className="oatly-toolbar__btn oatly-toolbar__menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="oatly-mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button
            type="button"
            className="oatly-toolbar__btn oatly-toolbar__close-desktop"
            aria-label="Close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Main nav row: same 5 items, same order, centred ──
          Hover dropdown REMOVED — plain links only, no hover list. */}
      <nav className="oatly-navrow" aria-label="Primary">
        <ul className="oatly-navrow__list" onMouseLeave={scheduleClose}>
          {navItems.map((item) => {
            const slug = item.name.toLowerCase().replace(/[^a-z]+/g, '-');
            return (
              <li
                key={item.name}
                className={`oatly-navrow__item oatly-navrow__item--${slug}`}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(null);
                }}
              >
                <Link
                  to={item.path}
                  className="oatly-navrow__link"
                  onFocus={() => setOpenMenu(null)}
                  onBlur={scheduleClose}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Mobile drawer: same 5 items, direct links (no sublist) ── */}
      <nav
        id="oatly-mobile-menu"
        className={`oatly-mobile${mobileOpen ? ' oatly-mobile--open' : ''}`}
        aria-label="Mobile"
      >
        <ul className="oatly-mobile__list">
          {navItems.map((item) => (
            <li key={item.name} className="oatly-mobile__section">
              <Link to={item.path} className="oatly-mobile__row">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
