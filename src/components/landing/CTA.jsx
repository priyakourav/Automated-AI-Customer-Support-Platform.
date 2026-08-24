import Link from "next/link";
export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] px-6 py-24">

      {/* Glow Background */}
      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl rounded-3xl border  shadow-2xl shadow-cyan-500/10 border-slate-800 bg-slate-900/60 p-12 text-center backdrop-blur-xl">

        <span className="rounded-full border border-cyan-500/30 bg-cyan-400/20 px-4 py-1 text-sm text-cyan-400">
          GET STARTED
        </span>

        <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
          Ready to Experience
<span className="block bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">
  Triage AI?
</span>
        </h2>

        <p className="relative mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center backdrop-blur-xl shadow-2xl shadow-cyan-500/10 transition-all duration-500 hover:border-cyan-500/40 hover:shadow-cyan-500/20">
          Empower your support experience with AI-powered conversations through
text and voice, with seamless escalation to support tickets when human
assistance is needed.
        </p>

        <div className="mt-10 flex justify-center">
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

      </div>

    </section>
  );
}