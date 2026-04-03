import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
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

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="nb-section">
      <div className="nb-container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="nb-pill mb-4 inline-flex border border-(--nb-border) bg-(--nb-surface) text-(--nb-accent)">
            <Users size={12} />
            Our Team
          </p>

         

          <p className="mt-4 leading-relaxed text-(--nb-text-muted)">
            A focused team combining SEO strategy, content planning, paid media execution, design, and web development to build scalable growth systems for modern brands.
          </p>
        </div>

        {error ? (
          <p className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">{error}</p>
        ) : null}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id || member.name} className="nb-panel group overflow-hidden p-3">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-72 w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="pt-4 text-center">
                <h3 className="font-semibold text-(--nb-text)">{member.name}</h3>
                <p className="text-sm text-(--nb-text-muted)">{member.role}</p>
              </div>
            </div>
          ))}

          {loading && <div className="col-span-full text-center text-sm text-(--nb-text-muted)">Loading team...</div>}

          {!loading && !team.length && (
            <div className="col-span-full text-center text-sm text-(--nb-text-muted)">Team members will appear here soon.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
