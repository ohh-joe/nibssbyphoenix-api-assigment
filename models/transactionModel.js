const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["deposit", "transfer", "debit", "credit"],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    fromAccount: {
      type: String
    },
    toAccount: {
      type: String
    },
    reference: {
      type: String,
      unique: true
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);