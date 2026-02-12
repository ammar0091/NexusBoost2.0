import React from 'react';
import PageHero from '@components/common/PageHero';

const PrivacyPolicy = () => {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="Policy"
        description="Understand how we collect, use, and protect your personal information."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8 text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900">Information Collection</h2>
          <p>We collect personal information when you use our services, such as name, email, and browsing behavior.</p>

          <h2 className="text-2xl font-bold text-slate-900">Use of Information</h2>
          <p>We use the information to improve our services, communicate with users, and personalize content.</p>

          <h2 className="text-2xl font-bold text-slate-900">Data Sharing</h2>
          <p>We do not sell your personal data. We may share information with trusted service providers to deliver services.</p>

          <h2 className="text-2xl font-bold text-slate-900">Cookies</h2>
          <p>We use cookies to enhance user experience, track usage, and deliver personalized content.</p>

          <h2 className="text-2xl font-bold text-slate-900">Your Rights</h2>
          <p>You can request access, correction, or deletion of your personal information at any time.</p>

          <p className="text-sm text-slate-500">Last updated: February 10, 2026</p>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
