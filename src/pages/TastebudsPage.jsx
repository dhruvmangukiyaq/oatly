import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Data comes from the Model (async Express API) via local filtering.
import RecipeModel from '../models/recipeModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { Sparkles, Clock, ChefHat, BookOpen, ArrowRight } from 'lucide-react';

export default function TastebudsPage({ onSelectRecipe }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lookbookParam = searchParams.get('lookbook');

  const [selectedLookbook, setSelectedLookbook] = useState(lookbookParam || 'All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (lookbookParam) {
      setSelectedLookbook(lookbookParam);
    }
  }, [lookbookParam]);

  const lookbooks = ['All', 'LOOK BOOK VOL. 3', 'LOOK BOOK A/W 25', 'LOOK BOOK S/S 25', 'Future Of Taste'];
  const categories = ['All', 'Drinks', 'Breakfast', 'Savory Meals'];

  // MODEL (async API)
  const RECIPES_DATA = useApiData(() => RecipeModel.getFeaturedRecipes(), []);
  if (!RECIPES_DATA) return null;
  const filteredRecipes = RECIPES_DATA.filter((r) => {
    const matchesLookbook = selectedLookbook === 'All' || r.lookbook === selectedLookbook;
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    return matchesLookbook && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      
      {/* Editorial Header Banner */}
      <div className="bg-oatly-pink text-white border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="badge-sticker bg-oatly-yellow text-oatly-black">TASTEBUDS EDITORIAL</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase font-display text-white leading-tight">
            THE OATLY LOOK BOOK SERIES.
          </h1>
          <p className="text-base md:text-lg font-medium text-oatly-cream/90">
            A high-fashion recipe look book dedicated to decadent sips, savory pasta, fluffy pancakes, and coffee bar magic.
          </p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white border-2 border-oatly-black p-6 shadow-brutal space-y-4">
        
        <div>
          <div className="text-xs font-mono font-bold uppercase text-oatly-blue mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> SELECT LOOK BOOK VOLUME:
          </div>
          <div className="flex flex-wrap gap-2">
            {lookbooks.map((lb) => (
              <button
                key={lb}
                onClick={() => {
                  setSelectedLookbook(lb);
                  if (lb === 'All') setSearchParams({});
                  else setSearchParams({ lookbook: lb });
                }}
                className={`px-4 py-2 text-xs font-extrabold uppercase transition-all border-2 border-oatly-black shadow-brutal-sm cursor-pointer ${
                  selectedLookbook === lb
                    ? 'bg-oatly-yellow text-oatly-black font-extrabold'
                    : 'bg-oatly-cream text-oatly-black hover:bg-white'
                }`}
              >
                {lb}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200">
          <div className="text-xs font-mono font-bold uppercase text-oatly-pink mb-2">
            CATEGORY FILTER:
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-bold uppercase border border-oatly-black transition-all ${
                  selectedCategory === cat
                    ? 'bg-oatly-black text-white'
                    : 'bg-white text-oatly-black hover:bg-oatly-cream'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-stretch">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe)}
            className="bg-white border-4 border-oatly-black shadow-brutal hover:shadow-brutal-xl transition-all cursor-pointer group flex flex-col justify-between overflow-hidden h-full"
          >
            <div className="relative bg-oatly-cream overflow-hidden border-b-4 border-oatly-black" style={{ aspectRatio: '3/2' }}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="badge-sticker bg-oatly-yellow text-oatly-black">{recipe.lookbook}</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-oatly-black text-white px-3 py-1 text-xs font-mono font-bold border border-white">
                <Clock className="w-3.5 h-3.5 inline mr-1" /> {recipe.time}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase text-oatly-pink">{recipe.category} • DIFFICULTY: {recipe.difficulty}</span>
                <h3
                  className="text-2xl font-black uppercase font-display text-oatly-black group-hover:text-oatly-blue transition-colors mt-1 truncate"
                  title={recipe.title}
                >
                  {recipe.title}
                </h3>
              </div>

              <p className="font-hand text-base text-gray-800 bg-oatly-cream p-3 border border-oatly-black rotate-[-0.5deg]">
                {recipe.quote}
              </p>

              <div className="pt-2 border-t-2 border-oatly-black flex items-center justify-between text-xs font-extrabold uppercase text-oatly-blue group-hover:underline min-h-[44px]">
                <span className="truncate" title="VIEW FULL INGREDIENTS & STEPS">VIEW FULL INGREDIENTS & STEPS</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
