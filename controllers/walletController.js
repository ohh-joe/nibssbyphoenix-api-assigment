const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const crypto = require("crypto");

// generate reference
const generateRef = () => crypto.randomBytes(8).toString("hex");

// 💰 DEPOSIT
const deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.balance += amount;
    await account.save();

    const transaction = await Transaction.create({
      type: "deposit",
      amount,
      toAccount: accountNumber,
      reference: generateRef()
    });

    res.json({
      message: "Deposit successful",
      balance: account.balance,
      transaction
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 💸 TRANSFER
const transfer = async (req, res) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;

    const sender = await Account.findOne({ accountNumber: fromAccount });
    const receiver = await Account.findOne({ accountNumber: toAccount });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = await Transaction.create({
      type: "transfer",
      amount,
      fromAccount,
      toAccount,
      reference: generateRef()
    });

    res.json({
      message: "Transfer successful",
      transaction
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧾 GET TRANSACTION HISTORY
const getTransactions = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const transactions = await Transaction.find({
      $or: [
        { fromAccount: accountNumber },
        { toAccount: accountNumber }
      ]
    }).sort({ createdAt: -1 });

    res.json({
      count: transactions.length,
      transactions
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { deposit, transfer, getTransactions };