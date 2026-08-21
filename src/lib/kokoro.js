import { KokoroTTS } from "kokoro-js";

let ttsInstance = null;
let loadingPromise = null;

const MODEL_ID = "onnx-community/Kokoro-82M-v1.0-ONNX";
const VOICE = "am_puck";

export async function getKokoro() {
  if (ttsInstance) {
    return ttsInstance;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = KokoroTTS.from_pretrained(MODEL_ID, {
    dtype: "q8",
    device: "wasm",
  });

  try {
    ttsInstance = await loadingPromise;
    return ttsInstance;
  } catch (error) {
    loadingPromise = null;
    throw error;
  } finally {
    loadingPromise = null;
  }
}

export async function speakWithKokoro(text) {
  if (!text || typeof window === "undefined") {
    return null;
  }

  const cleanText = text
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
    .replace(/[→]/g, " ")
    .replace(/[<>]/g, " ")
    .replace(/\n{2,}/g, ". ")
    .replace(/\s{2,}/g, " ")
    .trim();

  if (!cleanText) {
    return null;
  }

  const tts = await getKokoro();

  const audio = await tts.generate(cleanText, {
    voice: VOICE,
  });

  const blob = audio.toBlob();

  const url = URL.createObjectURL(blob);
  const player = new Audio(url);

  player.onended = () => {
    URL.revokeObjectURL(url);
  };

  player.onerror = () => {
    URL.revokeObjectURL(url);
  };

  await player.play();

  return player;
}