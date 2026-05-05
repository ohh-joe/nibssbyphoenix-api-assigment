const mongoose = require('mongoose');

const bvnSchema = new mongoose.Schema({
  bvn: {
    type: String,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  dob: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('BVN', bvnSchema);