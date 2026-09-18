import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

// Badge palette (spec §5 — visual polish only, same tags/order):
// - ALL "NEWS" badges share one consistent gold (#FDCF85 Harvest Butter)
// - Other tags use spec pastels/surface sparingly; ink text keeps contrast
const TAG_COLORS = {
  'NEWS': 'bg-[#FDCF85] text-black',
  'PRODUCTS': 'bg-[#F5F5F5] text-black',
  'TASTEBUDS': 'bg-[#F8C8D8] text-black',
  'SUSTAINABILITY': 'bg-[#B8D4C8] text-black',
  'HEALTH': 'bg-[#F8C8D8] text-black',
  'OTHER': 'bg-[#F5F5F5] text-black',
};

/**
 * FlatCard - Matches oatly.com homepage card style:
 * - Borderless (no outer border, no footer divider), 2px radius
 * - Full-bleed image background
 * - White footer bar with title left + gold badge right
 * - Optional large overlay text / custom overlay on image
 * - Hover: gentle -2px lift + soft shadow for depth
 * DOM/order/content unchanged — paint only.
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
  footerAtBottom = false,
  loading = 'lazy',
  fetchPriority,
  sizes = '(max-width: 900px) 100vw, 50vw'
}) {
  const displayTitle = footerTitle || title;
  const displayTag = footerTag || tag;
  const tagColor = TAG_COLORS[displayTag] || TAG_COLORS['NEWS'];
  const isFill = aspectRatio === 'fill';
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover';
  const stretchCol = footerAtBottom && !isFill;

  if (children) {
    return (
      <Link to={linkTo} className={`group block bg-white rounded-[2px] overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)] ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      to={linkTo}
      className={`group ${isFill || stretchCol ? 'flex flex-col h-full' : 'block'} bg-white rounded-[2px] overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)] ${className}`}
    >
      {/* Full-bleed Image */}
      <div className={`relative overflow-hidden bg-[#EFECE5] ${isFill ? 'flex-1 min-h-[320px]' : ''}`} style={isFill ? undefined : { aspectRatio }}>
        {imageSrc ? (
          <ResponsiveImage
            src={imageSrc}
            alt={imageAlt || title}
            className={`${isFill ? 'absolute inset-0 w-full h-full' : 'w-full h-full'} ${fitClass} transition-transform duration-500 group-hover:scale-[1.03]`}
            loading={loading}
            fetchPriority={fetchPriority}
            sizes={sizes}
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
      <div className={`bg-white px-3 min-h-[44px] flex items-center justify-between gap-3 ${stretchCol ? 'mt-auto' : ''}`}>
        <div
          className="font-body-spec font-bold text-[13px] uppercase text-black tracking-tight leading-tight truncate"
          title={displayTitle}
        >
          {displayTitle}
        </div>
        <span className={`${tagColor} px-2 py-[3px] text-[11px] font-body-spec font-bold uppercase whitespace-nowrap flex-shrink-0 leading-none self-center`}>
          {displayTag}
        </span>
      </div>
    </Link>
  );
}