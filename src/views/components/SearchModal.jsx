import React from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Search state + results come from the Controller (which uses SearchModel).
import { useSearchController } from '../../controllers/useSearchController.js';

export default function SearchModal({ isOpen, onClose, onSelectProduct }) {
  // CONTROLLER
  const { query, setQuery, results, popularSearches } = useSearchController();
  const { products: filteredProducts, recipes: filteredRecipes, news: filteredNews } = results;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-oatly-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="bg-oatly-cream border-4 border-oatly-black shadow-brutal-xl w-full max-w-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 bg-oatly-yellow border-b-4 border-oatly-black flex items-center justify-between">
            <div className="flex items-center gap-2 font-display font-extrabold text-xl uppercase">
              <Sparkles className="w-5 h-5 text-oatly-black" />
              SEARCH OATLY UNIVERSE
            </div>
            <button
              onClick={onClose}
              className="p-1 bg-white border-2 border-oatly-black shadow-brutal-sm hover:bg-oatly-pink hover:text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input Box */}
          <div className="p-6 border-b-2 border-oatly-black">
            <div className="relative">
              <Search className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-oatly-black" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, recipes, climate stats (e.g. 'Barista', 'Cold Foam', 'Carbon')..."
                className="w-full pl-14 pr-4 py-4 bg-white border-2 border-oatly-black shadow-brutal font-extrabold text-lg uppercase placeholder:text-gray-400 focus:outline-none focus:bg-oatly-cream-light"
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {query.trim() === '' ? (
              <div className="text-center py-8">
                <div className="font-hand text-xl text-oatly-black mb-2">Popular Searches:</div>
                <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                  {popularSearches.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 bg-white border-2 border-oatly-black font-extrabold text-xs uppercase shadow-brutal-sm hover:bg-oatly-yellow transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Product Results */}
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase text-oatly-blue mb-3">
                    Products ({filteredProducts.length})
                  </h4>
                  {filteredProducts.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No products matching "{query}"</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredProducts.map(p => (
                        <div
                          key={p.id}
                          onClick={() => {
                            onSelectProduct(p);
                            onClose();
                          }}
                          className="p-3 bg-white border-2 border-oatly-black shadow-brutal-sm hover:bg-oatly-cream cursor-pointer flex items-center gap-3 group"
                        >
                          <img src={p.image} alt={p.name} className="w-12 h-12 object-cover border border-oatly-black" />
                          <div className="flex-1">
                            <div className="font-extrabold text-sm uppercase group-hover:text-oatly-blue">{p.name}</div>
                            <div className="text-xs text-gray-600 font-mono">{p.volume} • {p.climateFootprint}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recipe Results */}
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase text-oatly-blue mb-3">
                    Recipes & Tastebuds ({filteredRecipes.length})
                  </h4>
                  {filteredRecipes.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No recipes matching "{query}"</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {filteredRecipes.map(r => (
                        <Link
                          key={r.id}
                          to="/recipes"
                          onClick={onClose}
                          className="p-3 bg-white border-2 border-oatly-black shadow-brutal-sm hover:bg-oatly-cream flex items-center gap-3 group"
                        >
                          <img src={r.image} alt={r.title || r.name} className="w-12 h-12 object-cover border border-oatly-black" />
                          <div>
                            <div className="font-extrabold text-sm uppercase group-hover:text-oatly-blue">{r.title || r.name}</div>
                            <div className="text-xs text-gray-600 font-mono">{r.lookbook || r.collection} • {r.time || r.prepTime}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* News Results */}
                <div>
                  <h4 className="font-display font-extrabold text-sm uppercase text-oatly-blue mb-3">
                    News & Stories ({filteredNews.length})
                  </h4>
                  {filteredNews.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No news matching "{query}"</p>
                  ) : (
                    <div className="space-y-2">
                      {filteredNews.map(n => (
                        <Link
                          key={n.id}
                          to="/news"
                          onClick={onClose}
                          className="p-3 bg-white border-2 border-oatly-black shadow-brutal-sm hover:bg-oatly-cream block group"
                        >
                          <div className="font-extrabold text-sm uppercase group-hover:text-oatly-blue flex items-center justify-between">
                            <span>{n.title}</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{n.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
