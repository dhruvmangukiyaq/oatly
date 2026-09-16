import React from 'react';
import LookBookCollection from '../components/LookBookCollection';
// ─── MVC: View ──────────────────────────────────────────────────────────────
// Mirrors oatly.com/recipes/look-book-autumn-winter-2025: red theme tag,
// serif title, intro line, refill hero banner, 27 recipe cards.
// Collection arrives from the Model (async Express API).
import RecipeModel from '../models/recipeModel.js';
import { useApiData } from '../hooks/useApiData.js';

export default function LookBookAW25Page() {
  // MODEL (async API — page renders once the collection arrives)
  const collection = useApiData(() => RecipeModel.getAw25Collection(), []);
  if (!collection) return null;

  return (
    <LookBookCollection
      tag="Look book A/W 25"
      tagClass="lb3-tag--red"
      title="Look book Autumn/Winter 2025"
      intro="A less taxing life on this planet can be an easy thing, just start with anything, like a drink made with this oat-based thing. It might inspire you to change another thing and when more people do the same thing, we can change everything."
      heroImage="https://assets.oatly.com/asset/68098b18-2a51-4a2f-a61a-66767f296c80/w1080/WEB-Oatly_Lookbook_refill_Desktop_new.png"
      heroAlt="The Oatly Look book refill"
      collection={collection}
      detailBase="/recipes/look-book-autumn-winter-2025"
      seoTitle="Oatly Look Book Autumn/Winter 2025 | Seasonal Oat Drinks"
      seoDescription="Cozy autumn and winter sips: 27 seasonal oat drink recipes from Oatly."
      pathname="/recipes/look-book-autumn-winter-2025"
    />
  );
}
