import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// ─── MVC: View ─── detail via Controller ─────────────────────────────────────
import { useRecipeDetailController } from '../controllers/useContentControllers.js';
import { ArrowLeft, Clock, ChefHat, Check } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-10 font-sans pb-16">
      
      {/* Back Button */}
      <Link
        to={backPath}
        className="btn-oatly-secondary text-xs py-2.5 px-5 inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> {backLabel}
      </Link>

      {/* Hero Header Card */}
      <div className="bg-white rounded-[2px] shadow-[0_8px_20px_rgba(0,0,0,0.10)] overflow-hidden grid grid-cols-1 md:grid-cols-12">

        {/* Left: 1:1 Square Recipe Image */}
        {/* TODO: Swap in real licensed image file here */}
        <div className="md:col-span-6 aspect-square bg-oatly-cream relative overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="badge-sticker bg-oatly-yellow text-oatly-black">{recipe.collection}</span>
          </div>
        </div>

        {/* Right: Recipe Title & Info */}
        <div className="md:col-span-6 p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono font-bold text-gray-600">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-oatly-pink" /> {recipe.prepTime}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><ChefHat className="w-4 h-4 text-oatly-blue" /> {recipe.difficulty}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black uppercase font-display text-oatly-black leading-tight">
              {recipe.name}
            </h1>

            <p className="text-sm text-gray-800 leading-relaxed font-sans">
              {recipe.tagline}
            </p>
          </div>

          <div className="p-4 bg-oatly-yellow border-2 border-oatly-black font-hand text-base text-oatly-black shadow-brutal-sm rotate-[-0.5deg]">
            "Crafted for {recipe.collection || 'Look Book Vol. 3'} — 100% plant-based perfection."
          </div>
        </div>

      </div>


      {/* Ingredients & Instructions Grid (formula pages only) */}
      {ingredients.length > 0 || instructions.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Ingredients Checklist */}
        <div className="md:col-span-5 bg-white border-4 border-oatly-black p-6 shadow-brutal space-y-4">
          <h3 className="font-display font-extrabold text-xl uppercase text-oatly-blue pb-2 border-b-2 border-oatly-black flex items-center justify-between">
            <span>INGREDIENTS</span>
            <span className="text-xs font-mono text-gray-500">CHECKLIST</span>
          </h3>

          <ul className="space-y-3 text-xs md:text-sm font-mono">
            {ingredients.map((ing, idx) => (
              <li
                key={idx}
                onClick={() => toggleIngredient(idx)}
                className={`p-2.5 border-2 border-oatly-black cursor-pointer transition-all flex items-center gap-3 ${
                  checkedIngredients[idx]
                    ? 'bg-oatly-mint/40 line-through text-gray-500'
                    : 'bg-oatly-cream hover:bg-white text-oatly-black'
                }`}
              >
                <div className={`w-5 h-5 border-2 border-oatly-black flex items-center justify-center ${
                  checkedIngredients[idx] ? 'bg-oatly-black text-white' : 'bg-white'
                }`}>
                  {checkedIngredients[idx] && <Check className="w-3.5 h-3.5" />}
                </div>
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="md:col-span-7 bg-white border-4 border-oatly-black p-6 md:p-8 shadow-brutal space-y-6">
          <h3 className="font-display font-extrabold text-xl uppercase text-oatly-blue pb-2 border-b-2 border-oatly-black">
            PREPARATION METHOD
          </h3>

          <ol className="space-y-6">
            {instructions.map((step, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-none bg-oatly-black text-oatly-yellow font-display font-black text-sm flex items-center justify-center border-2 border-black shadow-brutal-sm">
                  {idx + 1}
                </span>
                <div className="pt-1 text-sm md:text-base text-gray-800 font-sans leading-relaxed">
                  {step}
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>
      ) : (
        <div className="bg-white border-4 border-oatly-black p-6 shadow-brutal font-mono text-xs font-bold uppercase">
          Full formula dropping soon — check back for ingredients & method.
        </div>
      )}

    </div>
  );
}
