// ─── BACKEND CONTROLLER ─────────────────────────────────────────────────────
// Navigation: HTTP layer over navigationModel.

import * as Navigation from '../models/navigationModel.js';

export function listItems(req, res) {
  res.json(Navigation.getNavItems());
}
