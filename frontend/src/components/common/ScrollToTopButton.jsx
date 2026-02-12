import React, { useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors"
    >
      <span className="text-xs font-black uppercase tracking-widest">
        Top
      </span>

      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all">
        <ArrowUp size={16} />
      </div>
    </button>
  );
};

export default ScrollToTopButton;
