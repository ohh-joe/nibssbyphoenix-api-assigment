const mongoose = require("mongoose");

const ninSchema = new mongoose.Schema(
  {
    nin: {
      type: String,
      required: true,
      unique: true
    },
    firstName: String,
    lastName: String,
    dob: String
  },
  { timestamps: true }
);

// IMPORTANT: THIS MUST BE EXACT
module.exports = mongoose.model("NIN", ninSchema);