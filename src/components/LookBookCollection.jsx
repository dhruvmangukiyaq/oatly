import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
// ─── Shared Oatly collection layout (A/W 25, S/S 25) ─────────────────────────
// Theme tag → serif title → intro → hero banner → recipe cards.
// Only content props change per collection; UI stays 100% consistent.
import '../styles/LookBook.css';

export default function LookBookCollection({
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
