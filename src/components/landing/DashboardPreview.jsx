// src/components/landing/DashboardPreview.jsx

export default function DashboardPreview() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl shadow-cyan-500/10">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          AI Support
        </h3>

        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
          Online
        </span>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl bg-slate-800 p-4 text-slate-300">
          👤 Customer:
          <br />
          I can't track my order.
        </div>

        <div className="rounded-xl bg-cyan-500/20 p-4 text-cyan-300">
          🤖 AI:
          <br />
          I found your shipment. It will arrive tomorrow.
        </div>
      </div>
    </div>
  );
}