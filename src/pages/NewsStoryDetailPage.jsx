import React from 'react';
import { useParams } from 'react-router-dom';
import { useStoryDetailController } from '../controllers/useContentControllers.js';
import { ArrowLeft, Calendar, Clock, Sparkles } from 'lucide-react';
import PlaceholderMedia from '../components/PlaceholderMedia';
import ResponsiveImage from '../components/ResponsiveImage';
import SEO from '../components/SEO';
import '../styles/NewsStory.css';

/* ==========================================================================
   NEWS STORY DETAIL — mirrors oatly.com/things-we-do/initiatives/pee-for-the-planet
   Editorial layout: hero image → tag + h1 (Girdo/Toni Noveau) →
   rich text body (Margo Pro) → centered images → narrow content column (width14)
   TOKENS (src/styles/index.css): --spec-*, --font-ui, --font-serif, --font-display
   ========================================================================== */

export default function NewsStoryDetailPage() {
  const { slug, '*': splat } = useParams();
  const routeSlug = slug ?? splat?.split('/').pop();
  // CONTROLLER (uses NewsModel over the Express API)
  const { story: found } = useStoryDetailController(routeSlug);
  if (found === undefined) return null;

  const story = found || { title: 'Story not found', excerpt: '', slug: routeSlug, content: '' };

  return (
    <>
      <SEO
        title={`${story.title} | Oatly`}
        description={story.excerpt}
        pathname={`/things-we-do/${story.path || story.slug}`}
      />
      <div className="ns-story">
        {/* ── Hero: full-width image ── */}
        <section className="ns-story__hero" aria-label="Story hero">
          {story.image ? (
            <figure className="ns-story__figure">
              <ResponsiveImage
                src={story.image}
                alt={story.title}
                className="ns-story__img"
                widths={[768, 1200, 1600]}
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
              />
            </figure>
          ) : (
            <PlaceholderMedia
              aspectRatio="16:9"
              label={story.title}
              subLabel={story.tag}
              icon="📰"
              bgClass="bg-oatly-blue text-white"
            />
          )}
        </section>

        {/* ── Content column (width14 equivalent) ── */}
        <main className="ns-story__main">
          <div className="ns-story__content">
            {/* ── Tag + Title block ── */}
            <header className="ns-story__header">
              {story.tag && (
                <span className={`ns-story__tag ns-story__tag--${(story.tagColor || 'black').toLowerCase()}`}>
                  {story.tag}
                </span>
              )}
              <h1 className="ns-story__title">{story.title}</h1>
              {story.excerpt && (
                <p className="ns-story__excerpt">{story.excerpt}</p>
              )}
            </header>

            {/* ── Meta line ── */}
            <div className="ns-story__meta">
              <time dateTime={story.date}>{story.date}</time>
              <span aria-hidden="true">•</span>
              <span>{story.readTime}</span>
              <span aria-hidden="true">•</span>
              <span className="ns-story__type">{story.type || 'Story'}</span>
            </div>

            {/* ── Rich text body ── */}
            <div className="ns-story__body">
              {story.content && (
                <div className="ns-story__richtext">
                  {story.content.split('\n\n').map((p, i) => (
                    <p key={i} className="ns-story__p">{p}</p>
                  ))}
                </div>
              )}
              {/* Fallback for stories without structured content */}
              {!story.content && (
                <p className="ns-story__p">
                  At Oatly, we believe that transparency isn't just a corporate buzzword — it's the foundation of everything we do. Whether testing natural fertilizer loops or hosting runway fashion shows, our goal is to make plant-based living irresistible, fun, and easy for everyone.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}