import React from 'react';
import PageHero from '@components/common/PageHero';

const TermsConditions = () => {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms &"
        highlight="Conditions"
        description="Rules and guidelines for using our services and website."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-8 text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900">Acceptance of Terms</h2>
          <p>By using our services, you agree to these terms and conditions. Please read them carefully.</p>

          <h2 className="text-2xl font-bold text-slate-900">Use of Services</h2>
          <p>You must use our services lawfully and responsibly, and you may not attempt to harm or disrupt them.</p>

          <h2 className="text-2xl font-bold text-slate-900">Intellectual Property</h2>
          <p>All content, branding, and software on this site are owned by us or licensed to us and protected by copyright.</p>

          <h2 className="text-2xl font-bold text-slate-900">Limitation of Liability</h2>
          <p>We are not liable for any damages arising from the use of our services, to the maximum extent allowed by law.</p>

          <h2 className="text-2xl font-bold text-slate-900">Changes to Terms</h2>
          <p>We may update these terms from time to time. Users are responsible for reviewing them periodically.</p>

          <p className="text-sm text-slate-500">Last updated: February 10, 2026</p>
        </div>
      </section>
    </>
  );
};

export default TermsConditions;
