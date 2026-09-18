import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApiData } from '../hooks/useApiData.js';
import NewsModel from '../models/newsModel.js';
import SEO from '../components/SEO';
import ResponsiveImage from '../components/ResponsiveImage';
import StoriesHeading from '../assets/oatly/heading-stories.svg';
import InitiativesHeading from '../assets/oatly/heading-initiatives.svg';
import BrainwashingHeading from '../assets/oatly/heading-brainwashing.svg';
import '../styles/ThingsWeDo.css';

/* ==========================================================================
   THINGS WE DO — faithful replica of oatly.com/things-we-do
    Layout (matches live reference):
      • the global header breadcrumb beside Home shows the current page/section
      • an accessible, visually hidden h1 preserves the page title
      • centered filter nav  Everything | Stories | Initiatives | Brainwashing
       (2px bottom-underline on active + hover; adapts to URL route)
      • FEATURED article (root only): full-width card, image above a two-column
        title (Toni Noveau, uppercase) beside excerpt + meta
      • STICKY article (root only): large left card stays fixed beside a taller
        scrolling six-card sidebar, then releases after that sidebar
      • category pages: side-by-side wordmark/intro header, then three-up cards
      • all grids turn two-row newspaper pages (6 desktop / 2 mobile), page-flip
      • remaining root articles: clean 2-up grid, image → title → excerpt → meta
        ("category • date"), hand-drawn wavy edges masks on all images
   Fonts: Margo Pro (body/meta) + Toni Noveau Pro (titles) — bundled locally.
   ========================================================================== */

const FILTERS = [
  { label: 'Everything', slug: '', path: '/things-we-do', end: true },
  { label: 'Stories', slug: 'stories', path: '/things-we-do/stories' },
  { label: 'Initiatives', slug: 'initiatives', path: '/things-we-do/initiatives' },
  { label: 'Brainwashing', slug: 'brainwashing', path: '/things-we-do/brainwashing' },
];

// Slug → category, matching oatly.com's own grouping of these stories.
const SLUG_CATEGORY = {
  // initiatives (oatly.com/things-we-do/initiatives)
  aftertaste: 'initiatives',
  'pee-for-the-planet': 'initiatives',
  'oatly-x-avavav': 'initiatives',
  'future-of-taste': 'initiatives',
  'ef-pro-cycling': 'initiatives',
  'the-sca-outdated-rule': 'initiatives',
  babelsberg: 'initiatives',
  'turning-oat-residue-into-renewable-energy': 'initiatives',
  schoolmilk: 'initiatives',
  'silent-barista': 'initiatives',
  'the-race-to-grow-the-world-s-greatest-oat': 'initiatives',
  'farmer-seeking-farmer': 'initiatives',
  'stop-plant-based-censorship': 'initiatives',
  'hey-food-industry': 'initiatives',
  'resurrecting-oats-in-the-us': 'initiatives',
  // stories (full live order from oatly.com/things-we-do/stories)
  'how-do-you-say-f-a-r-m-in-canadian': 'stories',
  'oatly-runs-the-brooklyn-half-marathon': 'stories',
  'last-first-dates': 'stories',
  'tastes-like-miami': 'stories',
  'bring-oatly-to-your-campus': 'stories',
  'oatly-crash-capitol-hill-ice-cream-party': 'stories',
  'the-giant-oatly-carton': 'stories',
  'oatly-does-the-golden-spurtle': 'stories',
  'caroline-schiff-cooks-with-oatly': 'stories',
  'the-oatly-dragster': 'stories',
  'the-farm': 'stories',
  'the-mysteries-locked-inside-nordic-seed-vaults': 'stories',
  'dairy-free-at-the-berlinale': 'stories',
  'everything-you-want-to-know-about-oatlys-secret-lab-in-philadelphia': 'stories',
  'lunch-with-al': 'stories',
  'long-ago-horses-were-tractors-and-oats-were-gas': 'stories',
  'what-we-learned-at-cop-27-and-what-we-didnt': 'stories',
  'when-an-oat-latte-is-illegal': 'stories',
  'design-by-bulent': 'stories',
  boatly: 'stories',
  'berte-qvarn': 'stories',
  'state-of-denial': 'stories',
  'least-relevant-comments': 'stories',
  'does-this-scot-know-oats-best': 'stories',
  'shove-your-vegan-burgers-up-your-arse': 'stories',
  otley: 'stories',
  teareport: 'stories',
  'oatly-lake': 'stories',
  'project-fearless': 'stories',
  'hey-barista': 'stories',
  'black-queer-travel-guide': 'stories',
  'project-hiu': 'stories',
  'tiny-pop-up-munich': 'stories',
  'james-cahill-bruno-lacey-climate-change-the-game': 'stories',
  'for-purpose-jobs': 'stories',
  akuko: 'stories',
  'the-activist-grannies-helsinki': 'stories',
  'nordic-ocean-watch-norway': 'stories',
  'kimberly-renee-food-love': 'stories',
  'turn-and-flow-london': 'stories',
  'soap-for-a-cause-spokane-washington': 'stories',
  'labyrinth-kindermuseum-berlin': 'stories',
  grim: 'stories',
  'hart-club': 'stories',
  'harris-edelman-ombligo-usa': 'stories',
  depcb: 'stories',
  'turning-tables': 'stories',
  'wildlife-biologist': 'stories',
  'hej-hej-mats': 'stories',
  adapt: 'stories',
  'sunt-banana-bread': 'stories',
  'bee-protector': 'stories',
  'hopeful-traders': 'stories',
  // brainwashing (oatly.com/things-we-do/brainwashing)
  nespresso: 'brainwashing',
  'blind-test': 'brainwashing',
  malibu: 'brainwashing',
  'oatgurt-tour-2024': 'brainwashing',
  'wisconsin-supper-club-swaps-dairy-with-oatly': 'brainwashing',
  'louisiana-diner-swaps-dairy-with-oatly': 'brainwashing',
  'will-it-swap': 'brainwashing',
  'milk-myths': 'brainwashing',
  'help-dad': 'brainwashing',
  odds: 'brainwashing',
  'ditch-milk': 'brainwashing',
  'google-milk': 'brainwashing',
};

// Sub-index page header (per category), mirroring ThingsPageSubIndex on
// oatly.com: an SVG wordmark heading + intro paragraph under the filter nav.
const CATEGORY_HEADERS = {
  stories: {
    label: 'Stories',
    heading: StoriesHeading,
    intro:
      "There's only so many weird and interesting stories we can tell on the side of an Oatly package, so we carved out a little space for updates on the work we're doing and the issues we care about.",
  },
  initiatives: {
    label: 'Initiatives',
    heading: InitiativesHeading,
    intro:
      "\u201cWe only do oats\u201d is a fun little slogan we say around the office, but it's not 100% true. A lot of the time we're committing ourselves to projects that go way beyond making and selling oats.",
  },
  brainwashing: {
    label: 'Brainwashing',
    heading: BrainwashingHeading,
    intro:
      "You've probably seen these adverts plastered all over your city or television and thought, \u201cI can't tell if I hate these or love these, but I'm intrigued by this oat stuff they speak of.\u201d Well, that's sort of what we were going for.",
  },
};

// Display order for category pages (keeps each category's live grouping/order).
const DISPLAY_ORDER = [
  // initiatives (real site order from oatly.com/things-we-do/initiatives)
  'aftertaste',
  'pee-for-the-planet',
  'oatly-x-avavav',
  'future-of-taste',
  'ef-pro-cycling',
  'the-sca-outdated-rule',
  'babelsberg',
  'turning-oat-residue-into-renewable-energy',
  'schoolmilk',
  'silent-barista',
  'the-race-to-grow-the-world-s-greatest-oat',
  'farmer-seeking-farmer',
  'stop-plant-based-censorship',
  'hey-food-industry',
  'resurrecting-oats-in-the-us',
  // stories (full live order from oatly.com/things-we-do/stories)
  'how-do-you-say-f-a-r-m-in-canadian',
  'oatly-runs-the-brooklyn-half-marathon',
  'last-first-dates',
  'tastes-like-miami',
  'bring-oatly-to-your-campus',
  'oatly-crash-capitol-hill-ice-cream-party',
  'the-giant-oatly-carton',
  'oatly-does-the-golden-spurtle',
  'caroline-schiff-cooks-with-oatly',
  'the-oatly-dragster',
  'the-farm',
  'the-mysteries-locked-inside-nordic-seed-vaults',
  'dairy-free-at-the-berlinale',
  'everything-you-want-to-know-about-oatlys-secret-lab-in-philadelphia',
  'lunch-with-al',
  'long-ago-horses-were-tractors-and-oats-were-gas',
  'what-we-learned-at-cop-27-and-what-we-didnt',
  'when-an-oat-latte-is-illegal',
  'design-by-bulent',
  'boatly',
  'berte-qvarn',
  'state-of-denial',
  'least-relevant-comments',
  'does-this-scot-know-oats-best',
  'shove-your-vegan-burgers-up-your-arse',
  'otley',
  'teareport',
  'oatly-lake',
  'project-fearless',
  'hey-barista',
  'black-queer-travel-guide',
  'project-hiu',
  'tiny-pop-up-munich',
  'james-cahill-bruno-lacey-climate-change-the-game',
  'for-purpose-jobs',
  'akuko',
  'the-activist-grannies-helsinki',
  'nordic-ocean-watch-norway',
  'kimberly-renee-food-love',
  'turn-and-flow-london',
  'soap-for-a-cause-spokane-washington',
  'labyrinth-kindermuseum-berlin',
  'grim',
  'hart-club',
  'harris-edelman-ombligo-usa',
  'depcb',
  'turning-tables',
  'wildlife-biologist',
  'hej-hej-mats',
  'adapt',
  'sunt-banana-bread',
  'bee-protector',
  'hopeful-traders',
  // brainwashing (newest first, per oatly.com/things-we-do/brainwashing)
  'nespresso',
  'blind-test',
  'malibu',
  'oatgurt-tour-2024',
  'wisconsin-supper-club-swaps-dairy-with-oatly',
  'louisiana-diner-swaps-dairy-with-oatly',
  'will-it-swap',
  'milk-myths',
  'help-dad',
  'odds',
  'ditch-milk',
  'google-milk',
];

// Display order for the root "Everything" view. This follows the live
// oatly.com/things-we-do sequence, with the remaining local archive cards
// appended after the live initial feed.
const EVERYTHING_ORDER = [
  'pee-for-the-planet',
  'aftertaste',
  'nespresso',
  'oatly-x-avavav',
  'how-do-you-say-f-a-r-m-in-canadian',
  'future-of-taste',
  'oatly-runs-the-brooklyn-half-marathon',
  'last-first-dates',
  'tastes-like-miami',
  'blind-test',
  'ef-pro-cycling',
  'bring-oatly-to-your-campus',
  'malibu',
  'oatly-crash-capitol-hill-ice-cream-party',
  'oatgurt-tour-2024',
  'the-giant-oatly-carton',
  'oatly-does-the-golden-spurtle',
  'wisconsin-supper-club-swaps-dairy-with-oatly',
  'caroline-schiff-cooks-with-oatly',
  'the-oatly-dragster',
  'louisiana-diner-swaps-dairy-with-oatly',
  'the-farm',
  'the-mysteries-locked-inside-nordic-seed-vaults',
  'dairy-free-at-the-berlinale',
  'everything-you-want-to-know-about-oatlys-secret-lab-in-philadelphia',
  'lunch-with-al',
  'long-ago-horses-were-tractors-and-oats-were-gas',
  'what-we-learned-at-cop-27-and-what-we-didnt',
  'when-an-oat-latte-is-illegal',
  'design-by-bulent',
  'boatly',
  'berte-qvarn',
  'state-of-denial',
  'least-relevant-comments',
  'does-this-scot-know-oats-best',
  'shove-your-vegan-burgers-up-your-arse',
  'otley',
  'teareport',
  'oatly-lake',
  'project-fearless',
  'hey-barista',
  'black-queer-travel-guide',
  'project-hiu',
  'tiny-pop-up-munich',
  'james-cahill-bruno-lacey-climate-change-the-game',
  'for-purpose-jobs',
  'akuko',
  'the-activist-grannies-helsinki',
  'nordic-ocean-watch-norway',
  'kimberly-renee-food-love',
  'turn-and-flow-london',
  'soap-for-a-cause-spokane-washington',
  'labyrinth-kindermuseum-berlin',
  'grim',
  'hart-club',
  'harris-edelman-ombligo-usa',
  'depcb',
  'turning-tables',
  'wildlife-biologist',
  'hej-hej-mats',
  'adapt',
  'sunt-banana-bread',
  'bee-protector',
  'hopeful-traders',
  'the-sca-outdated-rule',
  'babelsberg',
  'turning-oat-residue-into-renewable-energy',
  'schoolmilk',
  'silent-barista',
  'the-race-to-grow-the-world-s-greatest-oat',
  'farmer-seeking-farmer',
  'stop-plant-based-censorship',
  'hey-food-industry',
  'resurrecting-oats-in-the-us',
  'will-it-swap',
  'milk-myths',
  'help-dad',
  'odds',
  'ditch-milk',
  'google-milk',
];

// Newspaper-style pagination: two fully-visible rows per page, turned like
// pages — six articles on desktop 3-up grids, two on mobile 2-up grids.
const DESKTOP_PAGE_SIZE = 6;
const MOBILE_PAGE_SIZE = 2;

// Real Oatly assets where available (closest to the live reference).
const IMAGE_OVERRIDES = {
  'tastes-like-miami':
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=75',
};

function decorateCard(catalog, key) {
  const item = catalog.get(key);
  if (!item) return null;
  const category =
    SLUG_CATEGORY[key] || (item.type || item.category || '').toLowerCase() || 'stories';
  return {
    ...item,
    slug: key,
    image: IMAGE_OVERRIDES[key] || item.image,
    category,
  };
}

function Card({ item, featured, onSelect, imageWidths, imageSizes, priority = false }) {
  return (
    <article
      className={`twd__card${featured ? ' twd__card--featured' : ''}`}
      onClick={() => onSelect(item)}
    >
      <figure className="twd__card-media">
        {item.image ? (
          <ResponsiveImage
            src={item.image}
            alt={item.title}
            className="twd__card-img"
            widths={imageWidths}
            sizes={imageSizes}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
          />
        ) : (
          <div className="twd__card-placeholder" />
        )}
      </figure>
      <div className={`twd__card-text${featured ? ' twd__card-text--cols' : ''}`}>
        <h3 className="twd__card-title">{item.title}</h3>
        <div className="twd__card-info">
          <p className="twd__card-excerpt">{item.excerpt}</p>
          <p className="twd__card-meta">
            {item.category} <span aria-hidden="true">•</span> {item.date}
          </p>
        </div>
      </div>
    </article>
  );
}

// Newspaper-style paged grid: scrolling turns the pages like newspaper
// sheets, with the same page-flip transition. Every page holds exactly two
// fully-visible rows with breathing room above and below. The LAST page is
// rendered statically right above the footer, so a short final page never
// leaves dead scroll space behind it.
function PagedGrid({ items, onSelect }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  );
  const trackRef = useRef(null);
  const pageRef = useRef(0);
  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  // Pinned (flipping) pages exclude the last one, which sits statically below.
  const pinnedCount = Math.max(1, pageCount - 1);
  const safePage = Math.min(page, pinnedCount - 1);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || pageCount <= 1) return;
    const scroller = document.querySelector('[data-app-scroll]');
    let raf = 0;
    const update = () => {
      raf = 0;
      const host = scroller
        ? scroller.getBoundingClientRect()
        : { top: 0, height: window.innerHeight };
      const rect = track.getBoundingClientRect();
      const total = rect.height - host.height;
      const progress = total > 0 ? (host.top - rect.top) / total : 0;
      const next = Math.max(0, Math.min(pinnedCount - 1, Math.floor(progress * pinnedCount)));
      if (next !== pageRef.current) {
        setDirection(next > pageRef.current ? 1 : -1);
        pageRef.current = next;
        setPage(next);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const target = scroller || window;
    target.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      target.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pageCount, pinnedCount]);

  const renderItems = (list, eager) => (
    <>
      <div className="twd__grid-top">
        {list.slice(0, 3).map((item) => (
          <Card
            key={item.slug}
            item={item}
            onSelect={onSelect}
            imageWidths={[384, 768]}
            imageSizes="(max-width: 767px) 50vw, 368px"
            priority={eager}
          />
        ))}
      </div>
      <div className="twd__grid-bottom">
        {list.slice(3).map((item) => (
          <div key={item.slug} className="twd__grid-cell">
            <Card
              item={item}
              onSelect={onSelect}
              imageWidths={[384, 768]}
              imageSizes="(max-width: 767px) 50vw, 368px"
            />
          </div>
        ))}
      </div>
    </>
  );

  const lastPageItems = items.slice(pinnedCount * pageSize);

  // Single page: static sheet, no scroll track needed.
  if (pageCount <= 1) return renderItems(items.slice(0, pageSize), true);

  return (
    <>
      <div ref={trackRef} className="twd__book" style={{ height: `${pinnedCount * 150}vh` }}>
        <div className="twd__book-sheet">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={safePage}
              custom={direction}
              initial={{ opacity: 0, rotateY: direction >= 0 ? 55 : -55, x: direction >= 0 ? 70 : -70 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: direction >= 0 ? -55 : 55, x: direction >= 0 ? -70 : 70 }}
              transition={{ duration: 0.45, ease: [0.22, 0.9, 0.28, 1] }}
              style={{ transformPerspective: 1400 }}
            >
              {renderItems(items.slice(safePage * pageSize, safePage * pageSize + pageSize), safePage === 0)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* Final page flows statically into the footer — no dead scroll after it. */}
      <div className="twd__book-last">{renderItems(lastPageItems, false)}</div>
    </>
  );
}

export default function ThingsWeDoPage({ onSelectArticle }) {
  // Category routes (/things-we-do/stories|initiatives|brainwashing) are static
  // (no :slug param), so the active category is derived from the pathname.
  const { pathname } = useLocation();
  const activeCategory = FILTERS.find((f) => f.slug && pathname === f.path)?.slug || '';
  const isEverything = activeCategory === '';

  // MODEL (async API) — hooks called unconditionally
  const allNews = useApiData(() => NewsModel.getAllNews(), []);
  const allStories = useApiData(() => NewsModel.getAllStories(), []);


  const bySlug = useMemo(() => {
    const catalog = new Map();
    [allNews, allStories].forEach((arr) =>
      (arr || []).forEach((n) => {
        const key = (n.slug || n.id || '').toLowerCase();
        if (key && !catalog.has(key)) catalog.set(key, n);
      })
    );
    return catalog;
  }, [allNews, allStories]);

  const items = useMemo(
    () => DISPLAY_ORDER.map((key) => decorateCard(bySlug, key)).filter(Boolean),
    [bySlug],
  );
  const everythingItems = useMemo(
    () => EVERYTHING_ORDER.map((key) => decorateCard(bySlug, key)).filter(Boolean),
    [bySlug],
  );

  const visible = isEverything ? everythingItems : items.filter((it) => it.category === activeCategory);
  const featured = isEverything && visible.length ? visible[0] : null;
  const stickyItem = isEverything && visible.length > 1 ? visible[1] : null;
  const stickySideItems = isEverything ? visible.slice(2, 8) : [];
  const gridItems = isEverything ? visible.slice(8) : visible;

  // Loading gate — page renders once both news + stories arrive
  if (!allNews || !allStories) return null;

  return (
    <div className="twd">
      <SEO
        title="Things we do | Oatly"
        description="From urine recycling experiments in Sweden to high-fashion Paris runway shows, read all about what we do when we're not turning oats into drinkable liquid."
        pathname={`/things-we-do${activeCategory ? `/${activeCategory}` : ''}`}
      />

      {/* Accessible page title only — the visible oversized masthead was removed. */}
      <h1 className="twd__sr-only">Things we do</h1>

      {/* ── Filter nav (URL routes; underline on active/hover) ── */}
      <nav className="twd__filter" aria-label="Article categories">
        <ul className="twd__filter-list">
          {FILTERS.map((f) => {
            const isActive = (f.slug === '' && isEverything) || f.slug === activeCategory;
            return (
              <li key={f.label} className={isActive ? 'is-active' : undefined}>
                <NavLink
                  to={f.path}
                  end={f.end}
                  aria-current={isActive ? 'page' : 'false'}
                  className={`twd__filter-link${isActive ? ' twd__filter-link--active' : ''}`}
                >
                  {f.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Sub-index header (category pages, e.g. Stories wordmark) ── */}
      {activeCategory && CATEGORY_HEADERS[activeCategory] && (
        <section className={`twd__subindex twd__subindex--${activeCategory}`}>
          <div className="twd__content">
            <header className="twd__subindex-header">
              <h2 className="twd__subindex-title">
                <span className="twd__sr-only">{CATEGORY_HEADERS[activeCategory].label}</span>
                <img
                  src={CATEGORY_HEADERS[activeCategory].heading}
                  alt=""
                  role="presentation"
                  className="twd__subindex-heading"
                />
              </h2>
              <div className="twd__subindex-intro">
                <p>{CATEGORY_HEADERS[activeCategory].intro}</p>
              </div>
            </header>
          </div>
        </section>
      )}

      {/* ── Featured article (root view only) ── */}
      {featured && (
        <section className="twd__featured">
          <div className="twd__content">
            <Card
              item={featured}
              featured
              onSelect={onSelectArticle}
              imageWidths={[768, 1200, 1600]}
              imageSizes="(max-width: 1248px) 100vw, 1200px"
              priority
            />
          </div>
        </section>
      )}

      {/* ── Sticky feature + scrolling sidebar (root view only) ── */}
      {isEverything && stickyItem && (
        <section className="twd__sticky" aria-label="Featured and latest stories">
          <div className="twd__content twd__sticky-content">
            <div className="twd__sticky-main">
              <div className="twd__sticky-card">
                <Card
                  item={stickyItem}
                  onSelect={onSelectArticle}
                  imageWidths={[768, 1200]}
                  imageSizes="(max-width: 767px) 100vw, 758px"
                />
              </div>
            </div>
            <aside className="twd__sticky-side" aria-label="More Things We Do stories">
              {stickySideItems.map((item) => (
                <Card
                  key={item.slug}
                  item={item}
                  onSelect={onSelectArticle}
                  imageWidths={[384, 768]}
                  imageSizes="(max-width: 767px) 50vw, 358px"
                />
              ))}
            </aside>
          </div>
        </section>
      )}

      {/* ── Remaining cards: newspaper pages, two full rows each ── */}
      <section className="twd__grid twd__grid--category" aria-label="Things we do articles">
        <PagedGrid
          key={isEverything ? 'everything' : activeCategory}
          items={isEverything ? gridItems : visible}
          onSelect={onSelectArticle}
        />
      </section>
    </div>
  );
}