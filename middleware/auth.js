const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const User = require('../models/User');
const Admin = require('../models/Admin');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        console.log(token);
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

const adminAuth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

module.exports = {auth,adminAuth};