import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Search } from 'lucide-react';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// The globe's dropdown: every language in the model (searchable, scrollable),
// quiet paper sheet in the site's own tokens — hairline border, 2px radius,
// Margo rows, Titan One title. Opens under the toolbar, closes on ESC,
// outside click or a pick.
import { LANGUAGES, filterLanguages } from '../models/languageModel.js';
import '../styles/LanguageMenu.css';

export default function LanguageMenu({ open, onClose, selected, onSelect }) {
  const [query, setQuery] = useState('');
  const panelRef = useRef(null);
  const inputRef = useRef(null);

  // A freshly opened sheet always starts with an empty search — state is
  // adjusted during render (no setState inside the effect below).
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setQuery('');
  }

  // Open: focus the field; close on ESC / outside click (the globe
  // toggle itself is excluded so its click can re-open instead of flapping).
  useEffect(() => {
    if (!open) return undefined;
    if (inputRef.current) inputRef.current.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const onPointerDown = (e) => {
      if (e.target.closest('.oatly-lang__toggle')) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [open, onClose]);

  const results = useMemo(() => filterLanguages(query), [query]);

  if (!open) return null;

  return (
    <div className="lang" role="dialog" aria-label="Choose language" ref={panelRef}>
      <div className="lang__head">
        <h2 className="lang__title">Language</h2>
        <p className="lang__note">
          {results.length === LANGUAGES.length
            ? `${LANGUAGES.length} languages — pick yours`
            : `${results.length} of ${LANGUAGES.length}`}
        </p>
      </div>

      <div className="lang__field">
        <Search size={16} aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          className="lang__input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search languages…"
          aria-label="Search languages"
        />
      </div>

      <ul className="lang__list" role="listbox" aria-label="Languages">
        {results.length === 0 && (
          <li className="lang__empty">No language matches “{query}”.</li>
        )}
        {results.map((lang) => {
          const isOn = lang.code === selected;
          return (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={isOn}
                className={`lang__opt${isOn ? ' is-on' : ''}`}
                onClick={() => onSelect(lang.code)}
              >
                <span className="lang__name">{lang.name}</span>
                <span className="lang__native">{lang.native}</span>
                {isOn && <Check size={14} className="lang__check" aria-hidden="true" />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
