import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, X, Menu, ChevronDown } from 'lucide-react';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Item order/labels come from the Model (navigationModel.js); this file only
// renders. NOTE: react-router <Link> outputs a semantic <a href> in the DOM,
// so the result stays <header><nav><ul><li><a> as required.
// STRUCTURE (unchanged — styling only):
//   toolbar: Home icon (left) | spacer | FAQ BIZ Globe X (right)
//   nav row: PRODUCTS TASTEBUDS NEWS SUSTAINABILITY HEALTH (same order)
import NavigationModel from '../models/navigationModel.js';
import { useApiData } from '../hooks/useApiData.js';
import '../styles/OatlyNav.css';

export default function Navbar({ onOpenSearch }) {
  const [openMenu, setOpenMenu] = useState(null); // desktop hover dropdown
  const [mobileOpen, setMobileOpen] = useState(false); // X/Menu drawer toggle
  const [expandedSection, setExpandedSection] = useState(null); // mobile accordion
  const closeTimer = useRef(null);
  const location = useLocation();
  // MODEL (async API — header renders once items arrive)
  const navItems = useApiData(() => NavigationModel.getNavItems(), []);

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

  if (!navItems) return null;

  return (
    <header className="oatly-header">
      {/* ── Toolbar row: Home (left) | spacer | FAQ BIZ Globe X (right) ── */}
      <div className="oatly-toolbar">
        <Link to="/" className="oatly-toolbar__home" aria-label="Home">
          <Home size={20} aria-hidden="true" />
        </Link>

        <div
          className="oatly-toolbar__spacer"
          onClick={onOpenSearch}
          role="button"
          tabIndex={onOpenSearch ? 0 : -1}
          aria-label="Search"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onOpenSearch) onOpenSearch();
          }}
        />

        <div className="oatly-toolbar__utils">
          <Link to="/health" className="oatly-toolbar__link">
            FAQ
          </Link>
          <a
            href="https://investors.oatly.com"
            target="_blank"
            rel="noreferrer"
            className="oatly-toolbar__link"
          >
            BIZ
          </a>
          <button
            type="button"
            className="oatly-toolbar__btn"
            aria-label="Language: United States (EN)"
            onClick={() => alert('Region: United States (EN)')}
          >
            <Globe size={16} aria-hidden="true" />
          </button>
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
            className="oatly-toolbar__btn"
            aria-label="Close"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Main nav row: same 5 items, same order, centred ── */}
      <nav className="oatly-navrow" aria-label="Primary">
        <ul className="oatly-navrow__list" onMouseLeave={scheduleClose}>
          {navItems.map((item) => {
            const hasDropdown = Boolean(item.dropdown);
            const isOpen = openMenu === item.name;
            return (
              <li
                key={item.name}
                className={`oatly-navrow__item${isOpen ? ' oatly-navrow__item--open' : ''}`}
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(hasDropdown ? item.name : null);
                }}
              >
                <Link
                  to={item.path}
                  className="oatly-navrow__link"
                  aria-haspopup={hasDropdown ? 'true' : undefined}
                  aria-expanded={hasDropdown ? isOpen : undefined}
                  onFocus={() => setOpenMenu(hasDropdown ? item.name : null)}
                  onBlur={scheduleClose}
                >
                  {item.name}
                </Link>

                {/* Dropdown: full-width plain text list — names only, no
                    descriptions, no arrows (same pattern for every tab) */}
                {hasDropdown && (
                  <div
                    className="oatly-drop"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="oatly-drop__inner">
                      <ul className="oatly-drop__list" aria-label={`${item.name} submenu`}>
                        {item.dropdown.map((sub) => (
                          <li key={sub.name}>
                            <Link to={sub.path} className="oatly-drop__link">
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Mobile drawer: same 5 items, same order, expand/collapse ── */}
      <nav
        id="oatly-mobile-menu"
        className={`oatly-mobile${mobileOpen ? ' oatly-mobile--open' : ''}`}
        aria-label="Mobile"
      >
        <ul className="oatly-mobile__list">
          {navItems.map((item) => {
            const hasDropdown = Boolean(item.dropdown);
            const expanded = expandedSection === item.name;
            // HEALTH: direct link, no toggle (unchanged behaviour)
            if (!hasDropdown) {
              return (
                <li key={item.name} className="oatly-mobile__section">
                  <Link to={item.path} className="oatly-mobile__row">
                    {item.name}
                  </Link>
                </li>
              );
            }
            return (
              <li
                key={item.name}
                className={`oatly-mobile__section${expanded ? ' oatly-mobile__section--open' : ''}`}
              >
                <button
                  type="button"
                  className="oatly-mobile__row"
                  aria-expanded={expanded}
                  onClick={() => setExpandedSection(expanded ? null : item.name)}
                >
                  {item.name}
                  <ChevronDown size={16} className="oatly-mobile__caret" aria-hidden="true" />
                </button>
                {expanded && (
                  <ul className="oatly-mobile__sublist">
                    {item.dropdown.map((sub) => (
                      <li key={sub.name}>
                        <Link to={sub.path} className="oatly-mobile__sublink">
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
