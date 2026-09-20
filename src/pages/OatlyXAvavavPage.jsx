import React from 'react';
import SEO from '../components/SEO';
import ResponsiveImage from '../components/ResponsiveImage';
import '../styles/OatlyXAvavav.css';

/* ==========================================================================
   OATLY x AVAVAV — copy-to-copy of
   oatly.com/things-we-do/initiatives/oatly-x-avavav
   Black editorial, white hairline frames, matcha green #a0cb8a accents.
   All copy + official Storyblok artwork preserved.
   ========================================================================== */

const SB = 'https://a.storyblok.com/f/107921';

const IMG = {
  heroBg: `${SB}/2880x1800/771b8bc8b3/avavav-img.png`,
  heroBgMobile: `${SB}/1080x1920/de7ec3b590/avavav-img-mobile.png`,
  logo: `${SB}/1599x228/971a3c11a7/avavav-x-oatly.svg`,
  og: `${SB}/2715x1528/47ac2c4b52/oatly-x-avavav.webp`,
  all: `${SB}/3362x1662/a9c13850e1/avavav-x-oatly-all.webp`,
  newFashioned: `${SB}/1440x1440/f0299d3376/new-fashioned.webp`,
  lace: `${SB}/1440x1440/afc3e803ba/lace-bottoms-up.webp`,
  jell: `${SB}/720x720/ac7e6243af/jell-oat-shot.webp`,
  g0: `${SB}/4098x2732/287852b09b/avavav-x-oatly.webp`,
  g1: `${SB}/4098x2732/90ff3883a7/avavav-x-oatly-1.webp`,
  g2: `${SB}/4098x2732/7ea8f316bf/avavav-x-oatly-2.webp`,
  g3: `${SB}/4098x2732/86b85aa592/avavav-x-oatly-3.webp`,
  g4: `${SB}/4098x2732/c1ab2748f6/avavav-x-oatly-4.webp`,
  g6: `${SB}/4098x2732/f5142671ac/avavav-x-oatly-6.webp`,
  f1: `${SB}/1080x1350/a6a19a69f0/frame-1.jpg`,
  f2: `${SB}/1081x1350/b3dcef5cd7/frame-2.jpg`,
  f3: `${SB}/1081x1350/dbf273a29e/frame-3.jpg`,
  f4: `${SB}/1081x1350/7e715f8545/frame-4.jpg`,
  f5: `${SB}/1081x1350/bb8da64fb5/frame-5.jpg`,
  aftertaste: `${SB}/1783x1319/ef108b4e13/aftertasteimage.webp`,
  peeRoom: `${SB}/1600x1067/3841b30322/oatly_se_2026_pee-for-the-planet_001-large.jpg`,
};

const GRID14 = [IMG.g1, IMG.g2, IMG.g3, IMG.g4, IMG.g6, IMG.g0, IMG.f1, IMG.f2, IMG.f3, IMG.f4, IMG.f5, IMG.newFashioned, IMG.lace, IMG.jell];

export default function OatlyXAvavavPage() {
  return (
    <div className="avax">
      <SEO
        title="Oatly x AVAVAV | Oatly"
        description="Oatly partners with avant-garde fashion brand AVAVAV to bring bold flavor to the runway, serving signature oat-based drinks at Milan Fashion Week."
        pathname="/things-we-do/initiatives/oatly-x-avavav"
      />

      {/* ═══ HERO — full-bleed collage + centered lockup ═══ */}
      <section className="avax-hero" aria-label="AVAVAV x Oatly hero">
        <picture>
          <source media="(max-width: 700px)" srcSet={IMG.heroBgMobile} />
          <img src={IMG.heroBg} alt="" aria-hidden="true" className="avax-hero__bg" />
        </picture>
        <img src={IMG.logo} alt="AVAVAV x OATOATOATLY" className="avax-hero__logo" />
      </section>

      {/* ═══ AVAVAV FLIPPED THE RUNWAY / WE MADE IT DRINKABLE ═══ */}
      <section className="avax-frame" aria-label="Avavav flipped the runway">
        <div className="avax-frame__inner">
          <h2 className="avax-h2 avax-h2--green">Avavav flipped the runway</h2>
          <h3 className="avax-h3">we made it drinkable</h3>
          <div className="avax-cols">
            <div>
              <p>Avavav and Oatly come together at Milan Fashion Week for Avavav&rsquo;s A/W 2026 show, to blur the lines between fashion, performance and flavour. The show ran in reverse: guests were observed; models became spectators. It was fashion as performance rather than presentation — playing with exposure, perspective and power. Our part? Take those ideas and pour them into the glass.</p>
              <p>Avavav&rsquo;s reversed format reframed who gets seen and who does the seeing. Inside that world, we didn&rsquo;t just show up with trays; we translated silhouettes into sips so the concept travelled from fabric to flavour.</p>
            </div>
            <div>
              <ResponsiveImage src={IMG.og} alt="AVAVAV x Oatly — Milan Fashion Week" className="avax-sideimg" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ RUNWAY SPLIT — two full-bleed fashion frames ═══ */}
      <section className="avax-split" aria-label="Runway looks">
        <ResponsiveImage src={IMG.g1} alt="Model holding an Oatly Matcha carton styled as a handbag" className="avax-split__img" />
        <ResponsiveImage src={IMG.g2} alt="Model walking the reversed runway holding an Oatly carton" className="avax-split__img" />
      </section>

      {/* ═══ A SHARED LANGUAGE ═══ */}
      <section className="avax-frame" aria-label="A shared language">
        <div className="avax-frame__inner">
          <h2 className="avax-h2 avax-h2--green">A shared language</h2>
          <h3 className="avax-h3 avax-h3--sm">of culture and experimentation</h3>
          <p className="avax-p">Avavav&rsquo;s reversed format reframed who gets seen and who does the seeing. Inside that world, we didn&rsquo;t just show up with trays; we translated silhouettes into sips so the concept travelled from fabric to flavour.</p>
          <blockquote className="avax-quote">
            &ldquo;For me, fashion is about creating worlds — not just clothes. This format let us work with contrast — observation vs exposure, depth vs entertainment — while responding to an industry still shaped by a male gaze. Working with Oatly felt natural because they don&rsquo;t just make oat drinks, they build culture. The drinks became an extension of the collection — playful, strange, thoughtful and very Avavav&rdquo;
          </blockquote>
          <p className="avax-attr"><span>– Beate Karlsson, Creative Director at Avavav.</span></p>
          <p className="avax-p">The creative exchange reflects a shared belief in expression without boundaries. Both Swedish-born brands are known for challenging convention in their respective industries, Avavav through radical runway performances, and Oatly through culture-shaping brand storytelling and plant-based innovation.</p>
        </div>
      </section>

      {/* ═══ FROM SILHOUETTES TO SIPS ═══ */}
      <section className="avax-frame" aria-label="From silhouettes to sips">
        <div className="avax-frame__inner">
          <h2 className="avax-h2"><span className="avax-green">From silhouettes</span><br />to sips</h2>
          <p className="avax-p">Together with Beate, our team developed three signature serves inspired by materials, textures and themes in the collection. The brief was simple: keep it conceptual, integrated and, obviously, delicious.</p>
          <blockquote className="avax-quote avax-quote--sm">
            &ldquo;We wanted to support Avavav in a way that felt meaningful and fully inside the performance. It wasn&rsquo;t about pouring drinks; it was about building something unexpected together&rdquo;
          </blockquote>
          <p className="avax-attr"><span>– Rowena Roos, Head of FADE at Oatly.</span></p>
        </div>
      </section>

      {/* ═══ THE THREE SIGNATURE DRINKS ═══ */}
      <section className="avax-drinks" aria-label="The three signature drinks">
        <h2 className="avax-h2">The three <span className="avax-green">signature drinks</span></h2>
        <div className="avax-drinks__grid">
          <article>
            <ResponsiveImage src={IMG.newFashioned} alt="Stack of clear glasses with the top one filled with a reddish drink" className="avax-drink__img" />
            <h3>New fashioned</h3>
            <p>A clarified bourbon oat drink that reframes a timeless classic through a plant-based, fashion-forward lens. (Contains alcohol; adults only where applicable.)</p>
          </article>
          <article>
            <ResponsiveImage src={IMG.lace} alt="A hand pours a cocktail from a shaker into a coupe glass with heart-shaped coasters" className="avax-drink__img" />
            <h3>Lace bottoms up</h3>
            <p>A non-alcoholic serve in a cocoa-butter-laced glass, nodding to fragility, texture and contrast.</p>
          </article>
          <article>
            <ResponsiveImage src={IMG.jell} alt="Square matcha coloured jell-o cube with Oatly logos on a doily" className="avax-drink__img" />
            <h3>Jell-oat shot</h3>
            <p>A playful oat-based jelly shot with Oat Drink Matcha, apple and herbs. Somewhere between drink, dessert and design object.</p>
          </article>
        </div>
      </section>

      {/* ═══ WHY THIS MATTERS ═══ */}
      <section className="avax-frame" aria-label="Why this matters">
        <div className="avax-frame__inner">
          <h2 className="avax-h2 avax-h2--green">Why this matters</h2>
          <h3 className="avax-h3">(beyond one night in Milan)</h3>
          <p className="avax-p">This collaboration is part of our ongoing experiment to stretch oat-based creativity beyond the usual drinks menu — into culture, design and the places where ideas collide.</p>
          <ResponsiveImage src={IMG.all} alt="AVAVAV x Oatly — Milan Fashion Week" className="avax-wide" />
          <div className="avax-grid14" aria-label="Backstage and runway gallery">
            {GRID14.map((src, i) => (
              <ResponsiveImage key={i} src={src} alt={`AVAVAV x Oatly gallery ${i + 1}`} className="avax-grid14__img" loading="lazy" />
            ))}
          </div>
          <p className="avax-more">Want more taste-bending ideas? Check out our <a href="/recipes/look-book-autumn-winter-2025">Look book</a>.</p>
        </div>
      </section>

      {/* ═══ RELATED — white newspaper footer (as on live page) ═══ */}
      <section className="avax-related" aria-label="More initiatives">
        <div className="avax-related__duo">
          <a href="/things-we-do/initiatives/aftertaste">
            <ResponsiveImage src={IMG.aftertaste} alt="Aftertaste" className="avax-related__img" />
            <h3>Aftertaste</h3>
            <p>Part forum, part drink extravaganza—we brought together the best in the biz to talk about what&rsquo;s next in beverage.</p>
            <span>Initiatives • Jun 12, 2026</span>
          </a>
          <a href="/things-we-do/initiatives/pee-for-the-planet">
            <ResponsiveImage src={IMG.peeRoom} alt="Pee for the Planet" className="avax-related__img" />
            <h3>Pee for the planet</h3>
            <p>Oatly, Malmö FF, SLU and Sanitation360 are testing whether human urine can replace fossil-based fertilizer. Meet the Pee for the Planet research project.</p>
            <span>Initiatives • May 18, 2026</span>
          </a>
        </div>
      </section>
    </div>
  );
}
