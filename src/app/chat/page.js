"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "AI request failed");
      }

      const aiMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="min-h-screen bg-[#0B0F19] px-4 py-8 text-white">
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">

        {/* Header */}
        <div className="border-b border-slate-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                AI Support
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Ask our AI assistant for help with your support issue
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>

              <span className="text-sm text-slate-400">
                AI Online
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">

          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-5xl">
                  🤖
                </div>

                <h2 className="mt-4 text-xl font-semibold">
                  How can I help you?
                </h2>

                <p className="mt-2 text-slate-400">
                  Describe your issue and I'll try to help.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-white"
                    : "border border-slate-700 bg-slate-950 text-slate-200"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-slate-400">
                AI is thinking...
              </div>
            </div>
          )}

        </div>

        {/* Input */}
        <div className="border-t border-slate-700 p-4">

          <div className="flex gap-3">

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your issue..."
              rows={2}
              className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="rounded-xl bg-cyan-500 px-6 font-semibold transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Press Enter to send • Shift + Enter for a new line
          </p>

        </div>

      </div>
    </main>
  );
}