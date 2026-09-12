import React from 'react';
import { Link } from 'react-router-dom';
import FlatCard from './FlatCard';

/**
 * Section 1: News/Content Grid Component
 * Updated to use FlatCard for consistency with News page
 */
export default function NewsGridSection() {
  // Featured article data (matching News page)
  const featuredArticle = {
    id: 'pee-for-the-planet',
    title: 'Pee for the Planet',
    type: 'Initiative',
    date: 'Autumn 2025',
    readTime: '4 min read',
    excerpt: 'How human urine might hold the key to sustainable oat agriculture in Northern Europe. Yes, we are serious.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    tag: 'SUSTAINABILITY INNOVATION'
  };

  const newsItems = [
    {
      id: 'climate-solutions',
      title: 'OATLY HAS QUALIFIED AS CLIMATE SOLUTIONS COMPANY',
      type: 'Sustainability',
      date: 'Autumn 2025',
      readTime: '3 min read',
      excerpt: 'We\'ve officially qualified as a climate solutions company. Here\'s what that means for the planet and your oat milk.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      tag: 'SUSTAINABILITY'
    },
    {
      id: 'ef-pro-cycling',
      title: 'SUPPORTING EF PRO BIKERS',
      type: 'Initiative',
      date: 'Summer 2025',
      readTime: '6 min read',
      excerpt: 'How pro cyclists rode through the Tour de France powered by oat smoothies.',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46184?auto=format&fit=crop&w=800&q=80',
      tag: 'NEWS'
    },
    {
      id: 'future-of-taste',
      title: 'THE MYSTERIES LOCKED INSIDE N...',
      type: 'Initiative',
      date: 'Spring 2025',
      readTime: '5 min read',
      excerpt: 'Exploring the future of flavor with our global taste lab partners.',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
      tag: 'NEWS'
    },
    {
      id: 'oatly-who',
      title: 'OATLY WHO',
      type: 'Sustainability',
      date: '2024',
      readTime: '4 min read',
      excerpt: 'Our origin story - from Swedish university lab to global oat drink company.',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
      tag: 'SUSTAINABILITY'
    },
  ];

  return (
    <section className="bg-graph-paper py-8 px-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto font-sans">
      
      {/* Featured Story Hero Card - Two Column Layout like News Page */}
      <div className="mb-10">
        <Link
          to="/things-we-do/pee-for-the-planet"
          className="group overflow-hidden border border-[#111111] bg-white transition-all duration-300 hover:shadow-brutal"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image Column - 7/12 */}
            <div className="lg:col-span-7 relative min-h-[300px] overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className="badge-sticker bg-[#111111] text-white text-[11px]">FEATURED STORY</span>
              </div>
            </div>

            {/* Content Column - 5/12 */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-mono font-bold text-gray-600">
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black uppercase font-display text-[#111111] group-hover:text-[#002766] transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-sm text-gray-800 leading-relaxed font-sans">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t-2 border-[#111111] flex items-center justify-between font-extrabold text-xs uppercase text-[#002766] group-hover:underline">
                <span>READ FULL INITIATIVE REPORT</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4-4 4m-6-12l4 4-4 4"/></svg>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Stories Feed Grid - Using FlatCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((news) => (
          <FlatCard
            key={news.id}
            title={news.title}
            tag={news.tag}
            imageSrc={news.image}
            imageAlt={news.title}
            linkTo={`/things-we-do/${news.id}`}
            aspectRatio="4/3"
            className="min-h-[380px]"
          />
        ))}
      </div>

    </section>
  );
}