"use client";

import { motion } from "framer-motion";

export default function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{
        y: -8,
        boxShadow: "0 0 50px rgba(14,165,233,0.25)",
      }}
      className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#161F30]/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          AI Support
        </h2>

        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
          ● Online
        </span>
      </div>

      {/* Chat */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-slate-700/40 p-4"
        >
          <p className="text-xs text-slate-400">
            👤 Customer
          </p>

          <p className="mt-2 text-slate-200">
            My notifications aren't working.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl border border-cyan-500/20 bg-cyan-500/15 p-4"
        >
          <p className="text-xs text-cyan-300">
            🤖 Triage AI
          </p>

          <p className="mt-2 text-cyan-100">
            Let's troubleshoot that together. I'll guide you through a few
            steps to identify the issue.
          </p>
        </motion.div>
      </div>

      {/* Voice Assistant */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 rounded-2xl bg-slate-800/60 p-4"
      >
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium text-white">
            🎙 Voice Assistant
          </p>

          <span className="text-sm text-cyan-400">
            Listening...
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="h-full rounded-full bg-cyan-400"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 grid grid-cols-3 gap-3"
      >
        <div className="rounded-2xl bg-slate-800/60 p-4 text-center transition hover:scale-105">
          <h3 className="text-2xl font-bold text-cyan-400">
            Text + Voice
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Support
          </p>
        </div>

        <div className="rounded-2xl bg-slate-800/60 p-4 text-center transition hover:scale-105">
          <h3 className="text-2xl font-bold text-cyan-400">
            AI Triage
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Smart
          </p>
        </div>

        <div className="rounded-2xl bg-slate-800/60 p-4 text-center transition hover:scale-105">
          <h3 className="text-2xl font-bold text-cyan-400">
            24/7
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Available
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}