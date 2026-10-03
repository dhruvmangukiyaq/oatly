import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// ─── MVC: View ─── detail via Controller ─────────────────────────────────────
// Quiet-paper formula page — the site's own language (Margo copy, Titan One
// headings, 1px hairlines, #F5F5F5 surfaces, 2px radius). The old brutal kit
// (yellow sticker, 4px black borders, shadow-brutal, blue headings) is gone,
// so every Look Book card opens a page that matches the grid it came from.
import { useRecipeDetailController } from '../controllers/useContentControllers.js';
import { ArrowLeft, Clock, ChefHat, Check } from 'lucide-react';
import '../styles/RecipeDetail.css';

export default function RecipeDetailPage() {
  const { slug } = useParams();
  // CONTROLLER (uses RecipeModel over the Express API)
  const { recipe: found } = useRecipeDetailController(slug);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  if (found === undefined) return null;

  const recipe = {
    name: 'Recipe not found',
    ingredients: [],
    instructions: [],
    ...found,
  };
  // AW25/SS25 entries carry no formula yet — show photo + title gracefully.
  const ingredients = recipe.ingredients || [];
  const instructions = recipe.instructions || [];
  const backPath = recipe.collectionPath || '/recipes/look-book-vol-3';
  const backLabel =
    recipe.collection === 'LOOK BOOK A/W 25'
      ? 'BACK TO LOOK BOOK A/W 25'
      : recipe.collection === 'LOOK BOOK S/S 25'
        ? 'BACK TO LOOK BOOK S/S 25'
        : 'BACK TO LOOK BOOK VOL. 3';

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="rd">
      {/* Back to the collection */}
      <Link to={backPath} className="rd__back">
        <ArrowLeft size={16} aria-hidden="true" /> {backLabel}
      </Link>

      {/* Hero: photo + title card */}
      <div className="rd__hero">
        <div className="rd__media">
          <img className="rd__img" src={recipe.image} alt={recipe.name} />
          {recipe.collection && <span className="rd__badge">{recipe.collection}</span>}
        </div>

        <div className="rd__info">
          <div className="rd__meta">
            <span>
              <Clock size={14} aria-hidden="true" /> {recipe.prepTime}
            </span>
            <span>
              <ChefHat size={14} aria-hidden="true" /> {recipe.difficulty}
            </span>
          </div>

          <h1 className="rd__title">{recipe.name}</h1>
          <p className="rd__tagline">{recipe.tagline}</p>

          <p className="rd__quote">
            &ldquo;Crafted for {recipe.collection || 'Look Book Vol. 3'} — 100%
            plant-based perfection.&rdquo;
          </p>
        </div>
      </div>

      {/* Ingredients & Instructions (formula pages only) */}
      {ingredients.length > 0 || instructions.length > 0 ? (
        <div className="rd__cols">
          {/* Ingredients checklist */}
          <section className="rd__panel" aria-labelledby="rd-ingredients">
            <div className="rd__head">
              <h3 className="rd__h" id="rd-ingredients">Ingredients</h3>
              <span className="rd__sub">Checklist</span>
            </div>

            <ul className="rd__list">
              {ingredients.map((ing, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className={`rd__opt${checkedIngredients[idx] ? ' is-done' : ''}`}
                    onClick={() => toggleIngredient(idx)}
                    aria-pressed={!!checkedIngredients[idx]}
                  >
                    <span className="rd__box">
                      {checkedIngredients[idx] && <Check size={12} aria-hidden="true" />}
                    </span>
                    <span>{ing}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Step-by-step method */}
          <section className="rd__panel" aria-labelledby="rd-method">
            <div className="rd__head">
              <h3 className="rd__h" id="rd-method">Preparation method</h3>
            </div>

            <ol className="rd__steps">
              {instructions.map((step, idx) => (
                <li key={idx} className="rd__step">
                  <span className="rd__num" aria-hidden="true">{idx + 1}</span>
                  <div className="rd__text">{step}</div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      ) : (
        <p className="rd__note">
          Full formula dropping soon — check back for ingredients &amp; method.
        </p>
      )}
    </div>
  );
}
