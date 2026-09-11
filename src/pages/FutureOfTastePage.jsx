import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderMedia from '../components/PlaceholderMedia';
import SEO from '../components/SEO';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function FutureOfTastePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      <SEO
        title="Future Of Taste Initiative | Oatly"
        description="Exploring the next frontier of sustainable plant-based taste, texture, and flavor science."
        pathname="/things-we-do/initiatives/future-of-taste"
      />

      <Link to="/news" className="btn-oatly-secondary text-xs py-2.5 px-5 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> ALL INITIATIVES
      </Link>

      <div className="bg-oatly-mint text-oatly-black border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl space-y-4">
        <span className="badge-sticker bg-oatly-black text-white">RESEARCH INITIATIVE</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase font-display">THE FUTURE OF TASTE</h1>
        <p className="text-base md:text-lg opacity-90 max-w-2xl">
          What will humans drink in 2050? We are testing natural enzymatic fermentation, texture jell-oats, and zero-emissions crop technology.
        </p>
      </div>

      <div className="bg-white border-4 border-oatly-black shadow-brutal p-8 space-y-6">
        {/* TODO: Swap in real licensed image file here */}
        <PlaceholderMedia aspectRatio="16:9" label="FUTURE OF TASTE LAB" icon="🧪" bgClass="bg-oatly-blue text-white" />

        <h2 className="text-3xl font-black uppercase font-display text-oatly-black">FLAVOUR LAB DISCOVERIES</h2>
        <p className="text-base text-gray-800 leading-relaxed font-sans">
          The future of food isn’t synthetic test tubes; it’s unlocking the hidden culinary potential of ancient grains, non-dairy fermentation, and natural botanical fats. Our Malmö innovation lab collaborates with world-class mixologists, baristas, and soil scientists.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 font-mono text-xs">
          <div className="p-4 bg-oatly-cream border-2 border-oatly-black">
            <div className="font-extrabold text-oatly-blue text-sm mb-1">01. TEXTURE AERATION</div>
            <p>Creating micro-foam stability without synthetic emulsifiers.</p>
          </div>
          <div className="p-4 bg-oatly-cream border-2 border-oatly-black">
            <div className="font-extrabold text-oatly-blue text-sm mb-1">02. BOTANICAL PAIRINGS</div>
            <p>Infusing roasted hojicha, fig leaf, and koji caramel into oat milk bases.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
