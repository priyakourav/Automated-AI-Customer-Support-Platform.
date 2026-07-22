import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0B0F19] px-6 pt-24">
      {/* Background Glow Effects */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b20,transparent_60%)]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row lg:justify-between">
        {/* LEFT CONTENT */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400">
            AI Customer Support Platform
          </span>

          <h1 className="mt-4 bg-gradient-to-r from-white via-cyan-300 to-cyan-500 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent md:text-7xl">
            Triage
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Resolve customer queries instantly with AI-powered voice and text
            support. Built for modern businesses with speed, automation, and a
            seamless user experience.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row lg:justify-start justify-center">
            <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:shadow-cyan-400/50">
              Get Started
            </button>

            <button className="rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3 font-semibold text-slate-200 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500">
              Live Demo
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <DashboardPreview />
      </div>
    </section>
  );
}