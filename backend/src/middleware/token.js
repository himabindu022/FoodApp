const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/userModel.js')
const { roles } = require('../../config/roles.js')

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

            //const user = await User.findById(decoded._id).select('role'); 

            //if (!user) {
            //    return res.status(401).json({ message: 'User not found' });
            //}

            req.user = decoded._id;
            next();
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const isAuthorized = (...roles) => { 
    return (req, res, next) => {
        try {
            const userRole = req.user;
            console.log(userRole)
            const data = {...roles}
            console.log(data)
            //const roleIdx = userRole.map((role) => role.role)
            //console.log(roleIdx)
            if(!roles.includes(userRole)) {
                return res.status(403).json({message: 'You are not authorized to perform this action'})
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}
   

module.exports = { tokenGenerate, isAuthorized }