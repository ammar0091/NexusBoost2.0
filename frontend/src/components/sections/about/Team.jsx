import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchTeams } from '@/services/contentApi';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const members = await fetchTeams();
        if (isMounted) {
          setTeam(members);
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setTeam([]);
          setError(err.message || 'Failed to load team members');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => { isMounted = false; };
  }, []);

  return (
    <section className="relative py-24 bg-(--nb-surface-neo) overflow-hidden">
   

      <div className="nb-container relative z-10">
        
        {/* Editorial Header - Lean & Focused */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-1 rounded-full bg-(--nb-accent)" />
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-(--nb-accent)">
                Our Team
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-(--nb-text) leading-[0.95]">
              Human intelligence <br />
              <span className="italic font-serif text-(--nb-text-muted) opacity-80">fueling</span> digital.
            </h2>
          </div>
          
          <p className="max-w-sm text-sm leading-relaxed text-(--nb-text-muted)/80 tracking-wide font-light">
            A focused group of specialists combining SEO, data engineering, and creative design to solve real growth problems.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <p className="mb-10 text-xs font-bold uppercase tracking-widest text-red-400 border-l border-red-400 pl-4">{error}</p>
        )}

        {/* Team Grid - Compact & Sharp */}
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article key={member.id || member.name} className="group relative">
              {/* Image Frame - The Grayscale Logic */}
              <div className="aspect-3/4 overflow-hidden rounded-sm border border-(--nb-border)/30 bg-(--nb-surface-soft)/50 p-1">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover  transition-all duration-1000 group-hover:scale-105"
                />
              </div>

              {/* Identity Detail */}
              <div className="mt-6 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium tracking-tight text-(--nb-text)">{member.name}</h3>
                  <div className="h-6 w-6 flex items-center justify-center rounded-full border border-(--nb-border) opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight size={12} className="text-(--nb-accent)" />
                  </div>
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-(--nb-text-muted)/60">
                  {member.role}
                </p>
              </div>
            </article>
          ))}

          {/* Loading & Empty States */}
          {loading && (
            <div className="col-span-full py-10 border-t border-dashed border-(--nb-border)/30">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-(--nb-text-muted)/40 animate-pulse">Synchronizing Team...</p>
            </div>
          )}

          {!loading && !team.length && !error && (
            <div className="col-span-full py-10 border-t border-dashed border-(--nb-border)/30">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-(--nb-text-muted)/40">No members found in directory.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;