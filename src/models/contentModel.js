// ─── MODEL (MVC, async over API) ────────────────────────────────────────────
// Same function names as before — now backed by the Express backend.

import {
  fetchPlan,
  fetchSustainability,
  fetchNutrition,
  fetchFutureOfTaste,
  fetchHome,
} from '../api/content.js';

export async function getSustainabilityPlan() {
  return fetchPlan();
}

export async function getSustainabilityData() {
  return fetchSustainability();
}

export async function getSustainabilitySection(key) {
  const data = await fetchSustainability();
  return data?.sections?.[key] || null;
}

export async function getNutritionFacts() {
  return fetchNutrition();
}

export async function getFutureOfTaste() {
  return fetchFutureOfTaste();
}

export async function getHomepageCards() {
  const data = await fetchHome();
  return data?.cards || {};
}

export async function getHomepageImages() {
  const data = await fetchHome();
  return data?.images || {};
}

const ContentModel = {
  getSustainabilityPlan,
  getSustainabilityData,
  getSustainabilitySection,
  getNutritionFacts,
  getFutureOfTaste,
  getHomepageCards,
  getHomepageImages,
};

export default ContentModel;
