import React, { useState } from 'react';
// ─── MVC: View ─── data via Model (async Express API) ──────────────────────────
import ContentModel from '../models/contentModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { Sparkles } from 'lucide-react';

export default function SustainabilityPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [calcVolume, setCalcVolume] = useState(1); // liters per week
  // MODEL (async API — page renders once the plan arrives)
  const SUSTAINABILITY_PLAN = useApiData(() => ContentModel.getSustainabilityPlan(), []);
  if (!SUSTAINABILITY_PLAN) return null;

  // CO2e comparison factors (kg CO2e per liter)
  const oatCO2 = 0.49;
  const cowCO2 = 1.85;

  const weeklyOat = (calcVolume * oatCO2).toFixed(2);
  const weeklyCow = (calcVolume * cowCO2).toFixed(2);
  const yearlySavings = ((cowCO2 - oatCO2) * calcVolume * 52).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-12 font-sans pb-16">
      
      {/* Header Banner */}
      <div id="solutions" className="bg-oatly-blue text-white border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="badge-sticker bg-oatly-yellow text-oatly-black">CLIMATE SOLUTIONS COMPANY</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase font-display text-white leading-tight">
            WHY WE'RE HERE: THE PLANET.
          </h1>
          <p className="text-base md:text-lg font-medium text-oatly-cream/90">
            {SUSTAINABILITY_PLAN.headline} Replacing animal dairy with plant-based nutrition is one of the single most powerful moves humans can make for climate action.
          </p>
        </div>
      </div>

      {/* Key Climate Stats Banner */}
      <div id="footprint" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
        {SUSTAINABILITY_PLAN.stats.map((stat, idx) => (
          <div key={idx} className="bg-white border-4 border-oatly-black p-6 shadow-brutal flex flex-col justify-between">
            <div>
              <div className="text-4xl md:text-5xl font-black font-display text-oatly-blue mb-2">
                {stat.value}
              </div>
              <div className="text-base font-extrabold uppercase text-oatly-black">
                {stat.label}
              </div>
            </div>
            <div className="text-xs font-mono text-gray-600 mt-4 pt-3 border-t border-gray-200">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>


      {/* INTERACTIVE CARBON FOOTPRINT CALCULATOR */}
      <section className="bg-oatly-cream-dark border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-oatly-black pb-6">
          <div>
            <span className="badge-sticker bg-oatly-pink text-white mb-2">INTERACTIVE TOOL</span>
            <h2 className="text-3xl md:text-4xl font-black uppercase font-display text-oatly-black">
              YOUR PERSONAL OAT CARBON SAVER
            </h2>
          </div>
          <div className="text-xs font-mono font-bold text-gray-700">
            BASIS: INDEPENDENT ISO 14044 LCA DATA
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <label className="block text-sm font-extrabold uppercase text-oatly-black">
              HOW MANY LITERS / CARTONS OF MILK DO YOU CONSUME PER WEEK?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="20"
                value={calcVolume}
                onChange={(e) => setCalcVolume(Number(e.target.value))}
                className="w-full h-4 bg-oatly-cream border-2 border-oatly-black accent-oatly-blue cursor-pointer"
              />
              <span className="bg-oatly-black text-oatly-yellow font-display font-black text-2xl px-4 py-2 border-2 border-black min-w-[70px] text-center">
                {calcVolume} L
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="bg-white border-2 border-oatly-black p-4 shadow-brutal-sm">
                <div className="text-xs font-mono font-bold text-gray-500 uppercase">OATLY FOOTPRINT</div>
                <div className="text-2xl font-black font-display text-oatly-blue">{weeklyOat} kg CO2e</div>
                <div className="text-[11px] text-gray-600 mt-1 font-mono">per week</div>
              </div>

              <div className="bg-white border-2 border-oatly-black p-4 shadow-brutal-sm">
                <div className="text-xs font-mono font-bold text-gray-500 uppercase">COW MILK FOOTPRINT</div>
                <div className="text-2xl font-black font-display text-red-600">{weeklyCow} kg CO2e</div>
                <div className="text-[11px] text-gray-600 mt-1 font-mono">per week</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-oatly-yellow border-4 border-oatly-black p-6 shadow-brutal text-center space-y-4">
            <span className="badge-sticker bg-oatly-black text-white">ANNUAL CLIMATE IMPACT</span>
            <div className="text-5xl md:text-6xl font-black font-display text-oatly-black">
              -{yearlySavings} kg
            </div>
            <div className="text-sm font-extrabold uppercase text-oatly-black max-w-md mx-auto">
              CO2e SAVED PER YEAR BY DRINKING OATLY INSTEAD OF COW'S MILK!
            </div>
            <p className="text-xs font-hand text-gray-800">
              That's equivalent to driving over {Math.round(yearlySavings * 2.5)} miles less in an average gasoline car.
            </p>
          </div>

        </div>

      </section>


      {/* SUSTAINABILITY PLAN 4 PILLARS */}
      <section id="plan" className="space-y-6">
        
        <div>
          <span className="badge-sticker bg-oatly-mint text-oatly-black mb-2">4-PILLAR ROADMAP</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase font-display text-oatly-black">
            OATLY'S SUSTAINABILITY PLAN
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {SUSTAINABILITY_PLAN.pillars.map((pillar, idx) => (
            <div
              key={idx}
              onClick={() => setActivePillar(idx)}
              className={`p-6 border-4 border-oatly-black cursor-pointer transition-all ${
                activePillar === idx
                  ? 'bg-oatly-yellow shadow-brutal-lg translate-x-0.5 translate-y-0.5'
                  : 'bg-white shadow-brutal hover:bg-oatly-cream'
              }`}
            >
              <div className="text-xs font-mono font-bold text-oatly-blue uppercase mb-2">PILLAR 0{idx + 1}</div>
              <h3 className="text-xl font-extrabold uppercase font-display text-oatly-black leading-tight">
                {pillar.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Selected Pillar Detail Card */}
        <div className="bg-white border-4 border-oatly-black p-8 shadow-brutal space-y-4">
          <div className="flex items-center gap-2 font-display font-extrabold text-2xl uppercase text-oatly-blue">
            <Sparkles className="w-6 h-6" />
            {SUSTAINABILITY_PLAN.pillars[activePillar].title}
          </div>
          <p className="text-base md:text-lg text-gray-800 font-sans leading-relaxed">
            {SUSTAINABILITY_PLAN.pillars[activePillar].desc}
          </p>
        </div>

      </section>


      {/* OATLY WHO? ABOUT SECTION */}
      <section id="who" className="bg-white border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="badge-sticker bg-oatly-pink text-white">ABOUT US</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase font-display text-oatly-black">
            OATLY WHO?
          </h2>
          <p className="text-base text-gray-800 leading-relaxed font-sans">
            Oatly was founded in the 1990s by Swedish food scientist Rickard Öste at Lund University. Using patented liquid oat enzyme technology, Öste developed a way to convert fiber-rich oats into a delicious, nutritious liquid food without requiring animal farming.
          </p>
          <p className="text-base text-gray-800 leading-relaxed font-sans">
            Today, Oatly is available in over 20 countries worldwide across cafes, supermarkets, ice cream parlors, and stadiums.
          </p>
        </div>
      </section>

    </div>
  );
}
