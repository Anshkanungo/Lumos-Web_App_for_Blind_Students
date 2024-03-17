const OtpModel = require('../models/OtpModel');
const sendEmail = require('../utils/email');
const bcrypt = require('bcrypt');

// Function to send OTP to the provided email address
const sendOTP = async (req, res) => {
    const { email } = req.body;

    // Generate OTP
    const otp = generateOTP();
    const encryptedOtp = await bcrypt.hash(otp, 10); // Encrypt OTP

    // Store encrypted OTP in the database
    try {
        await OtpModel.findOneAndUpdate({ email }, { encryptedOtp }, { upsert: true });
    } catch (error) {
        console.error('Error storing OTP in the database:', error);
        res.status(500).json({ message: 'Error sending OTP' });
        return;
    }

    // Compose email options
    const emailOptions = {
        email: email,
        subject: 'OTP Verification',
        message: `Your OTP is: ${otp}`
    };

    // Send email
    try {
        await sendEmail(emailOptions);
        console.log(`OTP sent to ${email}`);
        res.status(200).json({ message: 'OTP sent successfully', success: true });
    } catch (error) {
        console.error('Error sending OTP via email:', error);
        res.status(500).json({ message: 'Error sending OTP', success: false });
    }
};

// Function to verify OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    // Retrieve encrypted OTP from the database
    let encryptedOtp;
    try {
        const otpRecord = await OtpModel.findOne({ email });
        if (!otpRecord) {
            res.status(400).json({ message: 'Email not found' });
            return;
        }
        encryptedOtp = otpRecord.encryptedOtp;
    } catch (error) {
        console.error('Error retrieving OTP from the database:', error);
        res.status(500).json({ message: 'Error verifying OTP' });
        return;
    }

    // Verify OTP
    try {
        const match = await bcrypt.compare(otp, encryptedOtp);
        if (match) {
            res.status(200).json({ message: 'OTP verified successfully', success: true });
        } else {
            res.status(400).json({ message: 'Invalid OTP', success: false });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
};


// Function to generate OTP
const generateOTP = () => {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
};


module.exports = {
    sendOTP,
    verifyOTP
};
