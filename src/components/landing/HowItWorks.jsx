import { workflow } from "@/data/workflow";

export default function HowItWorks() {
  return (
    <section className="bg-[#0B0F19] px-6 py-24">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Three Simple Steps To
            <span className="block bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Smarter Customer Support
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Triage automates your support workflow using powerful AI so every
            customer receives fast and accurate assistance.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-3">

          {workflow.map((item, index) => (

            <div
              key={index}
              className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:border-cyan-500/50 hover:shadow-[0_0_45px_rgba(6,182,212,0.25)]"
            >

              <span className="absolute right-6 top-6 text-5xl font-extrabold text-slate-800 transition-all duration-300 group-hover:text-cyan-500/20">
                {item.step}
              </span>

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">

                <item.icon size={30} />

              </div>

              <h3 className="text-2xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}