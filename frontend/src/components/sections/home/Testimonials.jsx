import { useTheme } from '@/context/ThemeContext';

const Testimonials = () => {
  const { isDark } = useTheme();
  const reviews = [
    { name: "Alex Rivera", role: "CEO, TechFlow", text: "NexusBoost delivered our platform 2 weeks ahead of schedule. Performance is insane." },
    { name: "Sarah Chen", role: "Founder, Bloom", text: "The UI they designed is literally winning us awards. Best investment we've made." }
  ];

  return (
    <section className={`py-24 rounded-[3rem] mx-4 my-10 ${isDark ? "bg-black text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-black tracking-tighter mb-16 text-center">TRUSTED BY VISIONARIES</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`p-10 rounded-4xl backdrop-blur-md ${
                isDark ? "bg-white/5 border border-white/10" : "bg-white border border-slate-200"
              }`}
            >
              <p className="text-xl font-medium  mb-8">"{r.text}"</p>
              <div>
                <p className="font-black text-blue-400 uppercase tracking-widest text-xs">{r.name}</p>
                <p className="text-slate-500 text-sm">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
