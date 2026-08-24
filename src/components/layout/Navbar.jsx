import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="mx-auto mt-5 flex max-w-7xl items-center justify-between rounded-2xl border border-slate-800/60 bg-[#0B0F19]/70 px-8 py-4 backdrop-blur-xl">

        {/* Logo */}
        <Link
          href="/"
          className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-2xl font-bold text-transparent"
        >
          Triage
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-8 text-slate-300 md:flex">
          <a
            href="#how-it-works"
            className="transition hover:text-cyan-400"
          >
            How It Works
          </a>

          <a
            href="#faq"
            className="transition hover:text-cyan-400"
          >
            FAQ
          </a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-slate-300 transition hover:text-cyan-400"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-cyan-500 px-5 py-2 font-medium text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Register
          </Link>
        </div>

      </div>
    </header>
  );
}