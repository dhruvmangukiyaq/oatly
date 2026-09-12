import React from 'react';
import SEO from '../components/SEO';

export default function LegalPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8 font-sans pb-16">
      <SEO title="Legal Notices | Oatly" description="Legal notices, terms of use, and corporate disclosures." pathname="/legal" />

      <div className="bg-oatly-black text-white border-4 border-oatly-black p-8 shadow-brutal-xl space-y-2">
        <span className="badge-sticker bg-oatly-yellow text-oatly-black">CORPORATE</span>
        <h1 className="text-4xl font-black uppercase font-display text-white">LEGAL NOTICES & TERMS</h1>
      </div>

      <div className="bg-white border-4 border-oatly-black p-8 shadow-brutal space-y-4 text-sm leading-relaxed">
        <h2 className="font-display font-extrabold text-xl uppercase">1. Terms of Use</h2>
        <p>Welcome to Oatly.com. By using this website, you agree to comply with our terms and conditions. All content is published for informational purposes.</p>

        <h2 className="font-display font-extrabold text-xl uppercase mt-4">2. Intellectual Property</h2>
        <p>OATLY, the Oatly logo, and brand slogans are registered trademarks of Oatly AB in Sweden and international jurisdictions.</p>
      </div>
    </div>
  );
}
