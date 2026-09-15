// ─── MODEL (MVC, async over API) ────────────────────────────────────────────
// Same contract as before — Views/Controllers keep calling getNavItems().
// Data now comes from the Express backend (src/api), not local files.

import { fetchNavItems } from '../api/navigation.js';

export async function getNavItems() {
  return fetchNavItems();
}

const NavigationModel = { getNavItems, NAV_ITEMS: undefined };

export default NavigationModel;
