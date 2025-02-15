const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt  = require('jsonwebtoken')
const { User } = require('../models/userModel.js'); // Ensure correct path
const dotenv = require('dotenv')
dotenv.config()

// Register controller
const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address } = req.body;
        console.log(req.body)

        if (!username || !email || !password || !phone || !address) {
            return res.status(400).send({ message: 'Please provide all the fields' });
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(400).send({ message: 'Email already taken' });
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
        res.status(201).send({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error details:', error); // More detailed logging
        res.status(500).send({ message: 'Error in registering user' });
    }
};

//login

const login = async (req,res) => {
    try {
        const { email, password} = req.body

        //validation
        if(!email || !password){
            return res.status(400).send({message: 'Please provide both email and password'})
        }

        //check user
        const user = await User.find({ email })

        if (!user) {
            return res.status(404).send({message:'user not found'})
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, { expiresIn: '6d' })
        return res.status(200).send({message:'Login sucessfully', user:user, token: token})
    } catch (error) { 
        console.log(error)
        res.status(500).send({message: 'error in login'})
    }
}

module.exports = {
    registerController,
    login
};

