const bcrypt = require("bcrypt")
const jwt  = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const { User } = require('../models/userModel.js'); 
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

// Register controller
const registerController = async (req, res) => {
    try {
        const { username, email, password, phoneNumber, gender, role} = req.body
        const newuser = new User({
            username,
            email: email,
            password: password,
            role,
            phoneNumber,
            gender
        });
        await newuser.save()
        return successResponse(res, httpStatusCode.CREATED, "success", "User created successfully", newuser);
        
    } catch (error) {
        console.error('Error creating user:', error);
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, "error", "Internal server error");
    }
};


//login
const login = async (req,res) => {
    try {
        const { email, password} = req.body

        if(!email || !password){
            errorResponse(res, httpStatusCode.BAD_REQUEST, 'error', 'Please provide all the fields');
        }

        const user = await User.find({ email })
        console.log(user)

        if (!user) {
            successResponse(res,httpStatusCode.NOT_FOUND, 'error','user not found')
        }
        
        const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY, { expiresIn: '60d' })
        console.log(token)

        //const token = await user.generateAuthToken()
        successResponse(res,httpStatusCode.CREATED, 'success', 'Login sucessfully', {token:token, ...user})
    
    } catch (error) { 
        console.log(error)
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'server error')
    }
   
}

const logout = async(req, res) => {
    try {
        const user = req.user
        console.log(user)
        user.tokens = user.tokens.filter((token) => token.token !== req.token)
        // user.tokens[0].token = []
        //user.tokens.token = []
        await user.save()
        res.send('message logout successfully')
         
    } catch (error) {
        console.log(error)
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'server error')

    }
}

module.exports = {
    registerController,
    login,
    logout
};

