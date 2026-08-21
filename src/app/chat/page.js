"use client";

import { useState, useEffect, useRef } from "react";

import {
  speakWithKokoro,
  warmUpKokoro,
} from "@/lib/kokoro";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);

  const [voiceMode, setVoiceMode] = useState(false);
  const [voiceLoading, setVoiceLoading] = useState(false);

  const [currentAudio, setCurrentAudio] = useState(null);
  const messagesEndRef = useRef(null);

  // --------------------------------------------------
  // Load existing conversation when page opens
  // --------------------------------------------------

  useEffect(() => {
    warmUpKokoro();
    const loadConversation = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/chat/history",
          {
            method: "GET",
            headers: {
              Authorization: token,
            },
          }
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || "Failed to load conversation"
          );
        }

        setMessages(data.messages || []);
      } catch (error) {
        console.error(
          "Conversation history error:",
          error
        );
      }
    };

    loadConversation();
  }, []);

  // --------------------------------------------------
  // Speech support
  // --------------------------------------------------

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      !("SpeechRecognition" in window) &&
      !("webkitSpeechRecognition" in window)
    ) {
      setSpeechSupported(false);
    }

    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, [currentAudio]);

  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);

  // --------------------------------------------------
  // Clean AI response before voice
  // --------------------------------------------------

  const cleanTextForSpeech = (text) => {
    return text
      .replace(/```[\s\S]*?```/g, "")
      .replace(/#{1,6}\s*/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/^\s*[-*+]\s+/gm, "")
      .replace(/^\s*\d+\.\s+/gm, "")
      .replace(/^\s*>\s?/gm, "")
      .replace(/^[-*_]{3,}\s*$/gm, "")
      .replace(/→/g, " ")
      .replace(/[<>]/g, " ")
      .replace(/\n{2,}/g, ". ")
      .replace(/\s{2,}/g, " ")
      .trim();
  };

  // --------------------------------------------------
  // Stop current voice
  // --------------------------------------------------

  const stopVoice = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }

    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }

    setVoiceLoading(false);
  };

  // --------------------------------------------------
  // Speak AI response using Kokoro Puck
  // --------------------------------------------------

  const speakResponse = async (text) => {
    if (!text || typeof window === "undefined") {
      return;
    }

    stopVoice();

    const cleanSpeech = cleanTextForSpeech(text);

    if (!cleanSpeech) {
      return;
    }

    try {
      setVoiceLoading(true);

      const audio = await speakWithKokoro(cleanSpeech);

      if (audio) {
        setCurrentAudio(audio);
      }
    } catch (error) {
      console.error("Kokoro voice error:", error);

      try {
        window.speechSynthesis?.cancel();

        const speech =
          new SpeechSynthesisUtterance(cleanSpeech);

        speech.rate = 0.9;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onend = () => {
          setVoiceLoading(false);
        };

        speech.onerror = () => {
          setVoiceLoading(false);
        };

        window.speechSynthesis.speak(speech);
      } catch (fallbackError) {
        console.error(
          "Browser voice fallback error:",
          fallbackError
        );
      }
    } finally {
      setVoiceLoading(false);
    }
  };

  // --------------------------------------------------
  // Send message
  // --------------------------------------------------

  const sendMessage = async (
    messageToSend = message
  ) => {
    if (!messageToSend.trim() || loading) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const userMessage = {
      role: "user",
      content: messageToSend,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

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
            message: messageToSend,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message || "AI request failed"
        );
      }

      const aiMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      if (voiceMode) {
        await speakResponse(data.reply);
      }
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

  // --------------------------------------------------
  // Voice input
  // --------------------------------------------------

  const startListening = () => {
    if (!speechSupported) {
      alert(
        "Speech recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition =
      new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript =
        event.results[0][0].transcript;

      setMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error(
        "Speech recognition error:",
        event.error
      );

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // --------------------------------------------------
  // Replay AI response
  // --------------------------------------------------

  const replayResponse = async (text) => {
    await speakResponse(text);
  };

  // --------------------------------------------------
  // Keyboard
  // --------------------------------------------------

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#0B0F19] px-4 py-8 text-white">
      <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">

        {/* HEADER */}

        <div className="border-b border-slate-700 px-6 py-5">
          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-2xl font-bold">
                Triage AI Support
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Get support using text or voice
              </p>
            </div>

            {/* VOICE MODE */}

            <button
              onClick={() => {
                setVoiceMode((previous) => {
                  const next = !previous;

                  if (!next) {
                    stopVoice();
                  }

                  return next;
                });
              }}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition ${
                voiceMode
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                  : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500"
              }`}
            >
              <span>
                {voiceMode ? "🔊" : "🔇"}
              </span>

              <span>
                Voice{" "}
                {voiceMode ? "ON" : "OFF"}
              </span>
            </button>

          </div>
        </div>

        {/* CHAT */}

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
                  Type your issue or use the microphone.
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
                className={`group relative max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-white"
                    : "border border-slate-700 bg-slate-950 text-slate-200"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>

                {msg.role === "assistant" && (
                  <button
                    onClick={() =>
                      replayResponse(msg.content)
                    }
                    disabled={voiceLoading}
                    className="mt-3 text-sm text-slate-500 transition hover:text-cyan-400 disabled:opacity-50"
                    title="Listen to this response"
                  >
                    {voiceLoading
                      ? "🔄 Loading voice..."
                      : "🔊 Listen"}
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-slate-400">
                Triage is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />

        </div>

        {/* INPUT */}

        <div className="border-t border-slate-700 p-4">

          <div className="flex gap-3">

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder="Describe your issue..."
              rows={2}
              className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />

            {/* MICROPHONE */}

            <button
              onClick={startListening}
              disabled={loading}
              title="Speak your message"
              className={`rounded-xl px-5 text-xl transition ${
                isListening
                  ? "animate-pulse bg-red-500"
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
            >
              {isListening ? "🔴" : "🎤"}
            </button>

            {/* SEND */}

            <button
              onClick={() => sendMessage()}
              disabled={
                loading ||
                !message.trim()
              }
              className="rounded-xl bg-cyan-500 px-6 font-semibold transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>

          </div>

          <p className="mt-2 text-xs text-slate-500">
            Enter to send • Shift + Enter for a new line • 🎤 Voice input
          </p>

        </div>

      </div>
    </main>
  );
}