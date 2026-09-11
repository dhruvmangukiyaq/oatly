import React from 'react';
import { X, Calendar, Clock, Tag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oatly-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-oatly-cream border-4 border-oatly-black shadow-brutal-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-20 p-4 bg-oatly-blue text-white flex items-center justify-between border-b-4 border-oatly-black">
            <div className="flex items-center gap-2 font-display font-extrabold text-lg uppercase text-oatly-yellow">
              <Sparkles className="w-5 h-5" />
              OATLY STORY & INITIATIVE
            </div>
            <button
              onClick={onClose}
              className="p-1 bg-white text-oatly-black border-2 border-oatly-black shadow-brutal-sm hover:bg-oatly-yellow transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            
            {/* Header image */}
            <div className="border-4 border-oatly-black overflow-hidden relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="badge-sticker bg-oatly-yellow text-oatly-black">{article.tag}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4 text-xs font-mono font-bold text-gray-600 mb-2">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {article.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readTime}</span>
                <span>•</span>
                <span className="text-oatly-blue uppercase">{article.type}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold uppercase font-display text-oatly-black leading-tight">
                {article.title}
              </h1>
            </div>

            <div className="p-4 bg-white border-2 border-oatly-black font-hand text-lg text-oatly-black shadow-brutal-sm">
              "{article.excerpt}"
            </div>

            <div className="prose prose-lg max-w-none text-gray-800 font-sans leading-relaxed text-sm md:text-base space-y-4">
              <p>{article.content}</p>
              <p>
                At Oatly, we believe that transparency isn't just a corporate buzzword — it's the foundation of everything we do. Whether we're testing experimental fertilizer methods or hosting fashion runway shows in Paris, our goal remains clear: make plant-based living irresistible, fun, and easy for everyone.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full btn-oatly py-3 text-sm"
            >
              BACK TO STORIES
            </button>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
