const express = require("express");

const router = express.Router();

const {
  chatWithAI,
  getConversationHistory,
} = require("../controllers/chatController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, chatWithAI);

router.get("/history", authMiddleware, getConversationHistory);

module.exports = router;