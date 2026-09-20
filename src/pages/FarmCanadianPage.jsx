import React, { useState } from 'react';
import SEO from '../components/SEO';
import ResponsiveImage from '../components/ResponsiveImage';
import '../styles/FarmCanadian.css';

/* ==========================================================================
   HOW DO YOU SAY F.A.R.M. IN CANADIAN? — copy-to-copy of
   oatly.com/things-we-do/stories/how-do-you-say-f-a-r-m-in-canadian
   White editorial story: cover hero → preamble card → video + text →
   slideshow → pull quote → read-more. All copy + official artwork preserved.
   ========================================================================== */

const SB = 'https://a.storyblok.com/f/107921';

const IMG = {
  hero: `${SB}/1019x679/cc0af9b463/hanover-ridge-farms-09418.png`,
  slides: [
    { src: `${SB}/1019x679/469327698e/canada-09411.png`, alt: 'A man standing in front of a harvester on a field of oats while drinking from an Oatly carton.' },
    { src: `${SB}/1019x679/2bbd89f6af/canada-05974.png`, alt: 'A person sitting on a field and some cows in the background.' },
    { src: `${SB}/1019x679/082798dd91/canada-05181.png`, alt: 'Two men leaning on a harvester machine while holding a carton of Oatly each.' },
    { src: `${SB}/1019x679/9184757631/canada-05468.png`, alt: 'Two men inspecting oat crops on a field of oats.' },
    { src: `${SB}/1019x679/3b1fe36c7c/canada-09517.png`, alt: 'A man pouring Oatly into a glass.' },
    { src: `${SB}/1019x679/dba71c0850/canada-05387.png`, alt: 'A Canadian Oatly carton laying on a field of oats.' },
    { src: `${SB}/1019x679/ff1763939f/canada-09478.png`, alt: 'A farmer preparing food and pouring Oatly chocolate drink in a glass.' },
  ],
};

const YOUTUBE_ID = 'Z5Sn88QR4zY';

function Slideshow() {
  const [i, setI] = useState(0);
  const n = IMG.slides.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  return (
    <div className="farm-slide" aria-label="Field photos" aria-roledescription="carousel">
      <div className="farm-slide__frame">
        <ResponsiveImage
          key={i}
          src={IMG.slides[i].src}
          alt={IMG.slides[i].alt}
          className="farm-slide__img"
        />
        <button type="button" className="farm-slide__arrow farm-slide__arrow--left" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
        <button type="button" className="farm-slide__arrow farm-slide__arrow--right" onClick={() => go(1)} aria-label="Next photo">›</button>
      </div>
      <div className="farm-slide__dots" role="tablist" aria-label="Photos">
        {IMG.slides.map((s, k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={`Photo ${k + 1}: ${s.alt}`}
            className={`farm-slide__dot${k === i ? ' is-now' : ''}`}
            onClick={() => setI(k)}
          />
        ))}
      </div>
      <p className="farm-slide__cap">{IMG.slides[i].alt}</p>
    </div>
  );
}

export default function FarmCanadianPage() {
  const [copied, setCopied] = useState(false);
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="farm">
      <SEO
        title="How Do You Say F.A.R.M. in Canadian? | Oatly"
        description="At Hanover Ridge Farms, the emphasis goes on soil health, biodiversity, and the livelihoods of its farmers."
        pathname="/things-we-do/stories/how-do-you-say-f-a-r-m-in-canadian"
      />

      {/* ═══ COVER HERO ═══ */}
      <header className="farm-hero">
        <ResponsiveImage
          src={IMG.hero}
          alt="Farmer holding an Oatly carton in a harvested oat field at Hanover Ridge Farms"
          className="farm-hero__img"
          loading="eager"
        />
        <div className="farm-hero__title">
          <span className="farm-hero__eyebrow">Stories</span>
          <h1>How Do You Say F.A.R.M. in Canadian?</h1>
        </div>
      </header>

      {/* ═══ PREAMBLE CARD ═══ */}
      <div className="farm-preamble">
        <p>At Hanover Ridge Farms, the emphasis goes on soil health, biodiversity, and the livelihoods of its farmers.</p>
        <div className="farm-pills">
          <span className="farm-pill">stories</span>
          <span className="farm-pill">Nov 27, 2025</span>
          <button type="button" className="farm-pill farm-pill--dark" onClick={copyLink}>
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>

      {/* ═══ VIDEO + INTRO COLUMNS ═══ */}
      <section className="farm-cols">
        <div className="farm-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0`}
            title="What an Oat Harvest in Saskatchewan Taught Oatly"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        <div className="farm-prose">
          <p>When we talk about Oatly&rsquo;s F.A.R.M. program, we like to show our work.* That might come in the form of big numbers and percentages on the sides of oat drink cartons or in publicly reminiscing about the years when we described ourselves as &ldquo;a sustainability company that happens to make oat drink.&rdquo;</p>
          <p>It might also come straight from a farmer&rsquo;s mouth, which was precisely the case when we met Matt Wallington during our visit to Hanover Ridge Farms in Tisdale, Saskatchewan. Whenever we can get a farmer preaching soil health or fertilizer reduction over a farm dinner in the middle of a harvested oat field and saying things like, &ldquo;This is different,&rdquo; we tend to get all warm and fuzzy on the inside. So we&rsquo;re constantly chasing that feeling—and can you really blame us?</p>
          <p>For the most part we spare you, the oat drink-loving consumer, from the nerdy details about our complex regenerative agriculture program and what it means to us. Instead, we abide by the sentiment that if a picture is worth 1,000 words, then footage of a farmer chugging a carton of oat drink while standing in a field of oats is worth, like, 3,000 words. Or thereabouts. (But for nerds like us who prefer lots of words and numbers and percentages about our regenerative agriculture program, we&rsquo;re happy to accommodate.)</p>
        </div>
      </section>

      {/* ═══ BODY ═══ */}
      <section className="farm-body">
        <p>Anyway, back to that farmer chugging a carton of oat drink while standing in a field of oats… during our few days in Saskatchewan, we received a bunch of in-the-field lessons from our oat partners at Hanover Ridge about the regenerative practices they put into effect during their growing and harvesting seasons.</p>
        <p>What does it mean to be an Oatly oat partner, you ask? Whoa, great question. Here&rsquo;s the AI Overview version: Oatly needs a lot of oats—grown on a lot of acres by a lot of farmers—so they want more oat acres to be regenerative ones and more farms to be resilient ones. To get there, Oatly and their oat milling friends at Grain Millers work with you to experiment and implement the regenerative practices best suited to your farm operation. (Not to mention, Grain Millers will buy your oats and Oatly will kick a little extra $$$ your way for good measure.)</p>
      </section>

      <Slideshow />

      <section className="farm-body">
        <p>Pretty good, right? Hanover Ridge thought so and enlisted in the F.A.R.M. program at the beginning of 2025. Over the expanse of its 1,100 acres of oats, the farm incorporates a number of regenerative practices, like bringing in cattle to graze harvested oat fields as a method to maintain the living root of the crop and contribute to the health and microbiology of the soil. Or deploying drones in a totally non-dystopic way to provide pinpointed spraying methods that not only reduce the amount of chemical inputs they use but also prevent run-off into waterways and freak out old-guy farmers when they fly by.</p>
      </section>

      {/* ═══ QUOTE ROW ═══ */}
      <section className="farm-quote-row">
        <p>Hanover Ridge also focuses a great deal on its people, employing more workers at a wide age range than an average farm of its size—helping to both contribute to the rural economy and encourage career development that can keep the farm thriving 50 years from now. Much to our delight, we were encouraged to place those very polite farmers in compromising positions as we disrupted their oat harvest with Oatly taste tests and generally being in the way. In the end, we left with what we think is a pretty excellent illustration of Oatly&rsquo;s F.A.R.M. program in action.</p>
        <blockquote>
          &ldquo;Having living things on the farm versus treating it like a grain factory… there&rsquo;s something to that.&rdquo;
          <cite>— Matt Wallington, Hanover Ridge Farms</cite>
        </blockquote>
      </section>

      <section className="farm-body">
        <p>If you disagree, that&rsquo;s OK. We think you&rsquo;re wrong, but that&rsquo;s OK. Still, at least you get to see a farmer chugging a carton of oat drink while standing in a field of oats. If there&rsquo;s one lasting image to take from this whole thing, it&rsquo;s probably that anyway.</p>
      </section>

    </div>
  );
}
