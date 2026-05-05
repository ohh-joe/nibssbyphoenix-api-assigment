const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    accountNumber: {
      type: String,
      unique: true,
      required: true
    },
    accountName: {
      type: String,
      required: true
    },
    bankCode: {
      type: String,
      required: true
    },
    bankName: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      default: 0
    },
    kycType: {
      type: String,
      required: true
    },
    kycID: {
      type: String,
      required: true,
      unique: true
    },
    dob: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// 👇 THIS LINE IS THE MOST IMPORTANT
module.exports = mongoose.model("Account", accountSchema);