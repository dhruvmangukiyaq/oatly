import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    const scroller = document.querySelector('[data-app-scroll]');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full font-mono font-extrabold select-none">
      
      {/* Footer Grid - White BG with Black Borders */}
      <div className="footer-grid">
        
        {/* Row 1: Scroll Top Arrow | FAQ | SUSTAINABILITY */}
        <div className="footer-row">
          <button
            onClick={scrollToTop}
            className="w-10 sm:w-12 flex items-center justify-center hover:bg-[var(--color-cream-dark)] transition-colors flex-shrink-0"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-[#111111] stroke-[3]" />
          </button>
          <Link
            to="/health"
            className="footer-cell-link px-2 text-[11px] sm:text-xs"
          >
            FAQ
          </Link>
          <Link
            to="/sustainability"
            className="footer-cell-link px-2 text-[11px] sm:text-xs"
          >
            SUSTAINABILITY
          </Link>
        </div>

        {/* Row 2: CAREERS | FOR INVESTORS */}
        <div className="footer-row">
          <a
            href="https://careers.oatly.com"
            target="_blank"
            rel="noreferrer"
            className="footer-cell-link px-2 text-[11px] sm:text-xs"
          >
            CAREERS
          </a>
          <a
            href="https://investors.oatly.com"
            target="_blank"
            rel="noreferrer"
            className="footer-cell-link px-2 text-[11px] sm:text-xs"
          >
            FOR INVESTORS
          </a>
        </div>

        {/* Row 3: CONTACT | LEGAL | PRIVACY POLICY | COOKIE CONSENT */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#111111] items-stretch min-h-[40px] md:h-10 text-[10px] sm:text-xs">
          <Link to="/contact" className="footer-cell-link px-2 py-2 md:py-0">
            CONTACT
          </Link>
          <Link to="/legal" className="footer-cell-link px-2 py-2 md:py-0">
            LEGAL
          </Link>
          <Link to="/legal/privacy-policy" className="footer-cell-link px-2 py-2 md:py-0 border-t md:border-t-0 border-[#111111]">
            PRIVACY POLICY
          </Link>
          <button
            onClick={() => alert('Cookie preferences updated!')}
            className="footer-cell px-2 py-2 md:py-0 border-t md:border-t-0 border-[#111111] uppercase"
          >
            COOKIE CONSENT
          </button>
        </div>

        {/* Row 4: Empty Left | Social Icons Right */}
        <div className="footer-social-row">
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            {/* Facebook */}
            <a href="https://facebook.com/oatly" target="_blank" rel="noreferrer" className="footer-social-icon hover:bg-[#F5D26B]">
              <svg className="w-3.5 h-3.5 fill-current text-[#111111]" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com/oatly" target="_blank" rel="noreferrer" className="footer-social-icon hover:bg-[#FF5C8D] hover:text-white">
              <svg className="w-3.5 h-3.5 fill-current text-[#111111]" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/oatly" target="_blank" rel="noreferrer" className="footer-social-icon hover:bg-[#E03E3E] hover:text-white">
              <svg className="w-3.5 h-3.5 fill-current text-[#111111]" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="https://tiktok.com/@oatly" target="_blank" rel="noreferrer" className="footer-social-icon hover:bg-[#F5D26B]">
              <svg className="w-3.5 h-3.5 fill-current text-[#111111]" viewBox="0 0 24 24">
                <path d="M12.525 0h3.08c.12 1.472.68 2.824 1.62 3.882.94 1.059 2.22 1.764 3.775 1.942V9c-1.38-.06-2.66-.46-3.77-1.16v7.35c0 4.18-3.41 7.57-7.62 7.57-4.21 0-7.62-3.39-7.62-7.57 0-4.18 3.41-7.57 7.62-7.57.43 0 .85.04 1.26.11v3.25c-.41-.12-.84-.18-1.26-.18-2.39 0-4.33 1.93-4.33 4.39 0 2.46 1.94 4.39 4.33 4.39 2.39 0 4.33-1.93 4.33-4.39V0z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

    </footer>
  );
}