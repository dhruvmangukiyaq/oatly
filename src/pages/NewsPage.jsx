import React, { useState } from 'react';
import { NEWS_DATA } from '../data/oatlyData';
import { Newspaper, Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react';

export default function NewsPage({ onSelectArticle }) {
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Initiative', 'Stories', 'Collaborations'];

  const filteredNews = NEWS_DATA.filter((n) => {
    if (selectedType === 'All') return true;
    return n.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  const featuredArticle = NEWS_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      
      {/* Header Banner */}
      <div className="bg-oatly-mint text-oatly-black border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <span className="badge-sticker bg-oatly-black text-white">THINGS WE DO</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase font-display leading-tight">
            NEWS, STORIES & BRAINWASHING.
          </h1>
          <p className="text-base md:text-lg font-medium text-oatly-black/90">
            From urine recycling experiments in Sweden to high-fashion Paris runway shows, read all about what we do when we're not turning oats into drinkable liquid.
          </p>
        </div>
      </div>

      {/* Featured Story Hero Card */}
      {featuredArticle && (
        <div
          onClick={() => onSelectArticle(featuredArticle)}
          className="bg-white border-4 border-oatly-black shadow-brutal-xl hover:shadow-brutal transition-all cursor-pointer overflow-hidden grid grid-cols-1 lg:grid-cols-12 group"
        >
          <div className="lg:col-span-7 bg-oatly-cream border-b-4 lg:border-b-0 lg:border-r-4 border-oatly-black overflow-hidden relative min-h-[300px]">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <span className="badge-sticker bg-oatly-yellow text-oatly-black">FEATURED STORY</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs font-mono font-bold text-gray-600">
                <span>{featuredArticle.date}</span>
                <span>•</span>
                <span>{featuredArticle.readTime}</span>
              </div>
              <h2 className="text-3xl font-black uppercase font-display text-oatly-black group-hover:text-oatly-blue transition-colors">
                {featuredArticle.title}
              </h2>
              <p className="text-sm text-gray-800 leading-relaxed font-sans">
                {featuredArticle.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t-2 border-oatly-black flex items-center justify-between font-extrabold text-xs uppercase text-oatly-blue group-hover:underline">
              <span>READ FULL INITIATIVE REPORT</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-4">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 text-xs font-extrabold uppercase transition-all border-2 border-oatly-black shadow-brutal-sm cursor-pointer ${
              selectedType === type
                ? 'bg-oatly-blue text-white'
                : 'bg-white text-oatly-black hover:bg-oatly-yellow'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Stories Feed Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-stretch">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            onClick={() => onSelectArticle(news)}
            className="bg-white border-4 border-oatly-black shadow-brutal hover:shadow-brutal-xl transition-all cursor-pointer group flex flex-col justify-between overflow-hidden h-full"
          >
            <div className="relative bg-oatly-cream overflow-hidden border-b-4 border-oatly-black" style={{ aspectRatio: '4/3' }}>
              <img
                src={news.image}
                alt={news.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <span className="badge-sticker bg-oatly-yellow text-oatly-black text-[11px]">{news.tag}</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 mb-1">
                  <span>{news.type}</span>
                  <span>{news.readTime}</span>
                </div>
                <h3
                  className="text-xl font-extrabold uppercase font-display text-oatly-black group-hover:text-oatly-blue transition-colors truncate"
                  title={news.title}
                >
                  {news.title}
                </h3>
                <p className="text-xs text-gray-700 font-sans mt-2 line-clamp-3 leading-relaxed">
                  {news.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t-2 border-oatly-black flex items-center justify-between text-xs font-extrabold uppercase text-oatly-black group-hover:text-oatly-blue min-h-[44px]">
                <span className="truncate" title="READ STORY">READ STORY</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
