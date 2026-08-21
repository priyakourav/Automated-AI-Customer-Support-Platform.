"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

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

  useEffect(() => {
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

      setTickets((prevTickets) => [data.ticket, ...prevTickets]);

      setTitle("");
      setDescription("");
      setCategory("");

      alert("Ticket Created Successfully!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const updateTicketStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tickets/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === id ? data.ticket : ticket
        )
      );
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const deleteTicket = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tickets/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== id)
      );
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

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === "Closed"
  ).length;

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your customer support tickets
            </p>
          </div>

          <div className="flex gap-3">
  <button
    onClick={() => {
      window.location.href = "/chat";
    }}
    className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold transition hover:bg-cyan-400"
  >
    🤖 AI Support
  </button>

  <button
    onClick={handleLogout}
    className="rounded-lg bg-red-500 px-5 py-2 font-semibold transition hover:bg-red-400"
  >
    Logout
  </button>
</div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Total Tickets
            </p>

            <p className="mt-2 text-3xl font-bold">
              {tickets.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Open Tickets
            </p>

            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {openTickets}
            </p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">
              Closed Tickets
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {closedTickets}
            </p>
          </div>

        </div>

        {/* Create Ticket */}
        <div className="mt-8 rounded-xl border border-slate-700 bg-slate-900 p-6">

          <h2 className="mb-5 text-2xl font-semibold">
            Create New Ticket
          </h2>

          <input
            type="text"
            placeholder="Ticket Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-500"
          />

          <textarea
            placeholder="Ticket Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 h-32 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-500"
          >
            <option value="">Select Category</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="Account">Account</option>
          </select>

          <button
            onClick={createTicket}
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold transition hover:bg-cyan-400"
          >
            Create Ticket
          </button>

        </div>

        {/* Tickets */}
        <div className="mt-10">

          <h2 className="mb-5 text-2xl font-semibold">
            Your Tickets
          </h2>

          <div className="space-y-4">

            {tickets.length === 0 ? (
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-8 text-center text-slate-400">
                No tickets yet.
              </div>
            ) : (
              tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="rounded-xl border border-slate-700 bg-slate-900 p-5"
                >

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                    <div>
                      <h3 className="text-xl font-semibold">
                        {ticket.title}
                      </h3>

                      <p className="mt-2 text-slate-400">
                        {ticket.description}
                      </p>

                      <p className="mt-3 text-sm text-cyan-400">
                        Category: {ticket.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          updateTicketStatus(
                            ticket._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">
                          In Progress
                        </option>
                        <option value="Closed">Closed</option>
                      </select>

                      <button
                        onClick={() => deleteTicket(ticket._id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold transition hover:bg-red-400"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>
    </main>
  );
}