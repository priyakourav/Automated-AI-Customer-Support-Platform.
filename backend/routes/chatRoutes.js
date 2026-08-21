const express = require("express");

const {
  chatWithAI,
  getChatHistory,
} = require("../controllers/chatController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Load conversation history
router.get(
  "/history",
  authMiddleware,
  getChatHistory
);

// Send message to AI
router.post(
  "/",
  authMiddleware,
  chatWithAI
);

module.exports = router;