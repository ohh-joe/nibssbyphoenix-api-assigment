const Fintech = require("../models/fintechModel");
const crypto = require("crypto");

// Generate random credentials
const generateKey = () => crypto.randomBytes(16).toString("hex");
const generateSecret = () => crypto.randomBytes(32).toString("hex");

// CONTROLLER FUNCTION
const onboardFintech = async (req, res) => {
  try {
    const { name, email } = req.body;

    return res.json({
      message: "Controller working",
      name,
      email
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// IMPORTANT EXPORT
module.exports = {
  onboardFintech
};