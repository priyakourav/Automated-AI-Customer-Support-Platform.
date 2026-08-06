"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      alert(data.message);
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/60 p-10 backdrop-blur-xl">

        <h1 className="text-center text-3xl font-bold text-white">
          Create Account
        </h1>

        <p className="mt-2 text-center text-slate-400">
          Join Triage and start managing customers smarter.
        </p>

        <form
          className="mt-10 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
            />
          </div>

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

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition"
              >
                {showPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400"
          >
            Create Account
          </button>

          <p className="text-center text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-cyan-400 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}

