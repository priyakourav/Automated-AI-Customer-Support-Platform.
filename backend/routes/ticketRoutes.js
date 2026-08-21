const express = require("express");

const {
  createTicket,
  getMyTickets,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Routes

// Create a new ticket
router.post("/create", authMiddleware, createTicket);

// Get logged-in user's tickets
router.get("/my-tickets", authMiddleware, getMyTickets);

// Update a ticket
router.put("/:id", authMiddleware, updateTicket);

// Delete a ticket
router.delete("/:id", authMiddleware, deleteTicket);

module.exports = router;