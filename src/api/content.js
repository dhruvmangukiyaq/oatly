// ─── API: content (sustainability / nutrition / home / meta / taste) ─────────
import { apiGet } from './client.js';

export function fetchSustainability() {
  return apiGet('/content/sustainability');
}

export function fetchPlan() {
  return apiGet('/content/plan');
}

export function fetchNutrition() {
  return apiGet('/content/nutrition');
}

export function fetchFutureOfTaste() {
  return apiGet('/content/future-of-taste');
}

export function fetchHome() {
  return apiGet('/content/home');
}
