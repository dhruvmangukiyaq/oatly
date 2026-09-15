// ─── BACKEND CONTROLLER ─────────────────────────────────────────────────────
// Search: HTTP layer over searchModel.

import * as Search from '../models/searchModel.js';

export function search(req, res) {
  const { q = '' } = req.query;
  res.json({ ...Search.searchAll(q), popular: Search.POPULAR_SEARCHES });
}
