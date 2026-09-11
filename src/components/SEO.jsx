import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, pathname = '' }) {
  const defaultTitle = 'the Original Oat Drink Company | Oatly';
  const defaultDescription = 'A site filled with everything you could possibly think of, and also probably not think of, related to an oat drink company called Oatly.';
  const siteUrl = 'https://www.oatly.com';

  const fullTitle = title ? `${title} | Oatly` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const canonicalUrl = `${siteUrl}${pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
}
