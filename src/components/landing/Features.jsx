import { features } from "@/data/features";

export default function Features() {
  return (
    <section className="bg-[#0B0F19] px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400">
            FEATURES
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Everything You Need For
            <span className="block bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Modern Customer Support
            </span>
          </h2>

          <p className="mt-6 text-base md:text-lg leading-7 text-slate-400">
            Triage combines AI, automation and real-time analytics to help
            businesses deliver faster, smarter and more reliable customer
            support.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:border-cyan-500/50 hover:shadow-[0_0_45px_rgba(6,182,212,0.25)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
                <feature.icon size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}