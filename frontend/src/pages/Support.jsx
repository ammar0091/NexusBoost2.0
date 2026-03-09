import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const SupportPage = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-20 min-h-screen ${isDark ? "bg-black" : "bg-[#f9fafb]"}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 pt-24">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-4">
            Need <span className="text-blue-600">Help?</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Our team is here to answer your questions, solve issues, and help you get the most out of our services.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          <div
            className={`p-8 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow ${
              isDark ? "bg-[#0A0A0A] border border-neutral-800" : "bg-white"
            }`}
          >
            <Mail size={32} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-slate-600 mb-2">support@nexusboost.com</p>
            <a href="mailto:support@nexusboost.com" className="text-blue-600 font-semibold hover:underline">
              Send Email
            </a>
          </div>
          <div
            className={`p-8 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow ${
              isDark ? "bg-[#0A0A0A] border border-neutral-800" : "bg-white"
            }`}
          >
            <Phone size={32} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-slate-600 mb-2">+1 (555) 123-4567</p>
            <a href="tel:+15551234567" className="text-blue-600 font-semibold hover:underline">
              Call Now
            </a>
          </div>
          <div
            className={`p-8 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-xl transition-shadow ${
              isDark ? "bg-[#0A0A0A] border border-neutral-800" : "bg-white"
            }`}
          >
            <MessageCircle size={32} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Live Chat</h3>
            <p className="text-slate-600 mb-2">Chat with our support team instantly</p>
            <a href="/chat" className="text-blue-600 font-semibold hover:underline">
              Start Chat
            </a>
          </div>
        </div>



        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How long does it take to get a response?", a: "Our team typically responds within 24 hours." },
              { q: "Can I upgrade my plan anytime?", a: "Yes, you can upgrade or downgrade your plan at any time." },
              { q: "Do you offer custom solutions?", a: "Absolutely, we provide tailor-made strategies for each client." },
            ].map((item, index) => (
              <details
                key={index}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:bg-white hover:shadow-md transition-all"
              >
                <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                  {item.q}
                </summary>
                <p className="mt-2 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
