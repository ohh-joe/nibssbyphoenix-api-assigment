const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const crypto = require("crypto");

// generate reference
const generateRef = () => crypto.randomBytes(8).toString("hex");

//
// ===============================
// 💰 DEPOSIT
// ===============================
const deposit = async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;

    if (!accountNumber || !amount) {
      return res.status(400).json({
        message: "accountNumber and amount are required"
      });
    }

    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    account.balance = Number(account.balance) + Number(amount);
    await account.save();

    const transaction = await Transaction.create({
      type: "deposit",
      amount,
      toAccount: accountNumber,
      reference: generateRef()
    });

    return res.json({
      message: "Deposit successful",
      balance: account.balance,
      transaction
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//
// ===============================
// 💸 TRANSFER
// ===============================
const transfer = async (req, res) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;

    if (!fromAccount || !toAccount || !amount) {
      return res.status(400).json({
        message: "fromAccount, toAccount, amount are required"
      });
    }

    const sender = await Account.findOne({ accountNumber: fromAccount });
    const receiver = await Account.findOne({ accountNumber: toAccount });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient funds" });
    }

    sender.balance = Number(sender.balance) - Number(amount);
    receiver.balance = Number(receiver.balance) + Number(amount);

    await sender.save();
    await receiver.save();

    const transaction = await Transaction.create({
      type: "transfer",
      amount,
      fromAccount,
      toAccount,
      reference: generateRef()
    });

    return res.json({
      message: "Transfer successful",
      transaction
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//
// ===============================
// 🧾 TRANSACTION HISTORY
// ===============================
const getTransactions = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const transactions = await Transaction.find({
      $or: [
        { fromAccount: accountNumber },
        { toAccount: accountNumber }
      ]
    }).sort({ createdAt: -1 });

    return res.json({
      count: transactions.length,
      transactions
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deposit,
  transfer,
  getTransactions
};