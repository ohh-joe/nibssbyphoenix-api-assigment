const Fintech = require("../models/fintechModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//
// ===============================
// 🏦 FINTECH LOGIN (API KEY LOGIN)
// ===============================
const loginFintech = async (req, res) => {
  try {
    const { apiKey, apiSecret } = req.body;

    const fintech = await Fintech.findOne({ apiKey, apiSecret });

    if (!fintech) {
      return res.status(401).json({
        message: "Invalid fintech credentials"
      });
    }

    const token = jwt.sign(
      {
        fintechId: fintech._id,
        bankCode: fintech.bankCode,
        bankName: fintech.bankName,
        email: fintech.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Fintech login successful",
      token,
      fintech: {
        name: fintech.name,
        email: fintech.email,
        bankCode: fintech.bankCode,
        bankName: fintech.bankName
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//
// ===============================
// 👤 USER REGISTER
// ===============================
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = await User.create({
      email,
      password
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//
// ===============================
// 🔐 USER LOGIN
// ===============================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

//
// ===============================
// 📦 EXPORT ALL CONTROLLERS
// ===============================
module.exports = {
  loginFintech,
  register,
  login
};