import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap, TrendingUp, BarChart3, Users } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section className={`relative pt-32 pb-20 lg:pt-48 overflow-hidden ${isDark ? 'bg-black' : 'bg-[#fafafa]'}`}>
      {/* Decorative Background */}
      <div
        className={`absolute top-0 left-0 w-full h-full pointer-events-none ${isDark ? 'opacity-[0.05]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${isDark ? '%23ffffff' : '%23000000'}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Content */}
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-1 border text-[10px] font-bold uppercase tracking-[0.2em] mb-6 ${isDark ? 'border-blue-500/30 bg-blue-500/10 text-blue-300' : 'border-blue-200 text-blue-700'}`}>
            <Zap size={12} fill="currentColor" /> Premier Growth Agency
          </div>

          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[0.85] mb-8">
            WE CAPTURE <br />
            <span className="text-blue-600">ATTENTION.</span>
          </h1>

          <p className="text-xl text-slate-600 max-w-md leading-relaxed mb-10 font-medium">
            NexusBoost specializes in turning scrolling into clicking and interest into revenue. High-impact strategies for modern brands.
          </p>

          <div className="flex flex-wrap gap-5">
            {/* CTA Button → Link to Contact */}
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-slate-900 transition-all duration-300"
            >
              Start Your Growth <ArrowUpRight size={20} />
            </Link>

            {/* Client avatars */}
            <div className="flex items-center gap-4 px-2">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="client" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-none">500+ Results Driven</p>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Campaigns Live
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Visual */}
        <div className="relative">
          <div className={`w-full aspect-square rounded-[4rem] border relative overflow-hidden p-8 ${isDark ? 'bg-[#0A0A0A] border-neutral-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.65)]' : 'bg-white border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]'}`}>
            {/* Abstract Data Visualization */}
            <div className="h-full w-full flex flex-col gap-6">
              {/* Revenue Card */}
              <div className={`text-white p-8 rounded-3xl transform hover:scale-[1.02] transition-transform cursor-default ${isDark ? 'bg-black border border-neutral-800' : 'bg-slate-900'}`}>
                <div className="flex justify-between items-start mb-4">
                  <TrendingUp className="text-blue-400" size={32} />
                  <span className="bg-blue-500/20 text-blue-400 text-[10px] px-3 py-1 rounded-full font-bold">
                    +124%
                  </span>
                </div>
                <p className="text-3xl font-black tracking-tighter">ROI Driven</p>
                <p className="text-xs uppercase tracking-[0.2em] opacity-50 mt-1">Quarterly Growth</p>
              </div>

              <div className="grid grid-cols-2 gap-6 h-full">
                <div className={`p-2 rounded-[2.5rem] flex flex-col justify-center items-center text-center ${isDark ? 'bg-[#111111] border border-neutral-800' : 'bg-blue-50'}`}>
                  <Users className="text-blue-600 mb-2" size={28} />
                  <p className="text-2xl font-black text-slate-900">4.2M</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Reach</p>
                </div>
                <div className={`p-2 rounded-[2.5rem] flex flex-col justify-center items-center text-center border ${isDark ? 'bg-black border-neutral-800' : 'bg-slate-50 border-slate-200/50'}`}>
                  <BarChart3 className="text-slate-900 mb-2" size={28} />
                  <p className="text-2xl font-black text-slate-900">18%</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">CTR AVG</p>
                </div>
              </div>
            </div>

            {/* Decorative Blur */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full" />
          </div>

          {/* Floating Tag */}
          <div className={`absolute -top-6 -right-6 p-4 rounded-2xl flex items-center gap-3 animate-bounce-slow ${isDark ? 'bg-[#0A0A0A] border border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.45)]' : 'bg-white shadow-2xl'}`}>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-800">Live Analytics</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
