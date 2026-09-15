import React, { useState } from 'react';
// ─── MVC: View ─── data via Model (async Express API) ──────────────────────────
import ContentModel from '../models/contentModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { ChevronDown, ChevronUp, Heart, CheckCircle2, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export default function HealthPage() {
  const [openFact, setOpenFact] = useState(1);
  // MODEL (async API — page renders once facts arrive)
  const NUTRITION_FACTS = useApiData(() => ContentModel.getNutritionFacts(), []);
  if (!NUTRITION_FACTS) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-12 font-sans pb-16">
      
      {/* Header Banner */}
      <div className="bg-oatly-yellow text-oatly-black border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="badge-sticker bg-oatly-black text-white">NUTRITION & HEALTH</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase font-display text-oatly-black leading-tight">
            17 FACTS ABOUT OATLY AND NUTRITION.
          </h1>
          <p className="text-base md:text-lg font-medium text-oatly-black/90">
            Got questions about oat beta-glucan fiber, vitamins, calcium, sugar, or allergies? We answered them all with zero corporate filter.
          </p>
        </div>
      </div>

      {/* Allergen Matrix Quick Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        {[
          { label: '100% DAIRY-FREE', color: 'bg-oatly-cream', icon: '🥛' },
          { label: 'CERTIFIED GLUTEN-FREE', color: 'bg-oatly-cream', icon: '🌾' },
          { label: 'SOY & NUT-FREE', color: 'bg-oatly-cream', icon: '🥜' },
          { label: 'NON-GMO VERIFIED', color: 'bg-oatly-cream', icon: '🌱' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white border-4 border-oatly-black p-5 shadow-brutal text-center flex flex-col items-center justify-center space-y-2">
            <span className="text-3xl">{item.icon}</span>
            <div className="font-extrabold text-xs uppercase font-mono text-oatly-black">{item.label}</div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-oatly-blue">
              <CheckCircle2 className="w-3.5 h-3.5" /> VERIFIED SAFE
            </div>
          </div>
        ))}
      </div>

      {/* Accordion Questions & Answers */}
      <div className="space-y-4 max-w-4xl mx-auto">
        <div className="font-display font-extrabold text-2xl uppercase text-oatly-black mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-oatly-blue" />
          FREQUENTLY ASKED NUTRITION QUESTIONS
        </div>

        {NUTRITION_FACTS.map((fact) => {
          const isOpen = openFact === fact.id;
          return (
            <div
              key={fact.id}
              className="bg-white border-4 border-oatly-black shadow-brutal transition-all overflow-hidden"
            >
              <button
                onClick={() => setOpenFact(isOpen ? null : fact.id)}
                className="w-full p-5 text-left font-display font-black text-lg md:text-xl uppercase text-oatly-black flex items-center justify-between hover:bg-oatly-cream transition-colors"
              >
                <span>{fact.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-6 h-6 flex-shrink-0 text-oatly-blue" />
                ) : (
                  <ChevronDown className="w-6 h-6 flex-shrink-0 text-gray-500" />
                )}
              </button>

              {isOpen && (
                <div className="p-5 border-t-2 border-oatly-black bg-oatly-cream-light font-sans text-sm md:text-base text-gray-800 leading-relaxed">
                  {fact.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Beta Glucan Explainer Banner */}
      <div className="bg-oatly-blue text-white border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-4">
          <span className="badge-sticker bg-oatly-yellow text-oatly-black">WHAT IS BETA-GLUCAN?</span>
          <h2 className="text-3xl md:text-4xl font-black uppercase font-display text-white">
            THE HEART-HEALTHY HERO FIBER IN OATS.
          </h2>
          <p className="text-sm md:text-base text-oatly-cream/90 leading-relaxed">
            Oat beta-glucan is a natural soluble fiber that dissolves into a viscous gel in your stomach. It binds to cholesterol and bile acids, helping your body sweep them away naturally.
          </p>
        </div>
        <div className="md:col-span-4 bg-white text-oatly-black p-6 border-4 border-oatly-black shadow-brutal text-center space-y-2">
          <div className="text-5xl font-black font-display text-oatly-blue">1.0g</div>
          <div className="text-xs font-mono font-bold uppercase">BETA-GLUCAN PER GLASS</div>
          <div className="text-[11px] text-gray-600">3g daily intake lowers blood cholesterol</div>
        </div>
      </div>

    </div>
  );
}
