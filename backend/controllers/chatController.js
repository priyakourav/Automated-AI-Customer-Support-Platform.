const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
    });

    res.status(200).json({
      success: true,
      reply: response.text,
    });
  } catch (error) {
    console.log("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "AI service error",
    });
  }
};

module.exports = {
  chatWithAI,
};