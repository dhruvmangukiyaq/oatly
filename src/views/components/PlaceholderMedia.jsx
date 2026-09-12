import React from 'react';

/**
 * PlaceholderMedia Component
 * 
 * Clean placeholder media block preserving exact aspect ratios.
 * 
 * TODO: Swap in real licensed image file here when official media files are dropped in.
 */
export default function PlaceholderMedia({
  aspectRatio = '16:9',
  bgClass = 'bg-[#EAE6DD]',
  className = ''
}) {
  let aspectStyle = 'aspect-video';
  if (aspectRatio === '1:1') aspectStyle = 'aspect-square';
  if (aspectRatio === '3:4') aspectStyle = 'aspect-[3/4]';
  if (aspectRatio === '16:9') aspectStyle = 'aspect-[16/9]';
  if (aspectRatio === '4:3') aspectStyle = 'aspect-[4/3]';
  if (aspectRatio === 'full' || aspectRatio === 'h-full') aspectStyle = 'h-full w-full';

  return (
    <div
      className={`relative w-full ${aspectStyle} ${bgClass} overflow-hidden flex items-center justify-center transition-colors ${className}`}
    >
      {/* TODO: Replace this empty container with <img src="/path/to/real-asset.jpg" className="w-full h-full object-cover" /> */}
    </div>
  );
}
