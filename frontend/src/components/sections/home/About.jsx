import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-20 relative overflow-hidden ${isDark ? "bg-black text-white" : "bg-white text-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Subtle Background Word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`text-[18rem] font-black tracking-tighter select-none ${isDark ? "text-white/5" : "text-slate-900/5"}`}>
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
            <span className={isDark ? "text-slate-400" : "text-slate-500"}>
              We engineer digital momentum.
            </span>
          </h2>

          <p className={`text-lg lg:text-xl leading-relaxed max-w-3xl mb-12 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            Nexus Boost is a digital growth agency built for brands that refuse
            to stay average. We blend strategy, technology, and creativity to
            help businesses scale faster, smarter, and stronger in competitive
            markets.
          </p>

          <Link
            to="/about"
            className={`group inline-flex items-center gap-4 text-sm font-black uppercase tracking-widest border-b-2 pb-2 hover:border-blue-500 transition-all ${
              isDark ? "text-white border-white/20" : "text-slate-900 border-slate-300"
            }`}
          >
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
