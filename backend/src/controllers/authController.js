const bcrypt = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { User } = require('../models/userModel.js'); 
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')
const dotenv = require('dotenv')
dotenv.config()

// Register controller
const registerController = async (req, res, next) => {
    try {
        console.log('Request received:', req.body);
        const newuser = await User.create(req.body);
        console.log('User created:', newuser);
        successResponse(res, httpStatusCode.CREATED, "success", "User created successfully", newuser);
        next()
    } catch (error) {
        console.error('Error creating user:', error);
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, "error", "Internal server error");
    }
};

       

//login

const login = async (req,res, next) => {
    try {
        const { email, password} = req.body

        if(!email || !password){
            errorResponse(res, httpStatusCode.BAD_REQUEST, 'error', 'Please provide all the fields');
        }

        const user = await User.find({ email })

        if (!user) {
            successResponse(res,httpStatusCode.NOT_FOUND, 'error','user not found')
        }
        
        const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY, { expiresIn: '60d' })

        successResponse(res,httpStatusCode.CREATED, 'success', 'Login sucessfully', {token: token})

        req.user = user;
        next()

    } catch (error) { 
        console.log(error)
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'server error')
    }
   
}

module.exports = {
    registerController,
    login
};

