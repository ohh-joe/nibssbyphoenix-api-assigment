const Account = require("../models/accountModel");
const BVN = require("../models/bvnModel");
const NIN = require("../models/ninModel");

const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

const createAccount = async (req, res) => {
  try {
    const { kycType, kycID, dob } = req.body;

    if (!kycType || !kycID || !dob) {
      return res.status(400).json({
        message: "kycType, kycID and dob are required"
      });
    }

    let identity;

    // 🔥 CHECK BVN OR NIN
    if (kycType === "bvn") {
      identity = await BVN.findOne({ bvn: kycID });
    } else if (kycType === "nin") {
      identity = await NIN.findOne({ nin: kycID });
    } else {
      return res.status(400).json({ message: "Invalid kycType" });
    }

    if (!identity) {
      return res.status(404).json({
        message: "Identity not found. Please verify BVN/NIN"
      });
    }

    // 🔥 CREATE ACCOUNT NAME FROM IDENTITY
    const accountName = `${identity.firstName} ${identity.lastName}`;

    const accountNumber = generateAccountNumber();

    const account = await Account.create({
      accountNumber,
      accountName,
      bankCode: "150",
      bankName: "lush Bank",
      kycType,
      kycID,
      dob,
      balance: 150000
    });

    res.status(201).json({
      message: "Account created successfully",
      account
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAccount };