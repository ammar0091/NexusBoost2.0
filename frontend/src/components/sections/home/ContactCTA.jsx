import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Bento-style Grid for Compactness */}
        <div className="bg-slate-50 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="text-left max-w-xl">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Sparkles size={12} /> Let's grow your brand
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">
              Ready to <span className="text-blue-600 ">Scale?</span>
            </h2>

            <p className="text-slate-500 text-base md:text-lg leading-relaxed">
              Transforming ideas into digital excellence. Your growth story starts with a single conversation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Primary Action */}
            <Link to="/contact"
             className="w-full sm:w-auto group px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:bg-blue-600 active:scale-95 shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
              Start Project 
              <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            {/* Secondary Action */}
            <a href="mailto:hello@nexus.com" 
               className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm uppercase tracking-widest hover:bg-white transition-all">
              <Mail size={16} /> Email Us
            </a>
          </div>
        </div>

        {/* Ultra-Compact Stats Bar */}
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-8 px-4">
           <div className="flex items-center gap-2">
             <span className="text-lg font-bold text-slate-900">100+</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Clients</span>
           </div>
           <div className="w-px h-4 bg-slate-200 hidden md:block self-center" />
           <div className="flex items-center gap-2">
             <span className="text-lg font-bold text-slate-900">98%</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</span>
           </div>
           <div className="w-px h-4 bg-slate-200 hidden md:block self-center" />
           <div className="flex items-center gap-2">
             <span className="text-lg font-bold text-slate-900">24/7</span>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expert Support</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;