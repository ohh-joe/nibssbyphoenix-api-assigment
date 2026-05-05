const express = require("express");
const router = express.Router();

const { deposit, transfer, getTransactions } = require("../controllers/walletController");
const protect = require("../middleware/authMiddleware");

// ✅ DEBUG LOGS (put here)
console.log("deposit:", deposit);
console.log("transfer:", transfer);
console.log("protect:", protect);

router.post("/deposit", protect, deposit);
router.post("/transfer", protect, transfer);
router.get("/transactions/:accountNumber", protect, getTransactions);

module.exports = router;