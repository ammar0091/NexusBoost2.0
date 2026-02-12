import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Subtle Background Word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[18rem] font-black tracking-tighter text-white/5 select-none">
            NEXUS
          </span>
        </div>

        <div className="relative z-10 max-w-4xl">
          <p className="text-blue-400 font-black uppercase tracking-[0.4em] text-[11px] mb-8">
            About Nexus Boost
          </p>

          <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[0.95] mb-12">
            We don’t build <br />
            websites or campaigns.
            <br />
            <span className="text-slate-400">
              We engineer digital momentum.
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-3xl mb-12">
            Nexus Boost is a digital growth agency built for brands that refuse
            to stay average. We blend strategy, technology, and creativity to
            help businesses scale faster, smarter, and stronger in competitive
            markets.
          </p>

          <Link to="/about"className="group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest text-white border-b-2 border-white/20 pb-2 hover:border-blue-500 transition-all">
            Read our story
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
