import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

// Badge palette (spec §5 — visual polish only, same tags/order):
// ALL "NEWS" badges share one consistent gold (#FDCF85 Harvest Butter).
const TAG_COLORS = {
  'NEWS': 'bg-[#FDCF85] text-black',
  'PRODUCTS': 'bg-[#F5F5F5] text-black',
  'TASTEBUDS': 'bg-[#F8C8D8] text-black',
  'SUSTAINABILITY': 'bg-[#B8D4C8] text-black',
  'HEALTH': 'bg-[#F8C8D8] text-black',
  'OTHER': 'bg-[#F5F5F5] text-black',
};

/**
 * VideoCard (View) — same frame + footer bar as FlatCard, but plays the real
 * Oatly Vimeo footage (muted autoplay loop, like oatly.com) with the official
 * video poster underneath as instant fallback.
 * Polish: borderless, 2px radius, -2px hover lift + soft shadow.
 * DOM/order/content unchanged.
 */
export default function VideoCard({
  title,
  tag = 'NEWS',
  imageSrc,
  imageAlt,
  videoId,
  videoHash,
  videoSrc,
  linkTo = '/',
  className = '',
  aspectRatio = '4/3',
  overlay = null,
  loading = 'lazy',
  fetchPriority,
  sizes = '(max-width: 900px) 100vw, 50vw'
}) {
  const isFill = aspectRatio === 'fill';
  const tagColor = TAG_COLORS[tag] || TAG_COLORS['NEWS'];
  const playerSrc = `https://player.vimeo.com/video/${videoId}?h=${videoHash}&background=1&dnt=1`;

  return (
    <Link
      to={linkTo}
      className={`group ${isFill ? 'flex flex-col' : 'block'} bg-white rounded-[2px] overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)] ${className}`}
    >
      <div className={`relative overflow-hidden bg-[#EFECE5] ${isFill ? 'flex-1 min-h-[320px]' : ''}`} style={isFill ? undefined : { aspectRatio }}>
        {imageSrc ? (
          <ResponsiveImage
            src={imageSrc}
            alt={imageAlt || title}
            className="absolute inset-0 w-full h-full object-cover"
            loading={loading}
            fetchPriority={fetchPriority}
            sizes={sizes}
          />
        ) : null}
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={imageSrc}
            title={title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full aspect-video max-w-none border-0 pointer-events-none object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : videoId ? (
          <iframe
            src={playerSrc}
            title={title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full aspect-video max-w-none border-0 pointer-events-none"
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
          />
        ) : null}
        {overlay ? (
          <div className="absolute inset-0 pointer-events-none">{overlay}</div>
        ) : null}
      </div>

      <div className="bg-white px-3 min-h-[44px] flex items-center justify-between gap-3">
        <div
          className="font-body-spec font-bold text-[13px] uppercase text-black tracking-tight leading-tight truncate"
          title={title}
        >
          {title}
        </div>
        <span className={`${tagColor} px-2 py-[3px] text-[11px] font-body-spec font-bold uppercase whitespace-nowrap flex-shrink-0 leading-none self-center`}>
          {tag}
        </span>
      </div>
    </Link>
  );
}
