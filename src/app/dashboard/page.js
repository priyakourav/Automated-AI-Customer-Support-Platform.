"use client";

import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-4 text-slate-400">
          🎉 Login Successful
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 rounded-xl bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-400"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
