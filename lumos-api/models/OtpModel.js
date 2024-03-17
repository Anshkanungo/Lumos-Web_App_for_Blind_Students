const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  encryptedOtp: {
    type: String,
    required: true,
  },
});

const OtpModel = mongoose.model("Otp", OtpSchema);
