export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-slate-800/60 bg-[#0B0F19]/70 px-8 py-4 backdrop-blur-xl mt-5">

        <h2 className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
          Triage
        </h2>

        <nav className="hidden gap-8 text-slate-300 md:flex">
          <a href="#" className="transition hover:text-cyan-400">Features</a>
          <a href="#" className="transition hover:text-cyan-400">Solutions</a>
          <a href="#" className="transition hover:text-cyan-400">Pricing</a>
          <a href="#" className="transition hover:text-cyan-400">About</a>
        </nav>

        <button className="rounded-xl bg-cyan-500 px-5 py-2 font-medium text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30">
          Sign In
        </button>

      </div>
    </header>
  );
}