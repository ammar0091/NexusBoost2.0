const OurStory = () => {
  return (
    <section className="relative py-24  overflow-hidden">
      {/* Decorative Background Circle */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-100 rounded-full opacity-20 animate-pulse-slow" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-200 rounded-full opacity-10" />

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Img Column */}
        <img
            src="https://images.unsplash.com/photo-1605902711622-cfb43c4437c9?auto=format&fit=crop&w=800&q=80"
            alt="Our Story"
            className="rounded-3xl shadow-2xl object-cover w-full h-full"
          />

        {/* Text Column */}
        <div className="relative">
          
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="space-y-6">
          <p className="text-blue-600 font-black uppercase tracking-[0.2em] text-sm">
            Our Story
          </p>

          <h2 className="text-4xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
            Built from frustration, <br />
            <span className="text-blue-600">crafted for results.</span>
          </h2>

          <div className="space-y-4 text-lg text-slate-700">
            <p>
              Nexus Boost was born out of a simple observation: most agencies were
              selling promises, not outcomes. Clients paid for reports, not real growth.
            </p>

            <p>
              We created Nexus Boost to focus on measurable impact. Our mission is clear:
              increase traffic that converts, campaigns that scale, and strategies that move revenue.
            </p>

            <p>
              Today, we partner with ambitious startups and growing businesses, providing a long-term
              growth team — not just another vendor.
            </p>
          </div>

         
        </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
