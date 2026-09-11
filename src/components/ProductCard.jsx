import React from 'react';
import { Eye, Leaf } from 'lucide-react';

export default function ProductCard({ product, onSelect }) {
  return (
    <div className="bg-white border-4 border-oatly-black shadow-brutal hover:shadow-brutal-xl transition-all duration-200 flex flex-col justify-between group overflow-hidden relative h-full">
      
      {/* Badge / Sticker */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="badge-sticker">{product.badge}</span>
        </div>
      )}

      {/* Climate Footprint Badge */}
      <div className="absolute top-3 right-3 z-10 bg-oatly-black text-white px-2 py-1 border border-white text-[10px] font-mono font-bold flex items-center gap-1 shadow-brutal-sm">
        <Leaf className="w-3 h-3 text-oatly-mint" />
        {product.climateFootprint}
      </div>

      {/* Image Container — fixed square ratio, edge-to-edge cover */}
      <div className="relative bg-oatly-cream/40 flex items-center justify-center border-b-4 border-oatly-black overflow-hidden group-hover:bg-oatly-cream transition-colors" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.image}
          alt={product.name}
          title={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-mono font-bold uppercase text-oatly-blue tracking-wider mb-1">
            {product.category} • {product.volume}
          </div>
          <h3
            className="text-xl font-extrabold uppercase tracking-tight text-oatly-black truncate group-hover:text-oatly-blue transition-colors font-display"
            title={product.name}
          >
            {product.name}
          </h3>
          <p className="text-xs text-gray-700 font-sans mt-2 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-4 border-t-2 border-oatly-black flex items-center justify-between min-h-[44px]">
          <button
            onClick={() => onSelect(product)}
            className="w-full btn-oatly text-xs py-2.5 flex items-center justify-center gap-2 group-hover:bg-oatly-yellow group-hover:text-oatly-black"
          >
            <Eye className="w-4 h-4 flex-shrink-0" /> <span className="truncate">NUTRITION & SPECS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
