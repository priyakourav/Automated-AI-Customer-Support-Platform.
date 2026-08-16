const express = require("express");
const {
  createTicket,
  getMyTickets,
} = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Route
router.post("/create", authMiddleware, createTicket);
router.get("/my-tickets", authMiddleware, getMyTickets);

module.exports = router;