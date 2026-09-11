import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productCategories } from '../data/siteData';
import { ArrowLeft, Sparkles, Filter, Leaf } from 'lucide-react';
import PlaceholderMedia from '../components/PlaceholderMedia';
import SEO from '../components/SEO';

export default function CategoryProductsPage() {
  const { category } = useParams();

  const currentCategory = productCategories.find(
    (c) => c.slug === category || c.id === category
  ) || productCategories[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      <SEO
        title={`${currentCategory.name} Products`}
        description={currentCategory.description}
        pathname={`/products/${currentCategory.slug}`}
      />

      {/* Back to all products button */}
      <Link
        to="/products"
        className="btn-oatly-secondary text-xs py-2.5 px-5 inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> ALL PRODUCTS RANGE
      </Link>

      {/* Category Hero Header Banner */}
      <div className={`border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl ${currentCategory.color}`}>
        <div className="max-w-3xl space-y-3">
          <span className="badge-sticker bg-white text-oatly-black">{currentCategory.badge || 'CATEGORY'}</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase font-display leading-tight">
            {currentCategory.name}
          </h1>
          <p className="text-base md:text-lg font-medium opacity-90">
            {currentCategory.description}
          </p>
        </div>
      </div>

      {/* Product Category Navigation Pills */}
      <div className="flex flex-wrap gap-2">
        {productCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products/${cat.slug}`}
            className={`px-4 py-2 text-xs font-extrabold uppercase border-2 border-oatly-black transition-all ${
              cat.slug === currentCategory.slug
                ? 'bg-oatly-black text-white shadow-none'
                : 'bg-white text-oatly-black shadow-brutal-sm hover:bg-oatly-yellow'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
        {currentCategory.items.map((item) => (
          <div
            key={item.id}
            className="bg-white border-4 border-oatly-black shadow-brutal p-6 space-y-4 flex flex-col justify-between h-full"
          >
            <div>
              {/* Media slot: real image when available, placeholder otherwise */}
              <div className="mb-4">
                {item.image ? (
                  <div className="relative w-full overflow-hidden bg-oatly-cream" style={{ aspectRatio: '1/1' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <PlaceholderMedia
                    aspectRatio="1:1"
                    label={item.name}
                    subLabel={item.volume}
                    icon="🥛"
                    bgClass="bg-oatly-cream"
                  />
                )}
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold text-oatly-blue mb-1">
                <span>{item.category}</span>
                {item.climateFootprint && (
                  <span className="bg-oatly-black text-white px-2 py-0.5">{item.climateFootprint}</span>
                )}
              </div>

              <h3 className="text-2xl font-black uppercase font-display text-oatly-black truncate" title={item.name}>
                {item.name}
              </h3>
              <p className="text-xs text-gray-700 font-sans mt-2">
                {item.description}
              </p>
            </div>

            {/* Ingredients & Nutrition Box */}
            {item.ingredients && (
              <div className="pt-4 border-t-2 border-oatly-black space-y-3 font-mono text-xs">
                <div className="font-bold text-oatly-black">INGREDIENTS:</div>
                <div className="text-[11px] text-gray-600">
                  {item.ingredients.join(', ')}
                </div>

              <div className="p-3 bg-oatly-cream border border-oatly-black flex justify-between font-bold text-oatly-blue">
                {item.nutrition ? (
                  <>
                    <span>CALORIES: {item.nutrition.calories}</span>
                    <span>CALCIUM: {item.nutrition.calcium}</span>
                  </>
                ) : (
                  <span>VOLUME: {item.volume}</span>
                )}
              </div>
            </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
