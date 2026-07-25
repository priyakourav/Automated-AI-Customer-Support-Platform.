import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0B0F19] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Triage
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            AI-powered customer support platform built for modern businesses.
          </p>
        </div>

        <div className="flex gap-8 text-slate-400">

          <Link href="#" className="transition hover:text-cyan-400">
            Features
          </Link>

          <Link href="#" className="transition hover:text-cyan-400">
            FAQ
          </Link>

          <Link href="#" className="transition hover:text-cyan-400">
            Contact
          </Link>

        </div>

      </div>

      <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        © 2026 Triage. All rights reserved.
      </div>
    </footer>
  );
}