import { useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className="group flex items-center gap-3 text-[var(--nb-text-muted)] hover:text-[var(--nb-text)] transition-colors"
    >
      <span className="text-xs font-black uppercase tracking-[0.18em]">Top</span>

      <span className="w-9 h-9 rounded-xl border border-[var(--nb-border)] bg-[var(--nb-surface)] flex items-center justify-center transition-all group-hover:border-[var(--nb-accent)] group-hover:text-[var(--nb-accent)]">
        <ArrowUp size={16} />
      </span>
    </button>
  );
};

export default ScrollToTopButton;
