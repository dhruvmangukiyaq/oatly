import React from 'react';
import { X, Clock, ChefHat, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oatly-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-oatly-cream border-4 border-oatly-black shadow-brutal-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 p-4 bg-oatly-pink text-white flex items-center justify-between border-b-4 border-oatly-black">
            <div className="flex items-center gap-2 font-display font-extrabold text-lg uppercase text-white">
              <Sparkles className="w-5 h-5 text-oatly-yellow" />
              {recipe.lookbook} RECIPE CARD
            </div>
            <button
              onClick={onClose}
              className="p-1 bg-white text-oatly-black border-2 border-oatly-black shadow-brutal-sm hover:bg-oatly-yellow transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            
            {/* Top Banner Image & Meta */}
            <div className="relative rounded-none border-4 border-oatly-black overflow-hidden bg-oatly-black">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 object-cover opacity-90"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-oatly-black to-transparent text-white flex justify-between items-end">
                <div>
                  <span className="badge-sticker bg-oatly-yellow text-oatly-black mb-1">{recipe.category}</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold uppercase font-display">{recipe.title}</h2>
                </div>
                <div className="flex gap-2 font-mono text-xs font-bold">
                  <span className="bg-white text-oatly-black px-2 py-1 border border-black flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {recipe.time}
                  </span>
                  <span className="bg-oatly-yellow text-oatly-black px-2 py-1 border border-black flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5" /> {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Chef Quote */}
            <div className="p-4 bg-oatly-yellow border-2 border-oatly-black font-hand text-lg text-oatly-black shadow-brutal-sm rotate-[-0.5deg]">
              {recipe.quote}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Ingredients */}
              <div className="md:col-span-5 bg-white border-2 border-oatly-black p-5 shadow-brutal-sm">
                <h3 className="font-display font-extrabold text-base uppercase text-oatly-blue mb-3 pb-2 border-b-2 border-oatly-black">
                  INGREDIENTS
                </h3>
                <ul className="space-y-2 text-xs font-mono">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-oatly-pink font-bold">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="md:col-span-7 bg-white border-2 border-oatly-black p-5 shadow-brutal-sm">
                <h3 className="font-display font-extrabold text-base uppercase text-oatly-blue mb-3 pb-2 border-b-2 border-oatly-black">
                  PREPARATION STEPS
                </h3>
                <ol className="space-y-4 text-xs font-sans">
                  {recipe.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-none bg-oatly-black text-white font-mono font-bold flex items-center justify-center text-xs">
                        {idx + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed text-gray-800 font-medium">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full btn-oatly py-3 text-sm"
            >
              DONE COOKING! CLOSE RECIPE
            </button>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
