import React from 'react';
import { X, Calendar, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';

export default function ArticleModal({ article, onClose }) {
  return (
    <AnimatePresence>
      {article && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-oatly-black/80 backdrop-blur-sm overflow-y-auto"
        >
          {/* Newspaper unfold: the sheet opens from the top like unfolding paper. */}
          <motion.div
            key="sheet"
            initial={{ opacity: 0, rotateX: -62, scaleY: 0.3, y: -60 }}
            animate={{ opacity: 1, rotateX: 0, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, rotateX: 48, scaleY: 0.28, y: 40 }}
            transition={{ duration: 0.55, ease: [0.22, 0.9, 0.28, 1] }}
            style={{ transformPerspective: 1200, transformOrigin: '50% 0%' }}
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
              <ResponsiveImage
                src={article.image}
                alt={article.title}
                className="w-full h-72 object-cover"
                widths={[384, 768]}
                sizes="(max-width: 768px) 100vw, 704px"
                loading="eager"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
