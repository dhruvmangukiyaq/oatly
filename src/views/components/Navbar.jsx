import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Globe, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Navigation structure comes from the Model (navigationModel.js).
import NavigationModel from '../../models/navigationModel.js';

export default function Navbar({ onOpenSearch }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  // MODEL
  const navItems = NavigationModel.getNavItems();

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full font-mono bg-[var(--color-cream)]">
      
      {/* Top Toolbar - Logo + Search + FAQ/BIZ/Globe/Close */}
      <div className="border-b-[1.5px] border-[#111111] bg-white flex items-center justify-between text-xs font-bold uppercase">
        
        {/* Left: Home Icon */}
        <Link to="/" className="p-2 border-r-[1.5px] border-[#111111] hover:bg-[var(--color-cream-dark)] transition-colors flex items-center justify-center w-10">
          <Home className="w-5 h-5 text-[#111111] fill-[#111111]" />
        </Link>

        {/* Center: Search Bar Container */}
        <div className="flex-1 px-4 h-9 cursor-pointer bg-white border-b-2 border-transparent" onClick={onOpenSearch} />

        {/* Right Buttons: FAQ | BIZ | Globe | Close (X) */}
        <div className="flex items-center text-xs font-mono font-extrabold divide-x-2 divide-[#111111] border-l-[1.5px] border-[#111111]">
          <Link to="/health" className="px-3.5 py-2 hover:bg-[var(--color-cream-dark)] transition-colors">
            FAQ
          </Link>
          <a href="https://investors.oatly.com" target="_blank" rel="noreferrer" className="px-3.5 py-2 hover:bg-[var(--color-cream-dark)] transition-colors">
            BIZ
          </a>
          <button onClick={() => alert('Region: United States (EN)')} className="px-3 py-2 hover:bg-[var(--color-cream-dark)] transition-colors flex items-center justify-center">
            <Globe className="w-4 h-4" />
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="px-3.5 py-2 bg-white hover:bg-[var(--color-cream-dark)] transition-colors flex items-center justify-center w-10">
            <X className="w-5 h-5 text-[#111111]" />
          </button>
        </div>

      </div>

      {/* Main Navigation Row - Bold Uppercase Evenly Spaced */}
      <nav 
        className="header-nav-row"
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-1 sm:gap-2">
          {navItems.map((item, itemIdx) => (
            <div 
              key={item.name} 
              className="relative"
              onMouseEnter={() => setActiveMenu(item.name)}
            >
              <Link
                to={item.path}
                className={`text-xs font-extrabold tracking-widest uppercase transition-all py-1 px-2 whitespace-nowrap ${
                  location.pathname === item.path || (item.dropdown && activeMenu === item.name)
                    ? 'bg-[#111111] text-white'
                    : 'text-[#111111] hover:underline'
                }`}
              >
                {item.name}
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeMenu === item.name && item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.1 }}
                    className={`absolute top-full mt-1 w-72 max-w-[calc(100vw-2rem)] bg-white border-2 border-[#111111] shadow-brutal p-2 z-50 text-left font-sans ${
                      itemIdx === 0
                        ? 'left-0'
                        : itemIdx === navItems.length - 1
                          ? 'right-0'
                          : 'left-1/2 -translate-x-1/2'
                    }`}
                  >
                    <div className="flex flex-col gap-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          className="p-2 hover:bg-[var(--color-cream-dark)] border border-transparent hover:border-[#111111] transition-all group"
                        >
                          <div className="font-extrabold uppercase text-xs text-[#111111] group-hover:text-[#002766] flex items-center justify-between">
                            {sub.name}
                            <span>→</span>
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                            {sub.desc}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#111111] bg-[var(--color-cream)] px-4 py-4 space-y-3 font-sans"
            >
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-[#111111]/20 pb-2">
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="font-display font-extrabold text-xl uppercase tracking-tight text-[#111111] block"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </header>
  );
}