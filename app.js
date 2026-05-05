require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./configs/database");

const fintechRoute = require("./routes/fintechRoute");
const authRoute = require("./routes/authRoute");
const accountRoute = require("./routes/accountRoute");
const identityRoute = require("./routes/identityRoute");
const walletRoute = require("./routes/walletRoute");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("NIBSSBYPHOENIX API is running 🚀");
});

// ======================
// ROUTES
// ======================

app.use("/api/fintech", fintechRoute);
app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);
app.use("/api/identity", identityRoute);
app.use("/api/wallet", walletRoute);

// 🔥 IMPORTANT DEBUG (MOVED HERE)
console.log("wallet route registered at /api/wallet");

// ======================
// SERVER
// ======================
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});