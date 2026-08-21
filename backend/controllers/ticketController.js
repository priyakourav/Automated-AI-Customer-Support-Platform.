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

const updateTicket = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    const ticket = await Ticket.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (category) ticket.category = category;
    if (status) ticket.status = status;

    await ticket.save();

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
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

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ticket deleted successfully",
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
  updateTicket,
  deleteTicket,
};