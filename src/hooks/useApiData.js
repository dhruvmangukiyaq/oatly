// ─── useApiData HOOK ────────────────────────────────────────────────────────
// Fetches once (or when deps change) and returns the payload.
// Returns `undefined` while loading, `null` on error — pages render nothing
// until data arrives, so the visible UI stays identical to before.

import { useState, useEffect } from 'react';

export function useApiData(fetcher, deps = []) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    let live = true;
    Promise.resolve()
      .then(fetcher)
      .then((d) => {
        if (live) setData(d ?? null);
      })
      .catch(() => {
        if (live) setData(null);
      });
    return () => {
      live = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return data;
}

export default useApiData;
