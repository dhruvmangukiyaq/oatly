import React from 'react';

// ─── RESPONSIVE IMAGE (View) ────────────────────────────────────────────────
// Serves appropriately sized Storyblok variants instead of full-resolution
// originals. Visual output is unchanged: same image, same crop, same layout.
// Other CDN/local URLs are passed through untouched.

const STORYBLOK_HOST = 'a.storyblok.com';
const DEFAULT_WIDTHS = [384, 768, 1200, 1600];

function originalWidth(pathname) {
  const match = pathname.match(/\/(\d+)x(\d+)\//);
  return match ? Number(match[1]) : null;
}

function buildVariant(base, width, quality) {
  return `${base}/m/${width}x0/filters:quality(${quality}):format(webp)`;
}

function getResponsiveImage(src, { widths = DEFAULT_WIDTHS, quality = 75 } = {}) {
  if (typeof src !== 'string' || src.length === 0) return null;

  let url;
  try {
    url = new URL(src);
  } catch {
    return { src };
  }

  if (url.hostname !== STORYBLOK_HOST) return { src };
  if (url.pathname.includes('/m/')) return { src };
  if (/\.svg$/i.test(url.pathname)) return { src };

  const maxWidth = originalWidth(url.pathname);
  const requested = [...new Set(widths)]
    .filter((width) => Number.isFinite(width) && width > 0)
    .sort((a, b) => a - b)
    .filter((width) => !maxWidth || width <= maxWidth);
  const candidates = requested.length > 0 ? requested : [maxWidth || 768];
  const base = `${url.origin}${url.pathname}${url.search}`;
  const safeQuality = Math.min(100, Math.max(1, quality));

  return {
    src: buildVariant(base, candidates[Math.min(1, candidates.length - 1)], safeQuality),
    srcSet: candidates.map((width) => `${buildVariant(base, width, safeQuality)} ${width}w`).join(', '),
  };
}

export default function ResponsiveImage({
  src,
  alt = '',
  className = '',
  widths,
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority,
  decoding = 'async',
  onError,
}) {
  const image = getResponsiveImage(src, { widths });
  if (!image) return null;

  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      onError={onError}
    />
  );
}
