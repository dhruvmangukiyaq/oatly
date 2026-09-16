import React from 'react';
import SEO from '../components/SEO';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Mirrors oatly.com/things-we-do/initiatives/future-of-taste: hero, editors
// letter, table of contents, 5 trend sections. Content + imagery arrive from
// the Model (async Express API).
import ContentModel from '../models/contentModel.js';
import { useApiData } from '../hooks/useApiData.js';
import '../styles/FutureTaste.css';

export default function FutureOfTastePage() {
  // MODEL (async API — page renders once the report arrives)
  const page = useApiData(() => ContentModel.getFutureOfTaste(), []);
  if (!page) return null;

  return (
    <div className="fot">
      <SEO
        title="A Report on the Future of Taste | Oatly"
        description="Predicting what's next in beverage culture. From new flavor profiles to global trend forecasts, this report blends data, insights, expert predictions (and guesses)."
        pathname="/things-we-do/initiatives/future-of-taste"
      />
      <div className="fot__inner">
        {/* Hero */}
        <header className="fot-hero">
          <img src={page.heroImage} alt="Oatly Intelligence World Wide" className="fot-hero__globe" />
          <p className="fot-hero__badge">{page.heroBadge}</p>
          <p className="fot-hero__kicker">{page.heroKicker}</p>
          <h1 className="fot-hero__title">{page.heroTitle}</h1>
          <p className="fot-hero__subtitle">{page.heroSubtitle}</p>
        </header>

        {/* Editors letter */}
        <section id="prologue" aria-label="Editors letter" className="fot-letter">
          <img src={page.stamp} alt="Taste Approved stamp" className="fot-letter__stamp" />
          <h2 className="fot-letter__heading">{page.letterHeading}</h2>
          <p className="fot-letter__byline">{page.letterByline}</p>
          {page.letterParagraphs.slice(0, 3).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <img src={page.letterImage} alt="Oatly look book collage" className="fot-letter__collage" loading="lazy" />
          {page.letterParagraphs.slice(3).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {/* Table of contents */}
        <nav aria-label="Table of contents" className="fot-toc">
          <h2 className="fot-toc__heading">Table of contents</h2>
          <ul className="fot-toc__list">
            <li className="fot-toc__item">
              <span className="fot-toc__kicker">Prologue:</span>
              <a href="#prologue" className="fot-toc__link">
                Editors&apos; letter
              </a>
            </li>
            {page.trends.map((trend) => (
              <li key={trend.id} className="fot-toc__item">
                <span className="fot-toc__kicker">{trend.kicker}</span>
                <a href={`#${trend.id}`} className="fot-toc__link">
                  {trend.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Trend sections */}
        {page.trends.map((trend) => (
          <section key={trend.id} id={trend.id} aria-label={trend.title} className="fot-trend">
            <span className="fot-trend__kicker">{trend.kicker}</span>
            <h2 className="fot-trend__title">{trend.title}</h2>
            <p className="fot-trend__tagline">{trend.tagline}</p>
            {trend.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <img src={trend.image} alt={trend.title} className="fot-trend__img" loading="lazy" />
          </section>
        ))}
      </div>
    </div>
  );
}
