import React from 'react';
import { useParams, Link } from 'react-router-dom';
// ─── MVC: View ─── detail via Controller ─────────────────────────────────────
import { useStoryDetailController } from '../../controllers/useContentControllers.js';
import { ArrowLeft, Calendar, Clock, Sparkles } from 'lucide-react';
import PlaceholderMedia from '../components/PlaceholderMedia';
import SEO from '../components/SEO';

export default function NewsStoryDetailPage() {
  // CONTROLLER (uses NewsModel internally)
  const { story: found, slug } = useStoryDetailController();

  const story = found || { title: 'Story not found', excerpt: '', slug, content: '' };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8 font-sans pb-16">
      <SEO
        title={story.title}
        description={story.excerpt}
        pathname={`/things-we-do/${story.slug}`}
      />

      <Link
        to="/news"
        className="btn-oatly-secondary text-xs py-2.5 px-5 inline-flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO STORIES & NEWS
      </Link>

      <div className="bg-white border-4 border-oatly-black shadow-brutal-xl overflow-hidden p-6 md:p-10 space-y-6">
        
        {/* Hero Media Slot */}
        {story.image ? (
          <div className="relative w-full overflow-hidden bg-oatly-cream" style={{ aspectRatio: '16/9' }}>
            <img
              src={story.image}
              alt={story.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : (
          <PlaceholderMedia
            aspectRatio="16:9"
            label={story.title}
            subLabel={story.tag}
            icon="📰"
            bgClass="bg-oatly-blue text-white"
          />
        )}

        <div className="space-y-3 border-b-4 border-oatly-black pb-6">
          <div className="flex items-center gap-4 text-xs font-mono font-bold text-gray-600">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-oatly-pink" /> {story.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-oatly-blue" /> {story.readTime}</span>
            <span>•</span>
            <span className="badge-sticker bg-oatly-yellow text-oatly-black">{story.type}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black uppercase font-display text-oatly-black leading-tight">
            {story.title}
          </h1>
        </div>

        <div className="p-4 bg-oatly-cream border-2 border-oatly-black font-hand text-lg text-oatly-black shadow-brutal-sm">
          "{story.excerpt}"
        </div>

        <div className="prose prose-lg max-w-none text-gray-800 font-sans leading-relaxed space-y-4">
          <p>{story.content}</p>
          <p>
            At Oatly, we believe that transparency isn’t just a corporate buzzword — it’s the foundation of everything we do. Whether testing natural fertilizer loops or hosting runway fashion shows, our goal is to make plant-based living irresistible, fun, and easy for everyone.
          </p>
        </div>

      </div>

    </div>
  );
}
