import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from '../components/SEO';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Mirrors oatly.com/recipes/look-book-vol-3 top to bottom. All content +
// official assets come from lookBookVol3Data (LOOKBOOK_PAGE + recipes);
// recipe detail pages (/recipes/look-book-vol-3/:slug) keep working on the
// same slugs.
import RecipeModel from '../../models/recipeModel.js';
import { LOOKBOOK_PAGE } from '../../data/lookBookVol3Data.js';
import '../components/LookBook.css';

export default function LookBookVol3Page() {
  // MODEL
  const recipes = RecipeModel.getLookBookVol3Recipes();
  const page = LOOKBOOK_PAGE;

  return (
    <div className="lb3">
      <SEO
        title="Oatly Look Book Vol. 3 | 18 Drink Recipes With Oatly"
        description="18 drink recipes with Oatly — tracking South American flavour waves, from Tortilla & Agave Latte to Hojicha Old Fashioned."
        pathname="/recipes/look-book-vol-3"
      />
      <div className="lb3__inner">
        {/* Breadcrumb: Home > LOOK BOOK VOL. 3 | OATLY */}
        <nav aria-label="Breadcrumb">
          <ol className="lb3-crumb__list">
            <li>
              <Link to="/" className="lb3-crumb__link" aria-label="Home">
                <Home size={16} aria-hidden="true" />
              </Link>
            </li>
            <li aria-hidden="true" className="lb3-crumb__sep">
              &gt;
            </li>
            <li>
              <span className="lb3-crumb__current" aria-current="page">
                {page.breadcrumb}
              </span>
            </li>
          </ol>
        </nav>

        {/* Giant blackletter hero logo (official Oatly artwork) */}
        <img src={page.logo} alt="Look Book Vol.3" className="lb3-logo" />

        {/* Intro: handwritten text + hero drink photo */}
        <div className="lb3-intro">
          <img
            src={page.introTextImage}
            alt={page.introTextAlt}
            className="lb3-intro__text"
          />
          <img
            src={page.heroImage}
            alt={page.heroImageAlt}
            className="lb3-intro__photo"
            loading="lazy"
          />
        </div>

        {/* 18 recipe cards */}
        <ul className="lb3-grid">
          {recipes.map((recipe) => (
            <li key={recipe.slug}>
              <Link
                to={`/recipes/look-book-vol-3/${recipe.slug}`}
                className="lb3-card"
              >
                <div className="lb3-card__media">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="lb3-card__img"
                    loading="lazy"
                  />
                </div>
                <p className="lb3-card__name">{recipe.name}</p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Centrepiece article */}
        <article className="lb3-article">
          <h2 className="lb3-article__heading">{page.article.heading}</h2>
          <div className="lb3-article__body">
            {page.article.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="lb3-article__author">{page.article.author}</p>
        </article>
      </div>

      {/* Full-width collage */}
      <img
        src={page.collage}
        alt="Look Book Vol. 3 collage"
        className="lb3-wide"
        loading="lazy"
      />

      <div className="lb3__inner">
        {/* Full-bleed sink photo */}
        <div className="lb3-bleed">
          <img src={page.sinkImage} alt="Oatly drinks by the sink" loading="lazy" />
        </div>

        {/* Trend stories */}
        <div className="lb3-trends">
          <img
            src={page.trendImage}
            alt="Hojicha drink"
            className="lb3-trends__photo"
            loading="lazy"
          />
          <div>
            {page.trends.map((trend) => (
              <div key={trend.title} className="lb3-trend">
                <h3 className="lb3-trend__title">{trend.title}</h3>
                <p className="lb3-trend__text">{trend.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Portrait pair */}
        <div className="lb3-portraits">
          {page.portraits.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={i === 0 ? 'Hojicha Old Fashioned' : 'Lychee Oolong iced tea'}
              loading="lazy"
            />
          ))}
        </div>

        {/* Previous collection teaser */}
        <Link to={page.previous.path} className="lb3-prev">
          <span className="lb3-prev__label">{page.previous.label}</span>
          <span className="lb3-prev__title">{page.previous.title} →</span>
        </Link>
      </div>
    </div>
  );
}
