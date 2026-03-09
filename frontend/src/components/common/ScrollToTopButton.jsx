import React, { useCallback } from 'react';
import { ArrowUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ScrollToTopButton = () => {
  const { isDark } = useTheme();

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={`group flex items-center gap-3 transition-colors ${
        isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
      }`}
    >
      <span className="text-xs font-black uppercase tracking-widest">
        Top
      </span>

      <div
        className={`w-9 h-9 rounded-xl border flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all ${
          isDark ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
        }`}
      >
        <ArrowUp size={16} />
      </div>
    </button>
  );
};

export default ScrollToTopButton;
