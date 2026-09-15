import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from './SEO';
// ─── Shared Oatly collection layout (A/W 25, S/S 25) ─────────────────────────
// Breadcrumb → theme tag → serif title → intro → hero banner → recipe cards.
// Only content props change per collection; UI stays 100% consistent.
import '../styles/LookBook.css';

export default function LookBookCollection({
  breadcrumb,
  tag,
  tagClass,
  title,
  intro,
  heroImage,
  heroAlt,
  collection,
  detailBase,
  seoTitle,
  seoDescription,
  pathname,
}) {
  return (
    <div className="lb3">
      <SEO title={seoTitle} description={seoDescription} pathname={pathname} />
      <div className="lb3__inner">
        {/* Breadcrumb: Home > CURRENT */}
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
                {breadcrumb}
              </span>
            </li>
          </ol>
        </nav>

        {/* Collection header */}
        <div className="lb3-colhead">
          <span className={`lb3-tag ${tagClass}`}>{tag}</span>
          <h1 className="lb3-coltitle">{title}</h1>
          <p className="lb3-colintro">{intro}</p>
        </div>

        {/* Hero banner artwork */}
        <img src={heroImage} alt={heroAlt} className="lb3-hero" />

        {/* Recipe cards */}
        <ul className="lb3-grid">
          {collection.recipes.map((recipe) => (
            <li key={recipe.slug}>
              <Link to={`${detailBase}/${recipe.slug}`} className="lb3-card">
                <div className="lb3-card__media">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="lb3-card__img"
                    loading="lazy"
                  />
                </div>
                <p className="lb3-card__tag">{collection.collection}</p>
                <p className="lb3-card__name">{recipe.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
