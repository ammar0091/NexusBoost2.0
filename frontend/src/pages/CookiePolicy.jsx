import React from 'react';
import PageHero from '@components/common/PageHero';

const CookiePolicy = () => {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie"
        highlight="Policy"
        description="How we use cookies and similar technologies to enhance your experience."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8 text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900">What Are Cookies?</h2>
          <p>Cookies are small files stored on your device that help improve website functionality and user experience.</p>

          <h2 className="text-2xl font-bold text-slate-900">Types of Cookies We Use</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Essential:</strong> Required for basic site functions.</li>
            <li><strong>Performance:</strong> Helps us understand user interactions and improve performance.</li>
            <li><strong>Marketing:</strong> Used to personalize content and track campaign effectiveness.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900">Managing Cookies</h2>
          <p>You can adjust your browser settings to block or delete cookies, but some features may not work properly.</p>

          <p className="text-sm text-slate-500">Last updated: February 10, 2026</p>
        </div>
      </section>
    </>
  );
};

export default CookiePolicy;
