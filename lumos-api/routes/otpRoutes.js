const express = require('express');
const { sendOTP, verifyOTP } = require('../controller/otpController');

const router = express.Router();

// Route to send OTP
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

module.exports = router;
