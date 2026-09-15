import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// ─── MVC: View ─── data via Model (async Express API) ──────────────────────────
import ContentModel from '../models/contentModel.js';
import { useApiData } from '../hooks/useApiData.js';
import PlaceholderMedia from '../components/PlaceholderMedia';
import FlatCard from '../components/FlatCard';
import SEO from '../components/SEO';
import { ArrowLeft, Leaf, CheckCircle2 } from 'lucide-react';

export default function SustainabilitySubPage() {
  const { pathname } = useLocation();
  // MODEL (async API — page renders once data + homepage deck arrive)
  const bundle = useApiData(async () => {
    const [sustainabilityData, images, cards] = await Promise.all([
      ContentModel.getSustainabilityData(),
      ContentModel.getHomepageImages(),
      ContentModel.getHomepageCards(),
    ]);
    return { sustainabilityData, IMAGES: images, CARDS: cards };
  }, []);
  if (!bundle) return null;
  const { sustainabilityData, IMAGES, CARDS } = bundle;

  let subData = sustainabilityData.sections.who;
  if (pathname.includes('sustainability-plan/climate-footprint')) {
    subData = sustainabilityData.sections.footprint;
  } else if (pathname.includes('sustainability-plan')) {
    subData = sustainabilityData.sections.plan;
  } else if (pathname.includes('climate-solutions')) {
    subData = sustainabilityData.sections.solutions;
  }

  const showPlanGrid =
    pathname.includes('sustainability-plan') &&
    !pathname.includes('climate-footprint');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      <SEO
        title={subData.title}
        description={subData.copy || sustainabilityData.subtext}
        pathname={pathname}
      />

      <Link to="/sustainability" className="btn-oatly-secondary text-xs py-2.5 px-5 inline-flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> SUSTAINABILITY HUB
      </Link>

      <div className="bg-oatly-blue text-white border-4 border-oatly-black p-8 md:p-12 shadow-brutal-xl space-y-4">
        <span className="badge-sticker bg-oatly-yellow text-oatly-black">SUSTAINABILITY</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase font-display text-white">{subData.title}</h1>
        <p className="text-base md:text-lg opacity-90 max-w-2xl">{sustainabilityData.subtext}</p>
      </div>

      <div className="bg-white border-4 border-oatly-black shadow-brutal p-8 space-y-6">
        {/* TODO: Swap in real licensed image file here */}
        <PlaceholderMedia aspectRatio="16:9" label={subData.title} icon="🌱" bgClass="bg-oatly-mint text-oatly-black" />

        {subData.copy && (
          <p className="text-base md:text-lg text-gray-800 leading-relaxed font-sans">{subData.copy}</p>
        )}

        {subData.pillars && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {subData.pillars.map((p, idx) => (
              <div key={idx} className="p-4 bg-oatly-cream border-2 border-oatly-black space-y-2">
                <div className="font-display font-black text-lg uppercase text-oatly-blue">{p.title}</div>
                <p className="text-xs text-gray-700 font-sans">{p.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showPlanGrid && (
        <div className="plan-grid">
          <FlatCard
            {...CARDS.popcorn}
            title="OAT DRINK BARISTA POPCORN EDITION"
            aspectRatio="fill"
            className="plan-area-product h-full"
          />
          <FlatCard
            {...CARDS.fats}
            className="plan-area-healthy"
            footerAtBottom
          />
          <FlatCard
            {...CARDS.wakeup}
            linkTo="/sustainability"
            className="plan-area-sustainability"
            footerAtBottom
          />
          <FlatCard
            {...CARDS.blind}
            className="plan-area-blind"
            footerAtBottom
          />
          <FlatCard
            title="THE OATLY LOOK BOOK AUTUMN/WINTER 2025"
            tag="TASTEBUDS"
            imageSrc={IMAGES.lookbookDrinks}
            linkTo="/recipes/look-book-autumn-winter-2025"
            aspectRatio="16/9"
            objectFit="contain"
            className="plan-area-lookbook"
            footerAtBottom
          />
        </div>
      )}
    </div>
  );
}
