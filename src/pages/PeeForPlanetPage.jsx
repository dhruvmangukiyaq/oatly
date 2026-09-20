import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SEO from '../components/SEO';
import ResponsiveImage from '../components/ResponsiveImage';
import '../styles/PeeForPlanet.css';

// ─── PEE FOR THE PLANET 2.0 ───────────────────────────────────────────────
// Unique, playful, sticky experience:
// floating hero → live interactive Pee-O-Meter game → marquee → dark problem
// cards → peecycling timeline → win-win → myth/flip quiz → matchday results →
// story accordion (full original article, chunked) → pledge CTA.
// Illustrations = official Oatly Storyblok artwork, copy preserved.

const EASE_OUT = [0.22, 0.61, 0.36, 1];

function Reveal({ children, delay = 0, y = 28, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

const SB = 'https://a.storyblok.com/f/107921';

const ASSETS = {
  logo: `${SB}/1352x1651/2f513682c7/main-logo.svg`,
  tagline: `${SB}/450x184/384130dd1f/your-pee.svg`,
  sponsors: `${SB}/1342x95/c95bef0999/sponsorlogos.svg`,
  sponsorsMobile: `${SB}/683x564/d51e0d85b6/sponsors_mobile.svg`,
  ex1: `${SB}/363x253/35b931a3cb/ex_1-en.svg`,
  ex2: `${SB}/377x205/25fc8c0e0c/ex_2.svg`,
  ex3: `${SB}/361x247/53d814f771/ex_3-en.svg`,
  ex4: `${SB}/362x410/3da94e17cd/ex_4.svg`,
  ex5: `${SB}/364x372/16053cfc31/ex_5.svg`,
  ex6: `${SB}/361x313/919021c008/ex_6.svg`,
  goal: `${SB}/664x418/2e2aad3ee0/goal.svg`,
  match1: `${SB}/486x265/75e9ae9852/match-1-en.svg`,
  match2: `${SB}/486x265/b67958659c/match-2-en.svg`,
  match3: `${SB}/486x265/cb94680156/match-3-en.svg`,
  match4: `${SB}/486x265/47c0317f33/match-4-en.svg`,
};

const FUN_FACTS = [
  'Urine holds ~80% of the nitrogen in household wastewater.',
  'Granurin pellets are ~15% nitrogen — like mineral fertilizer, minus fossils.',
  'In theory pee could replace up to 30% of fertilizer used in Sweden.',
  '11 urinals + 1 unisex loo at Eleda Stadium. No behaviour change needed.',
  'Pee is dried, heat-treated & odourless. Zero ick factor.',
];

const PROBLEM = [
  {
    img: ASSETS.ex1,
    alt: 'Speech bubble with 1.3 billion tonnes of CO2e',
    stat: '1.3B',
    unit: 'tonnes CO₂e / year',
    title: 'More than aviation',
    text: 'Fertilizer factories emit 1.3B tonnes CO₂e a year — 23% more than all airplanes.',
  },
  {
    img: ASSETS.ex2,
    alt: 'Tractor on fields',
    stat: '100%',
    unit: 'made with fossils',
    title: 'Oil in, food out',
    text: 'Synthetic fertilizer needs fossil fuels. That is risky for farmers and climate.',
  },
  {
    img: ASSETS.ex3,
    alt: 'Cannister with Urine written on it',
    stat: '30%',
    unit: 'could come from pee',
    title: 'We flush it away',
    text: 'Pee has the same nutrients as synthetic fertilizer. Today we just flush it.',
  },
];

const JOURNEY = [
  {
    img: ASSETS.ex4,
    step: '01',
    tag: 'COLLECT',
    title: 'Pee at the match',
    text: 'Oatly, Malmö FF, Sanitation 360, Malmö Stad and VA Syd collect urine from supporters at Eleda Stadium. Just go as usual.',
  },
  {
    img: ASSETS.ex5,
    step: '02',
    tag: 'TRANSFORM',
    title: 'Dry it, pellet it',
    text: 'Urine is dried in closed containers and blended with by-products from Oatly’s oat drink production → Granurin pellets with lower impact.',
  },
  {
    img: ASSETS.ex6,
    step: '03',
    tag: 'GROW',
    title: 'Back to the field',
    text: 'Pellets are tested for fertilizing everything from oat fields to football pitches. Slow-release, farmer-friendly, circular.',
  },
];

const QUIZ = [
  {
    q: 'Is human pee actually sterile & safe as fertilizer?',
    a: 'Almost. Pee is low-risk, and Granurin is dried + heat-treated, stabilized for nitrogen and cleaned — built for strict farm standards.',
    tag: 'HYGIENE',
  },
  {
    q: 'Why pellets and not just liquid pee in a can?',
    a: 'Scale + logistics. Liquid needs giant tanks & trucks. Dried pellets concentrate N-P-K, store easy, and fit the spreaders farmers already own.',
    tag: 'SCALE',
  },
  {
    q: 'Does it really help the Baltic Sea?',
    a: 'Yes. Catching nutrients before the treatment plant means less nitrogen + phosphorus causing eutrophication in lakes, seas and waterways.',
    tag: 'PLANET',
  },
];

const MATCH_META = [
  { img: ASSETS.match1, alt: 'MFF vs. VSK', fixture: 'MFF vs VSK', litres: 48, note: 'Season opener. Full bladders.' },
  { img: ASSETS.match2, alt: 'MFF vs. HBK', fixture: 'MFF vs HBK', litres: 52, note: 'Derby day record.' },
  { img: ASSETS.match3, alt: 'Malmö FF vs IFK Göteborg', fixture: 'MFF vs IFK Göteborg', litres: 47, note: 'Rainy night, still donated.' },
  { img: ASSETS.match4, alt: 'Malmö FF vs IF Elfsborg', fixture: 'MFF vs Elfsborg', litres: 51, note: 'Closing push to 198L.' },
];

const CHAPTERS = [
  {
    id: 'why',
    no: '01',
    kicker: 'The problem',
    title: 'Fertilizer feeds us, but warms the planet',
    takeaway: 'Making synthetic fertilizer emits 1.3B tonnes CO₂e a year — more than aviation.',
    read: '1 min',
    img: ASSETS.ex1,
    imgAlt: 'Illustration of the fertilizer emissions problem',
    body: [
      'We need fertilizer to grow enough food. But today it is mostly made with fossil fuels, which creates a lot of greenhouse gases.',
      'Nitrogen helps plants grow. Making it in factories emits over 1.13 billion tonnes of CO₂e yearly — about 23% more than all airplanes combined.',
    ],
  },
  {
    id: 'resource',
    no: '02',
    kicker: 'The resource',
    title: 'Pee is not waste. It is fertilizer.',
    takeaway: 'Urine has almost the same nutrients as synthetic fertilizer. We just flush it away.',
    read: '1 min',
    img: ASSETS.ex3,
    imgAlt: 'Illustration of urine as a resource',
    body: [
      'Treatment plants clean our water, but extra nutrients still flow into oceans and cause over-fertilization.',
      'If we recycle pee, we pollute less and grow more — at the same time. Sweden is testing this for two years.',
    ],
  },
  {
    id: 'science',
    no: '03',
    kicker: 'The project',
    title: 'Pee for the Planet, in simple words',
    takeaway: 'Can pee safely replace up to 30% of Sweden’s fertilizer? That is the question.',
    read: '1 min',
    img: ASSETS.ex2,
    imgAlt: 'Illustration of the research project',
    body: [
      'Formas funds this 2-year project. SLU, Oatly, Sanitation 360 and Malmö FF ask: can human urine become a safe, circular fertilizer?',
      'Plan is simple: use less fertilizer with healthy soil, and replace what is left with local, circular pee fertilizer.',
    ],
  },
  {
    id: 'stadium',
    no: '04',
    kicker: 'The stadium',
    title: '11 urinals at Eleda Stadium',
    takeaway: 'Fans just pee as usual. We collect it. Goal: 1000 litres.',
    read: '1 min',
    img: ASSETS.ex4,
    imgAlt: 'Illustration of collecting pee at the stadium',
    body: [
      'A full football arena is perfect for testing. If peecycling works here, it can work anywhere.',
      'Allsvenskan 2026: 11 urinals + 1 unisex loo inside, 4 mobile urinals outside. A safe stabilizer keeps nitrogen in. Every drop counts.',
    ],
  },
  {
    id: 'pellet',
    no: '05',
    kicker: 'The pellet',
    title: 'From pee to Granurin pellets',
    takeaway: 'Dried pee + oat leftovers = dry, odourless pellets farmers already know how to use.',
    read: '1 min',
    img: ASSETS.ex5,
    imgAlt: 'Illustration of Granurin fertilizer pellets',
    body: [
      'People used urine as fertilizer in ancient China and Rome. Now SLU + Sanitation360 make it modern and safe.',
      'We dry the pee, mix it with Oatly oat leftovers, and press Granurin pellets. Slow-release, easy to store, good for oats, veggies and pitches — and kinder to the Baltic Sea.',
    ],
  },
  {
    id: 'liquid',
    no: '06',
    kicker: 'Why pellets?',
    title: 'Why not just liquid pee?',
    takeaway: 'Pellets are compact, clean and fit farm machines. Liquid does not.',
    read: '1 min',
    img: ASSETS.ex6,
    imgAlt: 'Illustration comparing pellets and liquid',
    body: [
      'Scale: liquid needs huge tanks and trucks. Dried pellets are small and easy to move.',
      'Hygiene + habit: heat-treated pellets meet farm rules, and farmers already own spreaders for granules. Same N-P-K power, none of the hassle.',
    ],
  },
  {
    id: 'season',
    no: '07',
    kicker: 'Field trials',
    title: 'From matchday to harvest',
    takeaway: '~15% nitrogen, plant-ready, no ick factor.',
    read: '1 min',
    img: ASSETS.goal,
    imgAlt: 'Illustration of a goal — field trials',
    body: [
      'After the season, SLU tests Granurin in fields: nitrogen, phosphorus, potassium, stability, yield.',
      'Result so far: ~15% nitrogen, water-soluble, works like mineral fertilizer — but circular. Dry, odourless, safe.',
    ],
  },
  {
    id: 'oatly',
    no: '08',
    kicker: 'Why Oatly?',
    title: 'Less import, healthier soil',
    takeaway: 'Local pee = stronger food, cleaner Baltic, happier soil.',
    read: '1 min',
    img: null,
    imgAlt: '',
    body: [
      'Oatly wants food that stays inside planet limits. Our FARM program helps farmers use less fertilizer and build soil health.',
      'Made in Malmö, with Swedish partners. Less import, less eutrophication, more food security. A true piss project — proudly.',
    ],
  },
];

function useCountUp(target, active, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

function FunFactTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % FUN_FACTS.length), 3800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="pee-ticker" role="status" aria-live="polite">
      <span className="pee-ticker__dot" aria-hidden="true" />
      <AnimatePresence mode="wait">
        <motion.p
          key={i}
          className="pee-ticker__text"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          {FUN_FACTS[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function PeeOMeter() {
  const BASE = 198;
  const GOAL = 1000;
  const [extra, setExtra] = useState(0);
  const [splashes, setSplashes] = useState([]);
  const [celebrate, setCelebrate] = useState(false);
  const total = BASE + extra;
  const pct = Math.min(100, (total / GOAL) * 100);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const shown = useCountUp(total, true);

  const addDrop = () => {
    const id = Date.now() + Math.random();
    const x = 10 + Math.random() * 80;
    setSplashes((s) => [...s.slice(-8), { id, x }]);
    setExtra((e) => e + 5);
    setCelebrate(true);
    setTimeout(() => setCelebrate(false), 900);
    setTimeout(() => setSplashes((s) => s.filter((d) => d.id !== id)), 1100);
  };

  return (
    <div ref={ref} className="pee-meter2" id="meter">
      <div className="pee-meter2__head">
        <p className="pee-kicker">● LIVE FROM ELEDA STADIUM</p>
        <h2 className="pee-meter2__title">
          The Pee-O-Meter <span aria-hidden="true">🚽</span>
        </h2>
        <p className="pee-meter2__sub">
          Goal: <strong>{GOAL.toLocaleString()} litres</strong> of supporter pee. Every match fills the tank.
          Tap the button — add your (imaginary) drop.
        </p>
      </div>

      <div className="pee-tankwrap">
        <div className="pee-tank" role="img" aria-label={`Pee-O-Meter at ${total} of ${GOAL} litres`}>
          <div className="pee-tank__glass">
            <motion.div
              className="pee-tank__liquid"
              initial={{ height: '4%' }}
              animate={inView ? { height: `${Math.max(6, pct)}%` } : {}}
              transition={{ duration: 1.4, ease: EASE_OUT }}
            >
              <span className="pee-tank__wave" aria-hidden="true" />
              <span className="pee-bubble pee-bubble--1" aria-hidden="true" />
              <span className="pee-bubble pee-bubble--2" aria-hidden="true" />
              <span className="pee-bubble pee-bubble--3" aria-hidden="true" />
              <span className="pee-bubble pee-bubble--4" aria-hidden="true" />
            </motion.div>
            {splashes.map((s) => (
              <motion.span
                key={s.id}
                className="pee-drop"
                style={{ left: `${s.x}%` }}
                initial={{ top: -10, opacity: 1, scale: 0.6 }}
                animate={{ top: '70%', opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.9, ease: 'easeIn' }}
                aria-hidden="true"
              >
                💧
              </motion.span>
            ))}
          </div>
          <div className="pee-tank__ticks" aria-hidden="true">
            {[100, 75, 50, 25].map((t) => (
              <span key={t}>
                <i />{t}%
              </span>
            ))}
          </div>
        </div>

        <div className="pee-meter2__side">
          <p className="pee-meter2__litres">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={total}
                initial={{ y: 14, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -14, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {shown.toLocaleString()}L
              </motion.span>
            </AnimatePresence>
          </p>
          <p className="pee-meter2__pct">{pct.toFixed(1)}% to goal</p>
          <div className="pee-progress" aria-hidden="true">
            <motion.div
              className="pee-progress__fill"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            />
          </div>
          <button type="button" className="pee-btn pee-btn--big" onClick={addDrop}>
            <span aria-hidden="true">💧</span> Donate a drop +5L
          </button>
          <p className="pee-meter2__hint">No real pee required. Just vibes. {extra > 0 && `You added ${extra}L — legend.`}</p>
          <a href="#results" className="pee-meter2__link">
            See match-by-match results ↓
          </a>
        </div>
      </div>

      <AnimatePresence>
        {celebrate && (
          <motion.p
            className="pee-splash-word"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1.1, y: -8 }}
            exit={{ opacity: 0, scale: 0.9 }}
            aria-hidden="true"
          >
            SPLASH! 💦
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlipCard({ item, index }) {
  return (
    <article className="pee-qa">
      <p className="pee-qa__tag">{item.tag} · 0{index + 1}</p>
      <h3 className="pee-qa__q">{item.q}</h3>
      <p className="pee-qa__a">{item.a}</p>
    </article>
  );
}

/* ─── BOOK READER: story as turning pages ────────────────────────────────
   One chapter = one page. Turn with edge arrows, dots, keyboard or swipe.
   Page-flip animation via framer-motion (slide + rotateY in perspective). */
const bookVariants = {
  enter: (d) => ({ opacity: 0, x: d >= 0 ? 140 : -140, rotateY: d >= 0 ? 22 : -22 }),
  center: { opacity: 1, x: 0, rotateY: 0 },
  exit: (d) => ({ opacity: 0, x: d >= 0 ? -140 : 140, rotateY: d >= 0 ? -22 : 22 }),
};

function BookReader({ chapters }) {
  const total = chapters.length;
  const [[page, direction], setPage] = useState([0, 0]);
  const [readIds, setReadIds] = useState(() => new Set([chapters[0].id]));
  const c = chapters[page];

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(total - 1, i));
    setPage(([prev]) => [clamped, clamped === prev ? 0 : clamped > prev ? 1 : -1]);
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(chapters[clamped].id);
      return next;
    });
  };
  const next = () => goTo(page + 1);
  const prev = () => goTo(page - 1);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div className="pee-bookwrap">
      <div className="pee-book" role="region" aria-label="Story book" aria-roledescription="book">
        <span className="pee-book__bookmark" aria-hidden="true" />
        <div className="pee-book__topbar">
          <span className="pee-book__brand">📖 The Pee Chronicles</span>
          <span className="pee-book__count" aria-live="polite">
            Page {String(page + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        <div className="pee-book__viewport">
          <button
            type="button"
            className="pee-book__edge pee-book__edge--left"
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous page"
          >
            <span aria-hidden="true">‹</span>
          </button>

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.article
              key={page}
              className="pee-book__page"
              custom={direction}
              variants={bookVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: EASE_OUT }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.55}
              onDragEnd={(e, info) => {
                if (info.offset.x < -90 && page < total - 1) next();
                else if (info.offset.x > 90 && page > 0) prev();
              }}
              aria-label={`Page ${page + 1} of ${total}: ${c.title}`}
            >
              {c.img && (
                <div className="pee-book__art">
                  <img src={c.img} alt={c.imgAlt || c.title} draggable={false} />
                </div>
              )}
              <p className="pee-book__kicker">
                Chapter {c.no} · {c.kicker} · {c.read}
              </p>
              <h3 className="pee-book__title">{c.title}</h3>
              <p className="pee-book__lede">{c.takeaway}</p>
              {c.body.map((p, i) => (
                <p key={i} className="pee-book__text">{p}</p>
              ))}
              <p className="pee-book__folio" aria-hidden="true">
                — {c.no} —
              </p>
            </motion.article>
          </AnimatePresence>

          <button
            type="button"
            className="pee-book__edge pee-book__edge--right"
            onClick={next}
            disabled={page === total - 1}
            aria-label="Next page"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        <div className="pee-book__footer">
          <div className="pee-book__trail" role="tablist" aria-label="Pages">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                role="tab"
                aria-selected={i === page}
                aria-label={`Go to page ${i + 1}: ${ch.title}`}
                title={ch.title}
                className={`pee-book__drop${i === page ? ' is-now' : ''}${readIds.has(ch.id) ? ' is-read' : ''}`}
                onClick={() => goTo(i)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <p className="pee-book__chap" aria-live="polite">{c.no} · {c.kicker}</p>
        </div>
      </div>
      <p className="pee-book__hint" aria-hidden="true">Tip: arrow keys ← → or swipe also turn pages</p>
    </div>
  );
}

export default function PeeForPlanetPage() {
  const [pledged, setPledged] = useState(1284);
  const [hasPledged, setHasPledged] = useState(false);
  const heroStats = useMemo(
    () => [
      { n: '1000L', l: 'pee collection goal' },
      { n: '30%', l: 'fertilizer Sweden could swap' },
      { n: '15%', l: 'nitrogen in Granurin' },
      { n: '11+4', l: 'urinals at Eleda' },
    ],
    []
  );

  return (
    <div className="pee2">
      <SEO
        title="Pee for the Planet: Human Urine as Fertilizer"
        description="Oatly, Malmö FF, SLU and Sanitation360 are testing whether human urine can replace fossil-based fertilizer. Meet the Pee for the Planet research project."
        pathname="/things-we-do/initiatives/pee-for-the-planet"
      />

      {/* ═══ HERO ═══ */}
      <header className="pee2-hero">
        <div className="pee2-hero__blobs" aria-hidden="true">
          <span className="blob blob--a" />
          <span className="blob blob--b" />
          <span className="blob blob--c" />
        </div>
        <div className="pee2-drops" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className={`fdrop fdrop--${(i % 5) + 1}`}>💧</span>
          ))}
        </div>

        <div className="pee2-hero__inner">
          <motion.p
            className="pee-pill"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            ✳ A FORMAS-FUNDED SCIENCE PROJECT ✳ MFF × OATLY × SLU
          </motion.p>

          <motion.img
            src={ASSETS.logo}
            alt="A toilet paper roll formed into a banner scarf with the text Pee for the Planet"
            className="pee2-logo"
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
          />
          <motion.img
            src={ASSETS.tagline}
            alt="Your pee. The fertilizer of the future."
            className="pee2-tagline"
            initial={{ opacity: 0, y: 20, rotate: 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
          />

          <motion.p
            className="pee2-funded"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT }}
          >
            Initiated by Oatly, <a href="https://www.mff.se/">Malmö FF</a>,{' '}
            <a href="https://sanitation360.se/">Sanitation 360</a> and{' '}
            <a href="https://www.slu.se/">SLU</a>, with{' '}
            <a href="https://malmo.se/">City of Malmö</a> +{' '}
            <a href="https://www.vasyd.se/">VA Syd</a>.
          </motion.p>

          <div className="pee2-ctas">
            <a href="#meter" className="pee-btn pee-btn--dark">Check the Pee-O-Meter ↓</a>
            <a href="#how" className="pee-btn pee-btn--light">How peecycling works</a>
          </div>

          <FunFactTicker />

          <div className="pee2-stats">
            {heroStats.map((s, i) => (
              <motion.div
                key={s.l}
                className="pee2-stat"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
              >
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </motion.div>
            ))}
          </div>

          <picture>
            <source media="(max-width: 700px)" srcSet={ASSETS.sponsorsMobile} />
            <img
              src={ASSETS.sponsors}
              alt="Vasyd, Sanitation 360, Malmö FF, Oatly, Malmö Stad, SLU, Formas"
              className="pee2-sponsors"
              loading="lazy"
            />
          </picture>
        </div>

        <div className="pee2-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none"><path d="M0,40 C240,90 480,0 720,35 C960,70 1200,10 1440,45 L1440,90 L0,90 Z" /></svg>
        </div>
      </header>

      {/* ═══ MARQUEE ═══ */}
      <div className="pee-marquee" aria-hidden="true">
        <div className="pee-marquee__track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              YOUR PEE ✦ THE FERTILIZER OF THE FUTURE ✦ SAVE THE BALTIC ✦ GO MFF ✦&nbsp;
              YOUR PEE ✦ THE FERTILIZER OF THE FUTURE ✦ SAVE THE BALTIC ✦ GO MFF ✦&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="pee2-wrap">
        <PeeOMeter />

        {/* ═══ PROBLEM ═══ */}
        <section className="pee-dark" aria-label="A problem">
          <Reveal><p className="pee-kicker pee-kicker--yellow">01 — The problem in 30 seconds</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="pee-h2">Fertilizer works. But it costs the planet.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="pee-lead">3 short facts. That is all you need.</p>
          </Reveal>
          <div className="pee-cards">
            {PROBLEM.map((item, i) => (
              <motion.article
                key={item.title}
                className="pee-card"
                initial={{ opacity: 0, y: 34, rotate: i === 1 ? 1.5 : i === 2 ? -1.5 : 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: EASE_OUT }}
                whileHover={{ y: -8, rotate: i === 0 ? -1 : 1 }}
              >
                <ResponsiveImage src={item.img} alt={item.alt} className="pee-card__img" />
                <p className="pee-card__stat">{item.stat}<span>{item.unit}</span></p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ═══ JOURNEY ═══ */}
        <section className="pee-how" id="how" aria-label="A solution">
          <Reveal><p className="pee-kicker">02 — The solution in 3 steps</p></Reveal>
          <Reveal delay={0.05}>
            <h2 className="pee-h2 pee-h2--navy">Pee → pellet → field</h2>
          </Reveal>
          <p className="pee-lead">No behaviour change. Just pee as usual.</p>
          <div className="pee-timeline">
            <span className="pee-timeline__line" aria-hidden="true" />
            {JOURNEY.map((j, i) => (
              <motion.div
                key={j.step}
                className={`pee-tstep${i % 2 ? ' is-right' : ''}`}
                initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
              >
                <span className="pee-tstep__dot" aria-hidden="true">{j.step}</span>
                <div className="pee-tstep__card">
                  <span className="pee-tstep__tag">{j.tag}</span>
                  <ResponsiveImage src={j.img} alt={j.title} className="pee-tstep__img" />
                  <h3>{j.title}</h3>
                  <p>{j.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ═══ WIN-WIN ═══ */}
        <section className="pee-win">
          <div className="pee-win__text">
            <Reveal><p className="pee-kicker">03 — A TOTAL WIN-WIN</p></Reveal>
            <Reveal delay={0.05}><h2 className="pee-h2 pee-h2--navy">Everyone wins. Even the Baltic.</h2></Reveal>
            <Reveal delay={0.1}>
              <p className="pee-lead pee-lead--left">
                Show the world how nutrient-rich ordinary urine is as circular fertilizer.
                Less synthetic dependence. Less eutrophication. More self-sufficiency.
              </p>
            </Reveal>
            <ul className="pee-checks">
              {[
                ['🌱', 'Healthier soil + stable yields'],
                ['💧', 'Cleaner lakes, seas & waterways'],
                ['♻️', 'Circular nutrients, less import'],
                ['⚽', 'Football pitches included'],
              ].map(([e, t], i) => (
                <Reveal key={t} delay={i * 0.06}>
                  <li><span aria-hidden="true">{e}</span> {t}</li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.2}><p className="pee-win__punch">How smart is that? → Very.</p></Reveal>
          </div>
          <Reveal delay={0.12} className="pee-win__art">
            <motion.img
              src={ASSETS.goal}
              alt="A leg kicking a football into a goal"
              className="pee-win__img"
              loading="lazy"
              animate={{ y: [0, -10, 0], rotate: [0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p className="pee-win__cap">GOOOAL for circular fertilizer ⚽</p>
          </Reveal>
        </section>

        {/* ═══ QUIZ ═══ */}
        <section className="pee-quiz" aria-label="Myths and facts">
          <Reveal><p className="pee-kicker">Good to know</p></Reveal>
          <Reveal delay={0.05}><h2 className="pee-h2">3 questions, 3 short answers</h2></Reveal>
          <div className="pee-flips">
            {QUIZ.map((q, i) => (
              <Reveal key={q.q} delay={i * 0.08}>
                <FlipCard item={q} index={i} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══ RESULTS ═══ */}
        <section className="pee-results" id="results" aria-label="Results">
          <Reveal><p className="pee-kicker">04 — RESULTS, MATCH BY MATCH</p></Reveal>
          <Reveal delay={0.05}><h2 className="pee-h2 pee-h2--navy">The stadium delivers</h2></Reveal>
          <div className="pee-matchgrid">
            {MATCH_META.map((m, i) => (
              <motion.article
                key={m.img}
                className="pee-matchcard"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE_OUT }}
                whileHover={{ y: -6 }}
              >
                <div className="pee-matchcard__imgwrap">
                  <ResponsiveImage src={m.img} alt={m.alt} className="pee-matchcard__img" />
                  <span className="pee-matchcard__litres">💧 {m.litres}L</span>
                </div>
                <div className="pee-matchcard__meta">
                  <h3>{m.fixture}</h3>
                  <p>{m.note}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <Reveal>
            <div className="pee-totalbar">
              <strong>Total so far: 198L / 1000L</strong>
              <span>19.8% — the tank is warming up. Next home game = next flush of data.</span>
            </div>
          </Reveal>
        </section>

        {/* ═══ STORY BOOK ═══ */}
        <section className="pee-story" aria-label="Full story">
          <div className="pee-story__top">
            <Reveal><p className="pee-kicker">The full story — a tiny book</p></Reveal>
            <Reveal delay={0.05}>
              <h2 className="pee-h2 pee-h2--navy">Pee pages, turn slowly</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="pee-lead">
                8 little pages with pictures. Turn one by one — like a book.
              </p>
            </Reveal>
            <div className="pee-tldr">
              <strong>TL;DR</strong>
              <span>Fertilizer pollutes → pee has the same nutrients → we collect it at matches → make dry pellets → grow oats. Simple.</span>
            </div>
          </div>
          <BookReader chapters={CHAPTERS} />
          <p className="pee-story__src">
            Sources & partners: <a href="https://formas.se/">Formas</a> ·{' '}
            <a href="https://www.slu.se/">SLU</a> · <a href="https://sanitation360.se/">Sanitation 360</a> ·{' '}
            <a href="https://www.mff.se/">Malmö FF</a> · <a href="https://malmo.se/">City of Malmö</a> ·{' '}
            <a href="https://www.vasyd.se/">VA Syd</a> ·{' '}
            <a href="https://investors.oatly.com/static-files/ff1da040-3e10-4792-9bd0-16ddb2ef6147">Sustainability Update 2025</a>
          </p>
        </section>

        {/* ═══ PLEDGE ═══ */}
        <section className="pee-pledge" aria-label="Pledge">
          <motion.div
            className="pee-pledge__card"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <p className="pee-kicker pee-kicker--yellow">JOIN {pledged.toLocaleString()} PLANET-PEERS</p>
            <h2>Ready to take the piss <em>seriously?</em></h2>
            <p>Take the pledge: waste less, recirculate more, and tell one friend that pee is fertilizer.</p>
            <div className="pee-pledge__row">
              <button
                type="button"
                className="pee-btn pee-btn--yellow"
                disabled={hasPledged}
                onClick={() => {
                  if (!hasPledged) {
                    setPledged((p) => p + 1);
                    setHasPledged(true);
                  }
                }}
              >
                {hasPledged ? '✓ Pledged. Legend.' : '💧 I pledge my pee'}
              </button>
              <a
                className="pee-btn pee-btn--ghost"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('My pee could fertilize oat fields?! Pee for the Planet 🚽🌱')}&url=${encodeURIComponent('https://oatly.com/things-we-do/initiatives/pee-for-the-planet')}`}
                target="_blank"
                rel="noreferrer"
              >
                Share ↗
              </a>
            </div>
            <AnimatePresence>
              {hasPledged && (
                <motion.p
                  className="pee-pledge__thanks"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Welcome to the peecycling squad. Eleda Stadium salutes you. ⚽💦
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
