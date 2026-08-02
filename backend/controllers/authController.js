const registerUser = (req, res) => {
  console.log(req.body);

  res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user: req.body,
  });
};

module.exports = {
  registerUser,
};