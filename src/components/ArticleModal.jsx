import React from 'react';
import { X, Calendar, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ResponsiveImage from './ResponsiveImage';
import '../styles/NewsStory.css';

/* ==========================================================================
   ARTICLE MODAL — news popup in the site's own visual language.
   Same tokens/type as the story page (.ns-story): white canvas, black ink,
   1px hairline rules, Margo UI type, Girdo display title, editorial serif body.
   ========================================================================== */

export default function ArticleModal({ article, onClose }) {
  // Split the body the same way the story detail page does (blank line = new p).
  const paragraphs = article?.content ? String(article.content).split('\n\n') : [];

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
            className="ns-modal"
          >
            {/* Bar — plain white header, black label (site header style) */}
            <div className="ns-modal__bar">
              <div className="ns-modal__brand">
                <Sparkles aria-hidden="true" />
                <span>Oatara Story &amp; Initiative</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="ns-modal__close"
                aria-label="Close story"
              >
                <X size={20} />
              </button>
            </div>

            <div className="ns-modal__body">
              {/* Hero image — clean edge, no heavy frame (home/product cards) */}
              <figure className="ns-modal__hero">
                <ResponsiveImage
                  src={article.image}
                  alt={article.title}
                  className="ns-modal__hero-img"
                  widths={[384, 768]}
                  sizes="(max-width: 768px) 100vw, 672px"
                  loading="eager"
                />
              </figure>

              {/* Tag + title + lede (mirrors .ns-story__header) */}
              <header className="ns-modal__head">
                {article.tag && <span className="ns-modal__tag">{article.tag}</span>}
                <h1 className="ns-modal__title">{article.title}</h1>
                {article.excerpt && <p className="ns-modal__excerpt">{article.excerpt}</p>}
              </header>

              {/* Meta line — hairline rule, same as the story page */}
              <div className="ns-modal__meta">
                <time dateTime={article.date}>
                  <Calendar size={14} aria-hidden="true" /> {article.date}
                </time>
                <span aria-hidden="true">•</span>
                <span className="ns-modal__meta-item">
                  <Clock size={14} aria-hidden="true" /> {article.readTime}
                </span>
                <span aria-hidden="true">•</span>
                <span className="ns-story__type">{article.type || 'Story'}</span>
              </div>

              {/* Body — editorial serif, black on white */}
              <div className="ns-modal__text">
                <div className="ns-story__richtext">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="ns-story__p">{p}</p>
                  ))}
                  <p className="ns-story__p">
                    At Oatara, we believe that transparency isn't just a corporate buzzword — it's the foundation of everything we do. Whether we're testing experimental fertilizer methods or hosting fashion runway shows in Paris, our goal remains clear: make plant-based living irresistible, fun, and easy for everyone.
                  </p>
                </div>
              </div>

              <button type="button" onClick={onClose} className="ns-modal__back">
                Back to stories
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
