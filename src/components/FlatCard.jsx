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
 * FlatCard - Matches oatly.com homepage card style:
 * - Thin black border around whole card
 * - Full-bleed image background
 * - White footer bar with title left + colored pill right
 * - Optional large overlay text / custom overlay on image
 */
export default function FlatCard({
  title,
  tag = 'NEWS',
  imageSrc,
  imageAlt,
  linkTo = '/',
  className = '',
  aspectRatio = '4/3',
  footerTitle = null,
  footerTag = null,
  overlayText = null,
  overlay = null,
  children = null,
  objectFit = 'cover',
  footerAtBottom = false
}) {
  const displayTitle = footerTitle || title;
  const displayTag = footerTag || tag;
  const tagColor = TAG_COLORS[displayTag] || TAG_COLORS['NEWS'];
  const isFill = aspectRatio === 'fill';
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const stretchCol = footerAtBottom && !isFill;

  if (children) {
    return (
      <Link to={linkTo} className={`group block bg-white border-2 border-black overflow-hidden ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      to={linkTo}
      className={`group ${isFill || stretchCol ? 'flex flex-col h-full' : 'block'} bg-white border-2 border-black overflow-hidden ${className}`}
    >
      {/* Full-bleed Image */}
      <div className={`relative overflow-hidden bg-[#EFECE5] ${isFill ? 'flex-1 min-h-[320px]' : ''}`} style={isFill ? undefined : { aspectRatio }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            className={`${isFill ? 'absolute inset-0 w-full h-full' : 'w-full h-full'} ${fitClass} transition-transform duration-500 group-hover:scale-[1.03]`}
            loading="lazy"
          />
        ) : null}
        {overlay ? (
          <div className="absolute inset-0 pointer-events-none">{overlay}</div>
        ) : overlayText ? (
          <div className="absolute inset-x-0 bottom-6 px-4 text-center pointer-events-none">
            <span className="font-display font-black text-white text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" style={{ WebkitTextStroke: '1px rgba(0,0,0,0.15)' }}>
              {overlayText}
            </span>
          </div>
        ) : null}
      </div>

      {/* White Footer Bar — fixed identical height on every card */}
      <div className={`bg-white border-t-2 border-black px-3 min-h-[44px] flex items-center justify-between gap-3 ${stretchCol ? 'mt-auto' : ''}`}>
        <div
          className="font-mono font-bold text-[13px] uppercase text-black tracking-tight leading-tight truncate"
          title={displayTitle}
        >
          {displayTitle}
        </div>
        <span className={`${tagColor} px-2 py-[3px] text-[11px] font-mono font-bold uppercase whitespace-nowrap flex-shrink-0 leading-none self-center`}>
          {displayTag}
        </span>
      </div>
    </Link>
  );
}