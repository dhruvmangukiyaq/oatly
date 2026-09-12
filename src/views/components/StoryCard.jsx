import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import PlaceholderMedia from './PlaceholderMedia';

export default function StoryCard({ story, onClick }) {
  const cardContent = (
    <div className="bg-white border-4 border-oatly-black shadow-brutal hover:shadow-brutal-xl transition-all cursor-pointer group flex flex-col justify-between overflow-hidden h-full">
      {/* Media Slot via PlaceholderMedia */}
      {/* TODO: Swap in real licensed image file here */}
      <div className="border-b-4 border-oatly-black">
        <PlaceholderMedia
          aspectRatio="16:9"
          label={story.title || 'OATLY STORY'}
          subLabel={story.tag || story.type || 'STORY'}
          icon="📰"
          bgClass="bg-oatly-cream"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 mb-1">
            {story.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {story.date}</span>}
            {story.readTime && <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {story.readTime}</span>}
          </div>
          <h3 className="text-xl font-extrabold uppercase font-display text-oatly-black group-hover:text-oatly-blue transition-colors">
            {story.title}
          </h3>
          <p className="text-xs text-gray-700 font-sans mt-2 line-clamp-3 leading-relaxed">
            {story.excerpt || story.content}
          </p>
        </div>

        <div className="pt-3 border-t-2 border-oatly-black flex items-center justify-between text-xs font-extrabold uppercase text-oatly-black group-hover:text-oatly-blue">
          <span>READ STORY</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );

  if (story.slug) {
    return <Link to={`/things-we-do/${story.slug}`}>{cardContent}</Link>;
  }

  return <div onClick={onClick}>{cardContent}</div>;
}
