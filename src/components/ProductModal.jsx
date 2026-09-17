import React, { useState } from 'react';
import { X, Leaf, Sparkles, Box, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Product360 from './Product360.jsx';

export default function ProductModal({ product, onClose }) {
  const [viewMode, setViewMode] = useState('3d');

  if (!product) return null;

  const ingredients = product.ingredients || [
    'Oat base (water, oats 10%)',
    'Coconut oil',
    'Sugar',
    'Dipotassium phosphate',
    'Natural vanilla flavor',
    'Gellan gum',
    'Sea salt',
  ];

  const nutrition = product.nutrition || {
    calories: '45 kcal',
    fat: '3.5g',
    carbs: '4g',
    fiber: '0g',
    protein: '0.5g',
    calcium: '50mg',
    vitaminD: '0mcg',
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oatly-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-oatly-cream border-4 border-oatly-black shadow-brutal-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 p-4 bg-oatly-black text-white flex items-center justify-between border-b-4 border-oatly-black">
            <div className="flex items-center gap-2 font-display font-extrabold text-lg uppercase text-oatly-yellow">
              <Sparkles className="w-5 h-5" />
              PRODUCT NUTRITION & CLIMATE SPECS
            </div>
            <button
              onClick={onClose}
              className="p-1 bg-oatly-yellow text-oatly-black border-2 border-white shadow-brutal-sm hover:bg-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: 3D Viewer or Image & Badges */}
            <div className="md:col-span-5 flex flex-col items-center justify-between bg-white border-4 border-oatly-black p-4 sm:p-5 shadow-brutal relative">
              {product.badge && (
                <div className="absolute top-3 left-3 z-20">
                  <span className="badge-sticker">{product.badge}</span>
                </div>
              )}

              {/* View Mode Toggle (360 spin vs Photo) */}
              <div className="w-full flex items-center justify-end mb-3 gap-1 z-20">
                  <div className="bg-[#F5EDE2] p-1 rounded-full border-2 border-black flex items-center gap-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => setViewMode('3d')}
                      className={`px-3 py-1 text-xs font-mono font-black rounded-full flex items-center gap-1.5 transition-all ${
                        viewMode === '3d'
                          ? 'bg-[#111111] text-[#FFE072] shadow-sm'
                          : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>360° 3D</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('photo')}
                      className={`px-3 py-1 text-xs font-mono font-black rounded-full flex items-center gap-1.5 transition-all ${
                        viewMode === 'photo'
                          ? 'bg-[#111111] text-[#FFE072] shadow-sm'
                          : 'text-gray-700 hover:text-black'
                      }`}
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>PHOTO</span>
                    </button>
                  </div>
              </div>

              {/* Main Media: 360 spin or Photo — always the exact product image */}
              <div className="w-full flex-1 flex items-center justify-center min-h-[360px]">
                {viewMode === '3d' ? (
                  <div className="w-full h-[360px]">
                    <Product360 src={product.image} alt={product.name} />
                  </div>
                ) : (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-72 object-contain my-4 hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <div className="w-full bg-oatly-yellow border-2 border-oatly-black p-3 text-center font-mono text-xs font-bold uppercase shadow-brutal-sm mt-3 flex items-center justify-between">
                <span>NET VOL: {product.volume}</span>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full">INTERACTIVE 360</span>
              </div>
            </div>

            {/* Right Column: Information & Tables */}
            <div className="md:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-mono font-bold uppercase text-oatly-blue tracking-widest">
                  CATEGORY: {product.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold uppercase text-oatly-black font-display mt-1">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-800 font-sans mt-3 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Climate Footprint Box */}
              <div className="bg-oatly-mint/30 border-2 border-oatly-black p-4 flex items-center justify-between shadow-brutal-sm">
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-oatly-black">CLIMATE FOOTPRINT</div>
                  <div className="text-xl font-extrabold font-display">{product.climateFootprint || '0.62 kg CO2e / kg'}</div>
                </div>
                <div className="bg-oatly-black text-oatly-mint p-2 font-mono text-xs font-bold border border-white">
                  <Leaf className="w-5 h-5 inline mr-1" /> PASSED ISO 14044
                </div>
              </div>

              {/* Ingredients List */}
              <div className="bg-white border-2 border-oatly-black p-4 shadow-brutal-sm">
                <h4 className="font-display font-extrabold text-sm uppercase text-oatly-blue mb-2">INGREDIENTS</h4>
                <div className="flex flex-wrap gap-1.5">
                  {ingredients.map((ing, idx) => (
                    <span key={idx} className="bg-oatly-cream px-2 py-1 text-xs font-extrabold border border-oatly-black">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition Facts Table */}
              <div className="bg-white border-2 border-oatly-black p-4 shadow-brutal-sm">
                <h4 className="font-display font-extrabold text-sm uppercase text-oatly-blue mb-3">NUTRITION FACTS (PER SERVING)</h4>
                <table className="w-full text-xs font-mono">
                  <tbody>
                    <tr className="border-b border-gray-200 py-1">
                      <td className="font-bold py-1">CALORIES</td>
                      <td className="text-right font-bold text-oatly-blue">{nutrition.calories}</td>
                    </tr>
                    <tr className="border-b border-gray-200 py-1">
                      <td className="py-1">TOTAL FAT</td>
                      <td className="text-right">{nutrition.fat}</td>
                    </tr>
                    <tr className="border-b border-gray-200 py-1">
                      <td className="py-1">TOTAL CARBS</td>
                      <td className="text-right">{nutrition.carbs}</td>
                    </tr>
                    <tr className="border-b border-gray-200 py-1">
                      <td className="py-1">DIETARY FIBER</td>
                      <td className="text-right">{nutrition.fiber}</td>
                    </tr>
                    <tr className="border-b border-gray-200 py-1">
                      <td className="py-1">PROTEIN</td>
                      <td className="text-right">{nutrition.protein}</td>
                    </tr>
                    <tr className="border-b border-gray-200 py-1">
                      <td className="py-1">CALCIUM</td>
                      <td className="text-right font-bold">{nutrition.calcium}</td>
                    </tr>
                    <tr>
                      <td className="py-1">VITAMIN D</td>
                      <td className="text-right">{nutrition.vitaminD}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full btn-oatly py-3 text-sm"
                >
                  CLOSE SPECS WINDOW
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
