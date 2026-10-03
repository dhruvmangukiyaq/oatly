// ─── PRODUCT SEARCH (shared smart matcher) ─────────────────────────────────
// The matcher itself lives in server/models/textSearch.js so the API search
// (/api/search → the modal) and this listing box agree word for word — the
// modal used to run a naive "whole query as one substring" match and found
// nothing for queries like "perfume", while the listing found every parfum.
//
// What it handles: synonyms (perfume → parfum/cologne/fragrance/edp/edt…),
// every text field, and multi-word queries where EVERY word must match.

import {
  matchesText,
  BRAND_GROUPS,
  BRAND_HOUSE,
} from '../../server/models/textSearch.js';

export { BRAND_GROUPS, BRAND_HOUSE };

export function matchesProduct(p, query) {
  return matchesText(
    [
      p.name,
      p.brand,
      BRAND_HOUSE[p.brand],
      p.category,
      p.subCategory,
      p.tagline,
      p.description,
      p.volume,
      p.flavor,
      p.format,
      p.packSize,
    ],
    query,
  );
}
