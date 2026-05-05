const express = require("express");
const router = express.Router();

const {
  loginFintech,
  register,
  login
} = require("../controllers/authController");

console.log("loginFintech:", loginFintech);

router.post("/token", loginFintech);
router.post("/register", register);
router.post("/login", login);

module.exports = router;