const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/userModel.js')

const tokenGenerate = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }

            const user = await User.findById(decoded._id).select('role'); 

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            req.user = user;
            next();
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { tokenGenerate }