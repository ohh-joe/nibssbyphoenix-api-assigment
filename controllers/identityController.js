const BVN = require("../models/bvnModel");
const NIN = require("../models/ninModel");

console.log("NIN MODEL:", NIN); // 👈 PUT IT HERE

// CREATE BVN
const createBvn = async (req, res) => {
  try {
    const { bvn, firstName, lastName, dob, phone } = req.body;

    const existing = await BVN.findOne({ bvn });
    if (existing) {
      return res.status(409).json({ message: "BVN already exists" });
    }

    const newBvn = await BVN.create({
      bvn,
      firstName,
      lastName,
      dob,
      phone
    });

    res.status(201).json({
      message: "BVN record created successfully",
      bvn: newBvn.bvn
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE NIN
const createNin = async (req, res) => {
  try {
    const { nin, firstName, lastName, dob } = req.body;

    const existing = await NIN.findOne({ nin });
    if (existing) {
      return res.status(409).json({ message: "NIN already exists" });
    }

    const newNin = await NIN.create({
      nin,
      firstName,
      lastName,
      dob
    });

    res.status(201).json({
      message: "NIN record created successfully",
      nin: newNin.nin
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VALIDATE BVN
const validateBvn = async (req, res) => {
  try {
    const { bvn } = req.body;

    const record = await BVN.findOne({ bvn });

    if (!record) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      bvn: record.bvn,
      firstName: record.firstName,
      lastName: record.lastName,
      dob: record.dob
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// VALIDATE NIN
const validateNin = async (req, res) => {
  try {
    const { nin } = req.body;

    const record = await NIN.findOne({ nin });

    if (!record) {
      return res.json({ valid: false });
    }

    res.json({
      valid: true,
      nin: record.nin,
      firstName: record.firstName,
      lastName: record.lastName,
      dob: record.dob
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBvn,
  createNin,
  validateBvn,
  validateNin
};