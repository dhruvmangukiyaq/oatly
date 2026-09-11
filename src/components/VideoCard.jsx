import React from 'react';
import { Link } from 'react-router-dom';

const TAG_COLORS = {
  'NEWS': 'bg-[#F8DC9A] text-black',
  'PRODUCTS': 'bg-[#DBDBDB] text-black',
  'TASTEBUDS': 'bg-[#F4C2D4] text-black',
  'SUSTAINABILITY': 'bg-[#B9A6D6] text-black',
  'HEALTH': 'bg-[#F6D2D2] text-black',
  'OTHER': 'bg-[#B8CFE2] text-black',
};

/**
 * VideoCard (View) — same frame + footer bar as FlatCard, but plays the real
 * Oatly Vimeo footage (muted autoplay loop, like oatly.com) with the official
 * video poster underneath as instant fallback.
 */
export default function VideoCard({
  title,
  tag = 'NEWS',
  imageSrc,
  imageAlt,
  videoId,
  videoHash,
  linkTo = '/',
  className = '',
  aspectRatio = '4/3',
  overlay = null,
}) {
  const isFill = aspectRatio === 'fill';
  const tagColor = TAG_COLORS[tag] || TAG_COLORS['NEWS'];
  const playerSrc = `https://player.vimeo.com/video/${videoId}?h=${videoHash}&background=1&dnt=1`;

  return (
    <Link
      to={linkTo}
      className={`group ${isFill ? 'flex flex-col' : 'block'} bg-white border-2 border-black overflow-hidden ${className}`}
    >
      <div className={`relative overflow-hidden bg-[#EFECE5] ${isFill ? 'flex-1 min-h-[320px]' : ''}`} style={isFill ? undefined : { aspectRatio }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : null}
        {videoId ? (
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

      <div className="bg-white border-t-2 border-black px-3 min-h-[44px] flex items-center justify-between gap-3">
        <div
          className="font-mono font-bold text-[13px] uppercase text-black tracking-tight leading-tight truncate"
          title={title}
        >
          {title}
        </div>
        <span className={`${tagColor} px-2 py-[3px] text-[11px] font-mono font-bold uppercase whitespace-nowrap flex-shrink-0 leading-none self-center`}>
          {tag}
        </span>
      </div>
    </Link>
  );
}
