
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const {EMAIL_USER,EMAIL_PASS}=process.env;

const sendOTP = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });

    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: 'Account Verification OTP',
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const register = async (req, res) => {
    const { email, username, password } = req.body;
    console.log(email,username,password);

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ email, username, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;

        await user.save();

        sendOTP(email, otp);

        res.status(201).json({ msg: 'User registered. Check your email for OTP.' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

module.exports = {
    register,
}