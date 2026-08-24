import Link from "next/link";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#0B0F19] px-6 pt-24">
      {/* Background Glow */}
      <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />

      <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b20,transparent_60%)]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-16 lg:flex-row lg:justify-between">
        {/* LEFT */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-400">
            AI Customer Support Platform
          </span>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-5xl">
            AI Customer Support
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-500 bg-clip-text text-transparent">
              That Never Sleeps.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
            Automate customer conversations with intelligent text and voice
            support. Triage understands customer issues, provides instant
            assistance, and escalates unresolved problems into support tickets
            when human help is needed.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/chat"
              className="group rounded-xl bg-cyan-500 px-7 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
            >
              <span className="flex items-center gap-2">
                Try Triage AI
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]">
              <h3 className="text-3xl font-bold text-cyan-400">
                Text & Voice
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Support Modes
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]">
              <h3 className="text-3xl font-bold text-cyan-400">
                AI Powered
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Smart Responses
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]">
              <h3 className="text-3xl font-bold text-cyan-400">
                24/7
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                AI Support
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <DashboardPreview />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border border-slate-600">
          <div className="mt-2 h-2 w-2 rounded-full bg-cyan-400"></div>
        </div>
      </div>
    </section>
  );
}