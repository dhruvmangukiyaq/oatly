import React from 'react';
import { Link } from 'react-router-dom';
import FlatCard from '../components/FlatCard';
import VideoCard from '../components/VideoCard';
import SEO from '../components/SEO';
import { IMAGES, CARDS } from '../../models/homepage';

// ─── VIEW fragments (MVC: View) ─────────────────────────────────────────────

// Dotted filler block with irregular cream gaps, like oatly.com.
const DOTS_GAPS = {
  side: [
    { top: '0%', left: '62%', width: '38%', height: '22%' },
    { top: '30%', left: '38%', width: '24%', height: '20%' },
    { top: '72%', left: '0%', width: '26%', height: '28%' },
  ],
  b1: [
    { top: '58%', left: '52%', width: '48%', height: '42%' },
  ],
  b2: [
    { top: '46%', left: '42%', width: '22%', height: '18%' },
    { top: '64%', left: '20%', width: '40%', height: '36%' },
  ],
  b3: [
    { top: '46%', left: '58%', width: '22%', height: '18%' },
    { top: '64%', left: '36%', width: '40%', height: '36%' },
  ],
};

function Dots({ variant = 'b1', aspectRatio = '1/1', className = '', fill = false }) {
  return (
    <div
      className={`relative overflow-hidden bg-[#FFFEF8] ${className}`}
      style={fill ? { flex: '1 1 auto', minHeight: 120 } : { aspectRatio }}
    >
      <div className="absolute inset-0 bg-polka-dots opacity-70" />
      {(DOTS_GAPS[variant] || []).map((g, i) => (
        <div key={i} className="absolute bg-[#FFFEF8]" style={g} />
      ))}
    </div>
  );
}

const TAG_COLORS = {
  'NEWS': 'bg-[#F8DC9A] text-black',
  'PRODUCTS': 'bg-[#DBDBDB] text-black',
  'TASTEBUDS': 'bg-[#F4C2D4] text-black',
  'SUSTAINABILITY': 'bg-[#B9A6D6] text-black',
  'HEALTH': 'bg-[#F6D2D2] text-black',
  'OTHER': 'bg-[#B8CFE2] text-black',
};

// Designed (non-photo) card: HOW TO MAKE MATCHA.
function MatchaCard() {
  const c = CARDS.matcha;
  return (
    <Link to={c.linkTo} className="group block bg-white border-2 border-black overflow-hidden">
      <div className="relative overflow-hidden bg-white" style={{ aspectRatio: c.aspectRatio }}>
        <div className="w-full h-full flex flex-col items-center justify-between px-6 pt-8 pb-6 text-center">
          <div className="font-display font-black uppercase leading-[0.95] tracking-tight text-[clamp(2rem,3.4vw,3.4rem)]">
            HOW TO<br />
            <span className="relative inline-block">
              MAKE
              <span className="absolute left-[-4%] top-1/2 -translate-y-1/2 w-[108%] h-[0.3em] bg-[#9CCB86] -rotate-3 rounded-full" />
            </span>
            <br />MATCHA
          </div>
          <img src={IMAGES.matchaCarton} alt="Oat Drink Matcha carton" className="h-[46%] object-contain" />
        </div>
      </div>
      <div className="bg-white border-t-2 border-black px-3 min-h-[44px] flex items-center justify-between gap-3">
        <div className="font-mono font-bold text-[13px] uppercase text-black tracking-tight leading-tight truncate" title={c.title}>{c.title}</div>
        <span className={`${TAG_COLORS[c.tag]} px-2 py-[3px] text-[11px] font-mono font-bold uppercase whitespace-nowrap flex-shrink-0 leading-none self-center`}>{c.tag}</span>
      </div>
    </Link>
  );
}

// ─── CONTROLLER (MVC): composes Model data into View bands ──────────────────
export default function HomePage() {
  return (
    <div className="page-container">
      <SEO title="the Original Oat Drink Company" description="A site filled with everything you could possibly think of, and also probably not think of, related to an oat drink company called Oatly." />

      <div className="bg-[#FFFEF8]">
        <div className="max-w-[1760px] mx-auto px-4 sm:px-6 md:px-7 py-4 md:py-6 flex flex-col gap-3">

          {/* BAND 1 — hero + pee | look book vol.3 tall */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
            <div className="flex flex-col gap-3">
              <div className="text-center px-2 sm:px-6 py-8 md:py-12">
                <h1 className="font-mono font-bold uppercase text-black tracking-tight leading-[1.3] text-[20px] sm:text-[23px] lg:text-[26px] max-w-2xl mx-auto">
                  WE EXIST TO MAKE IT EASIER FOR PEOPLE TO LIVE HEALTHIER LIVES WITHOUT RECKLESSLY TAXING THE PLANET'S RESOURCES IN THE PROCESS.
                </h1>
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/sustainability/climate-solutions-company"
                    className="inline-block border-2 border-black bg-white px-6 py-2.5 font-mono text-[14px] font-bold uppercase tracking-wide shadow-[3px_3px_0_#111] hover:bg-[#F8DC9A] transition-colors"
                  >
                    READ MORE →
                  </Link>
                </div>
              </div>
              <FlatCard {...CARDS.pee} />
            </div>
            <div className="flex">
              <VideoCard
                {...CARDS.lookbook}
                className="w-full h-full"
                overlay={<img src={IMAGES.pressLogo} alt="Look Book Vol.3" className="absolute bottom-7 left-[5%] w-[90%]" />}
              />
            </div>
          </div>

          {/* BAND 2 — aftertaste + dots | avavav tall | faq + future + mucho (20/60/20) */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 items-stretch">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <VideoCard {...CARDS.aftertaste} />
              <Dots variant="side" fill />
            </div>
            <div className="lg:col-span-6 flex">
              <VideoCard
                {...CARDS.avavav}
                className="w-full h-full"
                overlay={<img src={IMAGES.avavavLogo} alt="AVAVAV × Oatly" className="absolute bottom-9 left-[6%] w-[88%]" />}
              />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-3">
              <FlatCard {...CARDS.faq} />
              <FlatCard {...CARDS.future} />
              <VideoCard {...CARDS.mucho} />
            </div>
          </div>

          {/* BAND 3 — refill wide | chocolate (footers on one line) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end">
            <div className="lg:col-span-7">
              <FlatCard
                {...CARDS.refill}
                overlay={<img src={IMAGES.receiptLogo} alt="Look Book Refill" className="absolute right-6 top-1/2 -translate-y-1/2 h-[72%] object-contain" />}
              />
            </div>
            <div className="lg:col-span-5">
              <FlatCard {...CARDS.chocolate} />
            </div>
          </div>

          {/* BAND 4 — sticky plan | how-to matcha | miami (tops aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
            <div className="lg:col-span-6">
              <FlatCard {...CARDS.sticky} />
            </div>
            <div className="lg:col-span-3">
              <MatchaCard />
            </div>
            <div className="lg:col-span-3">
              <VideoCard {...CARDS.miami} />
            </div>
          </div>

          {/* BAND 5 — ginger + popcorn | fats | wake-up poster (20/20/60) */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 items-start">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <FlatCard {...CARDS.ginger} />
              <FlatCard {...CARDS.popcorn} />
            </div>
            <div className="lg:col-span-2">
              <FlatCard {...CARDS.fats} />
            </div>
            <div className="lg:col-span-6">
              <FlatCard {...CARDS.wakeup} />
            </div>
          </div>

          {/* BAND 6 — blind test | look book AW banner (20/80) */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-3 items-start">
            <div className="lg:col-span-2">
              <FlatCard {...CARDS.blind} />
            </div>
            <div className="lg:col-span-8">
              <FlatCard {...CARDS.banner} />
            </div>
          </div>

          {/* BAND 7 — cow's milk | barista grey */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
            <FlatCard {...CARDS.cowsmilk} />
            <FlatCard {...CARDS.barista} />
          </div>

          {/* BAND 8 — climate wide | dealers + bikers | vault tall */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
            <div className="lg:col-span-6 flex">
              <FlatCard {...CARDS.climate} className="w-full h-full" />
            </div>
            <div className="lg:col-span-3 flex flex-col gap-3">
              <FlatCard {...CARDS.dealers} />
              <FlatCard {...CARDS.bikers} />
            </div>
            <div className="lg:col-span-3">
              <FlatCard {...CARDS.vault} />
            </div>
          </div>

          {/* BAND 9 — oatly who + dots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
            <FlatCard {...CARDS.oatlywho} />
            <Dots variant="b1" />
            <Dots variant="b2" />
            <Dots variant="b3" />
          </div>

        </div>
      </div>

    </div>
  );
}
