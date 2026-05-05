const express = require("express");
const router = express.Router();

const {
  createBvn,
  createNin,
  validateBvn,
  validateNin
} = require("../controllers/identityController");

// BVN
router.post("/insertBvn", createBvn);
router.post("/validateBvn", validateBvn);

// NIN
router.post("/insertNin", createNin);
router.post("/validateNin", validateNin);

module.exports = router;