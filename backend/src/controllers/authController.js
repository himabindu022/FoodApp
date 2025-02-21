const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { User } = require('../models/userModel.js'); 
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')
const dotenv = require('dotenv')
dotenv.config()

// Register controller
const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address, role } = req.body;
        //console.log(req.body)

        if (!username || !email || !password || !phone || !address ||!role) {
            errorResponse(res, httpStatusCode.BAD_REQUEST, 'bad_request' , 'Please provide all the fields');
        }

        const user = await User.find({email:email});

        if (user) {
            errorResponse(res, httpStatusCode.BAD_REQUEST ,'bad_request' ,'Email already taken');
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            phone,
            address
        });
        await newUser.save();

        successResponse(res,httpStatusCode.CREATED, 'created', 'User created successfully', newUser );

    } catch (error) {
        console.error(error); 
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', "server error");
    }
};

//login

const login = async (req,res) => {
    try {
        const { email, password} = req.body

        //validation
        if(!email || !password){
            errorResponse(res, httpStatusCode.BAD_REQUEST, 'error', 'Please provide all the fields');
        }

        //check user
        const user = await User.find({ email })

        if (!user) {
            successResponse(res,httpStatusCode.NOT_FOUND, 'error','user not found')
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, { expiresIn: '6d' })
        successResponse(res,httpStatusCode.CREATED, 'success', 'Login sucessfully', user, token)
    } catch (error) { 
        console.log(error)
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'server error')
    }
}

module.exports = {
    registerController,
    login
};

