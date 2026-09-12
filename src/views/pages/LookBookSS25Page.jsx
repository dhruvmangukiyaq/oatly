import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderMedia from '../components/PlaceholderMedia';
import SEO from '../components/SEO';
import { ArrowLeft } from 'lucide-react';

export default function LookBookSS25Page() {
  const recipes = [
    { title: 'Strawberry Cold Foam Matcha', time: '7 mins', desc: 'Layered matcha with fresh strawberry cold foam.' },
    { title: 'Citrus Yuzu Tonic Float', time: '4 mins', desc: 'Sparkling yuzu tonic with frothed Oatly.' },
    { title: 'Iced Coconut Oat Espresso', time: '5 mins', desc: 'Espresso shaken over ice with coconut oat milk.' },
    { title: 'Watermelon Oat Spritz', time: '6 mins', desc: 'Refreshing iced watermelon juice topped with oat cream.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      <SEO
        title="Look Book S/S 25 | Oatly Recipes"
        description="Refreshing spring and summer plant-based sips."
        pathname="/recipes/look-book-spring-summer-2025"
      />

      <Link to="/recipes" className="btn-oatly-secondary text-xs py-2.5 px-5 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> ALL LOOK BOOKS
      </Link>

      <div className="bg-oatly-pink text-white border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl space-y-4">
        <span className="badge-sticker bg-oatly-yellow text-oatly-black">SPRING / SUMMER 2025</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase font-display">LOOK BOOK S/S 25</h1>
        <p className="text-base md:text-lg opacity-90 max-w-2xl">
          Sun-kissed sips, icy matcha clouds, and fruit-forward oat creations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        {recipes.map((r, idx) => (
          <div key={idx} className="bg-white border-4 border-oatly-black shadow-brutal p-5 space-y-4 flex flex-col justify-between h-full">
            <div>
              {/* TODO: Swap in real licensed image file here */}
              <PlaceholderMedia aspectRatio="1:1" label={r.title} icon="🍓" bgClass="bg-oatly-cream" />
              <div className="flex items-center justify-between text-xs font-mono font-bold text-oatly-pink mt-3">
                <span>LOOK BOOK S/S 25</span>
                <span>{r.time}</span>
              </div>
              <h3 className="text-xl font-black uppercase font-display mt-1 truncate" title={r.title}>{r.title}</h3>
              <p className="text-xs text-gray-700 font-sans mt-2 line-clamp-2">{r.desc}</p>
            </div>
            <button onClick={() => alert(`Recipe details for ${r.title}`)} className="btn-oatly text-xs py-2 min-h-[44px]">
              VIEW FORMULA
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
