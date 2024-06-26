const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const Admin =  require("../models/Admin");
const {EMAIL_USER,EMAIL_PASS,JWT_SECRET}=process.env;


//register
const register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json({ msg: 'Admin already exists' });

        admin = new Admin({ email, username, password });
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        res.status(201).json({ msg: 'Admin registered' });
    } catch (err) {
        res.status(500).send('Server error');
    }
}

//login

const login = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const admin = await Admin.findOne({ email }) || await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { admin: { id: admin.id } };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
}


//view all users

const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('username');
        res.json(users);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

//view certain user

const viewUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

//delete user

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ username: req.params.username });
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json({ msg: 'User deleted' });
    } catch (err) {
        res.status(500).send('Server error');
    }
}

module.exports = {register,login,viewAllUsers,viewUser,deleteUser};