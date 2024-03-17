const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    const emailOptions = {
        from: 'From Lumos <lumos@gmail.com>',
        to: option.email,
        subject: option.subject,
        text: option.message
    };

    try {
        await transporter.sendMail(emailOptions);
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;
