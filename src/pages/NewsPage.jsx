import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// ─── MVC: View ─── data via Model (async Express API) ──────────────────────────
import NewsModel from '../models/newsModel.js';
import { useApiData } from '../hooks/useApiData.js';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/News.css';

export default function NewsPage({ onSelectArticle }) {
  const [selectedType, setSelectedType] = useState('All');

  const types = ['All', 'Initiative', 'Stories', 'Collaborations'];

  // MODEL (async API — page renders once news arrive)
  const NEWS_DATA = useApiData(() => NewsModel.getAllNews(), []);
  if (!NEWS_DATA) return null;
  const filteredNews = NEWS_DATA.filter((n) => {
    if (selectedType === 'All') return true;
    return n.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  const featuredArticle = NEWS_DATA[0];

return (
    <div className="ns-news">
      <SEO
        title="News, Stories & Brainwashing | Oatly"
        description="From urine recycling experiments in Sweden to high-fashion Paris runway shows, read all about what we do when we're not turning oats into drinkable liquid."
        pathname="/news"
      />
      {/* ── Breadcrumb ── */}
      <nav className="ns-crumb__wrap" aria-label="Breadcrumb">
        <ol className="ns-crumb__list">
          <li>
            <Link to="/" className="ns-crumb__link" aria-label="Home">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </Link>
          </li>
          <li><span className="ns-crumb__sep" aria-hidden="true">›</span></li>
          <li><Link to="/news" className="ns-crumb__link">Things We Do</Link></li>
          <li><span className="ns-crumb__sep" aria-hidden="true">›</span></li>
          <li><span className="ns-crumb__current" aria-current="page">News, Stories & Brainwashing</span></li>
        </ol>
      </nav>

      {/* ── Hero Banner ── */}
      <header className="ns-news__hero">
        <div className="ns-news__hero-inner">
          <span className="ns-news__kicker">THINGS WE DO</span>
          <h1 className="ns-news__title">NEWS, STORIES & BRAINWASHING.</h1>
          <p className="ns-news__lead">
            From urine recycling experiments in Sweden to high-fashion Paris runway shows,
            read all about what we do when we&rsquo;re not turning oats into drinkable liquid.
          </p>
        </div>
      </header>

      {/* ── Filter Tabs ── */}
      <div className="ns-news__filter" role="tablist" aria-label="Filter stories by type">
        {['All', 'Initiative', 'Stories', 'Collaborations'].map((type) => (
          <button
            key={type}
            role="tab"
            aria-selected={selectedType === type}
            onClick={() => setSelectedType(type)}
            className={`ns-news__tab${selectedType === type ? ' ns-news__tab--active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ── Featured Article ── */}
      {featuredArticle && (
        <article className="ns-news__featured" onClick={() => onSelectArticle(featuredArticle)}>
          <figure className="ns-news__featured-media">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="ns-news__featured-img"
              loading="eager"
            />
            <figcaption className="ns-news__featured-tag">FEATURED STORY</figcaption>
          </figure>
          <div className="ns-news__featured-body">
            <div className="ns-news__featured-meta">
              <time dateTime={featuredArticle.date}>{featuredArticle.date}</time>
              <span aria-hidden="true">•</span>
              <span>{featuredArticle.readTime}</span>
            </div>
            <h2 className="ns-news__featured-title">{featuredArticle.title}</h2>
            <p className="ns-news__featured-excerpt">{featuredArticle.excerpt}</p>
            <footer className="ns-news__featured-footer">
              <span>READ FULL INITIATIVE REPORT</span>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </footer>
          </div>
        </article>
      )}

      {/* ── Filter Tabs (compact) ── */}
      <div className="ns-news__filter ns-news__filter--compact" role="tablist" aria-label="Filter stories by type">
        {['All', 'Initiative', 'Stories', 'Collaborations'].map((type) => (
          <button
            key={type}
            role="tab"
            aria-selected={selectedType === type}
            onClick={() => setSelectedType(type)}
            className={`ns-news__tab${selectedType === type ? ' ns-news__tab--active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ── Stories Feed Grid ── */}
      <section aria-label="Stories feed">
        <div className="ns-news__grid">
          {filteredNews.map((news) => (
            <article key={news.id} className="ns-news__card" onClick={() => onSelectArticle(news)}>
              <figure className="ns-news__card-media">
                <img
                  src={news.image}
                  alt={news.title}
                  className="ns-news__card-img"
                  loading="lazy"
                />
                <figcaption className="ns-news__card-tag">{news.tag}</figcaption>
              </figure>
              <div className="ns-news__card-body">
                <div className="ns-news__card-meta">
                  <span>{news.type}</span>
                  <span aria-hidden="true">•</span>
                  <span>{news.readTime}</span>
                </div>
                <h3 className="ns-news__card-title">{news.title}</h3>
                <p className="ns-news__card-excerpt">{news.excerpt}</p>
                <footer className="ns-news__card-footer">
                  <span>READ STORY</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}