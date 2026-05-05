const express = require("express");
const router = express.Router();

const { onboardFintech } = require("../controllers/fintechController");

// debug (temporary only)
console.log("Controller loaded:", onboardFintech);

router.post("/onboard", onboardFintech);

module.exports = router;