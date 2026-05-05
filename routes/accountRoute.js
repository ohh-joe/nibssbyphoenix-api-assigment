const express = require("express");
const router = express.Router();

const { createAccount } = require("../controllers/accountController");

router.post("/createAccount", createAccount);

module.exports = router;

console.log("createAccount:", createAccount);