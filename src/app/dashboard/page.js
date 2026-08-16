"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [category, setCategory] = useState("");

  useEffect(() => {
  const fetchTickets = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/tickets/my-tickets",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTickets(data.tickets);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchTickets();
}, []);
const createTicket = async () => {
  if (!title || !description || !category) {
    alert("Please fill all fields");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/tickets/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title,
          description,
          category,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    alert("Ticket Created Successfully!");

    window.location.reload();

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

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
  Total Tickets: {tickets.length}
</p>

<div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">
  <h2 className="mb-4 text-2xl font-semibold text-white">
    Create New Ticket
  </h2>

  <input
    type="text"
    placeholder="Ticket Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
  />

  <textarea
    placeholder="Ticket Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="mb-4 h-32 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
  />

  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
  >
    <option value="">Select Category</option>
    <option value="Technical">Technical</option>
    <option value="Billing">Billing</option>
    <option value="Account">Account</option>
  </select>

  <button
    onClick={createTicket}
    className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-400"
  >
    Create Ticket
  </button>
</div>

<div className="mt-10 space-y-4">
  {tickets.map((ticket) => (
    <div
      key={ticket._id}
      className="rounded-xl border border-slate-700 bg-slate-900 p-5 text-left"
    >
      <h2 className="text-xl font-semibold text-white">
        {ticket.title}
      </h2>

      <p className="mt-2 text-slate-400">
        {ticket.description}
      </p>

      <div className="mt-4 flex justify-between text-sm">
        <span className="text-cyan-400">
          {ticket.category}
        </span>

        <span className="text-green-400">
          {ticket.status}
        </span>
      </div>
    </div>
  ))}
</div>

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
