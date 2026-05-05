const express = require("express");
const router = express.Router();

const { deposit, transfer } = require("../controllers/walletController");

// ✅ IMPORTANT — NO /wallet here
router.post("/deposit", deposit);
router.post("/transfer", transfer);

module.exports = router;