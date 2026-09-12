import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 space-y-8 font-sans pb-16">
      <SEO title="Privacy Policy | Oatly" description="How Oatly collects, protects, and respects your privacy." pathname="/legal/privacy-policy" />

      <div className="bg-oatly-blue text-white border-4 border-oatly-black p-8 shadow-brutal-xl space-y-2">
        <span className="badge-sticker bg-oatly-yellow text-oatly-black">PRIVACY & COOKIES</span>
        <h1 className="text-4xl font-black uppercase font-display text-white">PRIVACY POLICY</h1>
      </div>

      <div className="bg-white border-4 border-oatly-black p-8 shadow-brutal space-y-4 text-sm leading-relaxed">
        <h2 className="font-display font-extrabold text-xl uppercase">1. How We Treat Your Data</h2>
        <p>We respect your privacy. If you sign up for our Fan Club newsletter or submit a contact message, we use your email solely to reply to you or send Oatly updates.</p>

        <h2 className="font-display font-extrabold text-xl uppercase mt-4">2. Cookies</h2>
        <p>We use essential cookies to keep our website running smoothly. No invasive tracking or selling of your data to third-party data brokers.</p>
      </div>
    </div>
  );
}
