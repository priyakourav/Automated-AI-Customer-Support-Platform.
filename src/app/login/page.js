"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    console.log("Logging in...");

    console.log({
      email,
      password,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/60 p-10 backdrop-blur-xl">
        <h1 className="text-center text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-center text-slate-400">
          Login to continue to Triage
        </p>

        <form className="mt-10 space-y-6">
          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}