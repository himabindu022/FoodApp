const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/userModel.js')
const { roles } = require('../../config/roles.js')
require("dotenv").config();

const tokenGenerate = async (req, res, next) => {
    try {
        //const token = req.headers.authorization.split(' ')[1];
        const token = req.headers["authorization"].replace('Bearer ', '' )
        console.log(token)
        
        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }
        console.log("env key", process.env.SECRET_KEY)

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
            console.log(decoded)
            const user = await User.findOne({ _id:decoded._id, 'tokens.token': token}); 

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }
            req.token = token
            req.user = user;
            next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// const isAuthorized = (roles) => { 
//     return (req, res, next) => {
//         try {
//             const { role } = req.user;
//             console.log(role)
//             //const data = {...roles}
//             //console.log(data)
//             //const roleIdx = userRole.map((role) => role.role)
//             //console.log(roleIdx)
//             if(!roles.includes(role)) {
//                 return res.status(403).json({message: 'You are not authorized to perform this action'})
//             }
//             next()
//         } catch (error) {
//             next(error)
//         }
//     }
// }
   

module.exports = { tokenGenerate }