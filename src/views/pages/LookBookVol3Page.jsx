import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, Quote, ChevronRight } from 'lucide-react';
// ─── MVC: View ─── data via Controller/Model ─────────────────────────────────
import { useLookBookVol3Controller } from '../../controllers/useContentControllers.js';

export default function LookBookVol3Page() {
  // CONTROLLER
  const {
    hero: LOOK_BOOK_VOL_3_HERO,
    recipes: LOOK_BOOK_VOL_3_RECIPES,
    editorial: EDITORIAL_SECTION,
    nextTeaser: NEXT_COLLECTION_TEASER,
  } = useLookBookVol3Controller();
  return (
    <div className="space-y-16 md:space-y-24 font-sans pb-16">
      
      {/* 1 & 2. PAGE HEADER: Full-bleed Hero Image (Portrait 3:4) next to Intro Text Block */}
      <section className="bg-oatly-cream border-b-4 border-oatly-black pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Full-bleed Portrait Hero Image (Aspect 3:4) */}
            <div className="lg:col-span-5 relative">
              <div className="border-4 border-oatly-black bg-oatly-blue p-2 shadow-brutal-xl rotate-[-1deg] hover:rotate-0 transition-transform">
                {/* 
                  TODO: Swap in real licensed image file here 
                  e.g., <img src="/assets/lookbook-vol3-hero-portrait.jpg" alt="Look Book Vol 3" />
                */}
                <div className="aspect-[3/4] w-full bg-oatly-blue flex flex-col items-center justify-center text-center p-6 border-2 border-white text-white overflow-hidden relative group">
                  <img
                    src={LOOK_BOOK_VOL_3_HERO.heroImage}
                    alt={LOOK_BOOK_VOL_3_HERO.title}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-oatly-black/40 group-hover:bg-oatly-black/20 transition-colors" />
                  <div className="relative z-10 space-y-2">
                    <span className="badge-sticker bg-oatly-yellow text-oatly-black">EDITORIAL VOL. 3</span>
                    <h2 className="text-4xl font-black font-display text-white drop-shadow-md">LOOK BOOK VOL. 3</h2>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 bg-oatly-yellow text-oatly-black p-3 border-2 border-oatly-black font-hand font-bold text-xs shadow-brutal-sm rotate-3 hidden sm:block">
                ★ 18 NEW FLAVOUR FORMULAS
              </div>
            </div>

            {/* Right: Intro Text Block (Quote-style paragraph with attribution at bottom) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-oatly-blue">
                <BookOpen className="w-4 h-4" />
                OATLY TASTEBUDS • SPECIAL EDITION
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase font-display text-oatly-black leading-[0.95]">
                LOOK BOOK <span className="bg-oatly-black text-oatly-yellow px-2 py-0.5 inline-block rotate-1 shadow-brutal">VOL. 3</span>
              </h1>

              <p className="text-xs font-mono font-bold uppercase text-oatly-pink tracking-widest">
                {LOOK_BOOK_VOL_3_HERO.subtitle}
              </p>

              {/* Quote-style block */}
              <div className="p-6 md:p-8 bg-white border-4 border-oatly-black shadow-brutal relative space-y-4">
                <Quote className="w-8 h-8 text-oatly-yellow fill-oatly-yellow absolute top-4 right-4 opacity-40" />
                <p className="text-base md:text-lg text-gray-800 font-sans leading-relaxed italic">
                  "{LOOK_BOOK_VOL_3_HERO.quote}"
                </p>

                {/* Attribution Name/Title */}
                <div className="pt-4 border-t-2 border-oatly-black flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-sm uppercase text-oatly-black font-display">
                      {LOOK_BOOK_VOL_3_HERO.author}
                    </div>
                    <div className="text-xs font-mono text-gray-600">
                      {LOOK_BOOK_VOL_3_HERO.role}
                    </div>
                  </div>
                  <span className="badge-sticker bg-oatly-mint text-oatly-black">100% PLANT POWERED</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* 3. RECIPE GRID: 18 Cards with Square 1:1 Aspect Ratio Images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-4 border-oatly-black pb-4 gap-4">
          <div>
            <span className="badge-sticker bg-oatly-pink text-white mb-2">LOOK BOOK RECIPES</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase font-display text-oatly-black">
              RECIPE COLLECTION (18 FORMULAS)
            </h2>
          </div>
          <div className="text-xs font-mono font-bold uppercase text-oatly-blue">
            CLICK CARD TO VIEW INGREDIENTS & STEPS
          </div>
        </div>

        {/* 18 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
          {LOOK_BOOK_VOL_3_RECIPES.map((recipe) => (
            <Link
              key={recipe.id}
              to={`/recipes/look-book-vol-3/${recipe.slug}`}
              className="bg-white border-4 border-oatly-black shadow-brutal hover:shadow-brutal-xl transition-all duration-200 group flex flex-col justify-between overflow-hidden h-full"
            >
              {/* 1:1 Square Image Container */}
              {/* TODO: Swap in real licensed image file here for recipe.image */}
              <div className="relative aspect-square w-full bg-oatly-cream overflow-hidden border-b-4 border-oatly-black">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="badge-sticker bg-oatly-yellow text-oatly-black text-[11px]">VOL. 3</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-oatly-black text-white px-2.5 py-1 text-[11px] font-mono font-bold border border-white">
                  {recipe.prepTime}
                </div>
              </div>

              {/* Title & Subtitle / Collection Label */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-xl font-extrabold uppercase font-display text-oatly-black group-hover:text-oatly-blue transition-colors truncate" title={recipe.name}>
                    {recipe.name}
                  </h3>
                  <div className="text-xs font-mono font-bold text-oatly-pink uppercase mt-1">
                    {recipe.collection}
                  </div>
                  <p className="text-xs text-gray-700 font-sans mt-2 line-clamp-2 leading-relaxed">
                    {recipe.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-oatly-black flex items-center justify-between text-xs font-extrabold uppercase text-oatly-blue group-hover:underline min-h-[44px]">
                  <span className="truncate" title="GET RECIPE">GET RECIPE</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>


      {/* 4. EDITORIAL / MAGAZINE-STYLE CONTENT SECTION */}
      <section className="bg-oatly-cream-dark border-y-4 border-oatly-black py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
          
          {/* Main Large Editorial Heading */}
          <div className="text-center space-y-3">
            <span className="badge-sticker bg-oatly-blue text-white">FUTURE OF TASTE</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase font-display text-oatly-black leading-tight max-w-3xl mx-auto">
              {EDITORIAL_SECTION.headline}
            </h2>
            <div className="text-xs font-mono font-bold uppercase text-gray-700">
              {EDITORIAL_SECTION.byline}
            </div>
          </div>

          {/* Narrow Multi-Paragraph Body Text */}
          <div className="max-w-2xl mx-auto bg-white border-4 border-oatly-black p-6 md:p-8 shadow-brutal space-y-4 text-sm md:text-base text-gray-800 font-sans leading-relaxed">
            {EDITORIAL_SECTION.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            
            {/* Author Byline Block */}
            <div className="pt-4 border-t-2 border-oatly-black flex items-center justify-between font-mono text-xs font-bold text-oatly-blue uppercase">
              <span>AUTHOR: {EDITORIAL_SECTION.author}</span>
              <span>MALMÖ LAB</span>
            </div>
          </div>

          {/* Alternating Full-Width and Half-Width Image & Blurb Blocks */}
          <div className="space-y-12 pt-4">
            
            {EDITORIAL_SECTION.blurbs.map((blurb, idx) => {
              const isFullWidth = idx % 2 === 0;

              return (
                <div key={idx} className="space-y-4">
                  
                  {/* Image (Full-Width 16:9 or Half-Width 1:1) */}
                  {blurb.image && (
                    <div className={`border-4 border-oatly-black overflow-hidden shadow-brutal ${
                      isFullWidth ? 'aspect-[16/9] w-full' : 'aspect-square max-w-md mx-auto'
                    }`}>
                      {/* TODO: Swap in real licensed image file here */}
                      <img
                        src={blurb.image}
                        alt={blurb.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Headline & 1-2 sentence blurb text */}
                  <div className="bg-white border-2 border-oatly-black p-6 shadow-brutal-sm max-w-3xl mx-auto">
                    <h3 className="text-2xl font-black font-display uppercase text-oatly-black mb-2">
                      {idx + 1}. {blurb.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-800 font-sans leading-relaxed">
                      {blurb.text}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* 5. "NEXT COLLECTION" TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8">
        
        <div className="bg-oatly-yellow border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="badge-sticker bg-oatly-black text-white">UP NEXT</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase font-display text-oatly-black">
              {NEXT_COLLECTION_TEASER.title}
            </h2>
            <p className="font-hand text-lg text-oatly-black whitespace-pre-line leading-relaxed">
              "{NEXT_COLLECTION_TEASER.poem}"
            </p>
          </div>

          <div>
            <Link to="/recipes" className="btn-oatly text-sm py-4 px-8 bg-oatly-black text-white shadow-brutal-lg hover:bg-white hover:text-oatly-black whitespace-nowrap">
              VIEW ALL RECIPES <ChevronRight className="w-4 h-4 ml-2 inline" />
            </Link>
          </div>
        </div>

        {/* Mini 4-Card Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {NEXT_COLLECTION_TEASER.teaserCards.map((card, idx) => (
            <Link
              key={idx}
              to="/recipes"
              className="bg-white border-4 border-oatly-black shadow-brutal hover:shadow-brutal-lg transition-all group overflow-hidden flex flex-col h-full"
            >
              {/* TODO: Swap in real licensed image file here */}
              <div className="aspect-square w-full bg-oatly-cream border-b-4 border-oatly-black overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 flex-1">
                <div className="text-[10px] font-mono font-bold text-oatly-blue uppercase">{card.category}</div>
                <div className="font-extrabold text-sm uppercase font-display text-oatly-black truncate group-hover:text-oatly-pink" title={card.title}>
                  {card.title}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </div>
  );
}
