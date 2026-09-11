import React from 'react';
import { Link } from 'react-router-dom';
import PlaceholderMedia from './PlaceholderMedia';

const tagClassMap = {
  'NEWS': 'tag-news',
  'PRODUCTS': 'tag-products',
  'TASTEBUDS': 'tag-tastebuds',
  'SUSTAINABILITY': 'tag-sustainability',
  'HEALTH': 'tag-health',
  'OTHER': 'tag-other',
};

export default function BentoCard({
  title,
  tag = 'NEWS',
  aspectRatio = '16:9',
  linkTo = '/',
  bgClass = 'bg-[var(--color-cream)]',
  className = '',
  extraBadge = null
}) {
  const tagClass = tagClassMap[tag] || 'tag-news';

  return (
    <Link
      to={linkTo}
      className={`card-base group ${className}`}
    >
      {/* Optional Top Overlay Badge */}
      {extraBadge && (
        <div className="absolute top-2 left-2 z-10">
          <span className="badge-sticker">{extraBadge}</span>
        </div>
      )}

      {/* Media Slot via PlaceholderMedia */}
      <div className={`card-image ${aspectRatio === 'h-full' ? 'flex-1' : ''}`}>
        <PlaceholderMedia
          aspectRatio={aspectRatio}
          bgClass={bgClass}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Bottom Tag Bar */}
      <div className="card-footer">
        <div className="card-title">
          {title}
        </div>
        <div className={`card-tag ${tagClass}`}>
          {tag}
        </div>
      </div>
    </Link>
  );
}