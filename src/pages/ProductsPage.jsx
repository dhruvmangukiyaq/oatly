import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/oatlyData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Search, Filter } from 'lucide-react';

export default function ProductsPage({ onSelectProduct }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const categories = [
    'All',
    'Cold Foam',
    'Soft Serve',
    'Spread',
    'Cooking',
    'Chilled Oat Drinks',
    'Oat Drink',
    'Oatgurt',
    'Ice Cream'
  ];

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory || p.subCategory === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      
      {/* Header Banner */}
      <div className="bg-oatly-yellow border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="badge-sticker bg-oatly-black text-white">THE FULL PRODUCT RANGE</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase font-display text-oatly-black leading-tight">
            EVERYTHING WE MAKE WITH OATS.
          </h1>
          <p className="text-base md:text-lg font-medium text-oatly-black/90">
            No cows were harmed, stressed, or bothered in the making of any of these items. Pure oat goodness from chilled drinks to soft serve and cold foam.
          </p>
        </div>
      </div>

      {/* Filter Bar & Search */}
      <div className="space-y-4">
        
        {/* Search & Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border-2 border-oatly-black p-4 shadow-brutal">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-3 py-2 bg-oatly-cream border-2 border-oatly-black font-extrabold text-xs uppercase placeholder:text-gray-500 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="font-mono text-xs font-bold uppercase text-oatly-black flex items-center gap-2">
            <Filter className="w-4 h-4 text-oatly-blue" />
            SHOWING <span className="bg-oatly-yellow px-2 py-0.5 border border-black">{filteredProducts.length}</span> PRODUCTS
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 text-xs font-extrabold uppercase transition-all shadow-brutal-sm border-2 border-oatly-black cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-oatly-black text-white translate-x-0.5 translate-y-0.5 shadow-none'
                  : 'bg-white text-oatly-black hover:bg-oatly-yellow'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border-4 border-oatly-black p-12 text-center shadow-brutal">
          <div className="font-display font-black text-2xl uppercase text-oatly-black">NO OAT PRODUCTS FOUND</div>
          <p className="text-sm text-gray-600 mt-2 font-mono">Try clearing your search query or selecting another category.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSearchParams({}); }}
            className="btn-oatly mt-4 text-xs py-2 px-6"
          >
            RESET FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      )}

      {/* Note about direct URLs / code comment requirement */}
      {/* 
        Note: Image URLs are currently using high quality Unsplash placeholders matching 
        exact Oatly product aspect ratios. Real CDN asset URLs from Oatly can be swapped in 
        by updating src/data/oatlyData.js
      */}

    </div>
  );
}
