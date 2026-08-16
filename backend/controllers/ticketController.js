const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Ticket Created Successfully",
      ticket,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      createdBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      tickets,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createTicket,
  getMyTickets,
};