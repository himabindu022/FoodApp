const { User } = require('../models/userModel')
const bcrypt = require("bcrypt")
const successResponse = require('../utils/successResponse')
const httpStatusCode = require('../constants/httpStatusCode')

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        console.log(user)
        if(!user) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
       successResponse(res, httpStatusCode.CREATED, 'success', 'received Successfully', user)
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find({})
      
        if(users.length === 0) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        successResponse(res, httpStatusCode.CREATED, 'success', 'received Successfully',users)
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async( req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
        if(!updatedUser) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        await updateUser.save
        successResponse(res, httpStatusCode.CREATED, 'success','user updated successfully', updatedUser)
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword} = req.body

        if(!email || !newpassword || !confirmpassword ) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error', 'Please fill all the fields')
        }

        if( newpassword !== confirmpassword) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error', 'Passwords do not match')
        }

        const user = await User.findOne({ email})

        if(!user) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','user not found')
        }
        const hashedPassword = await bcrypt.hash(newpassword,10)
      
        const updatedUser = await User.findOneAndUpdate({email}, {password: hashedPassword},{new:true}) 
        successResponse(res, httpStatusCode.CREATED, 'success', "reset password successfully", updatedUser)
    } catch (error) {
        console.log(error)
    }
}

const updatedPassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;

        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Please provide email, old password, and new password' });
        }

        const user = await User.findOne({ email:email });
        
        if (!user) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','user not found')
        }

        //console.log(user.password)
        const isMatch = await bcrypt.compare(oldPassword, user.password);  
        console.log(isMatch)
        if (!isMatch) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','Old password is incorrect' );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); 

        const updatedHashPassword = await User.findByIdAndUpdate({_id: req.params.id}, hashedPassword,{new:true})
        //console.log(updatedHashPassword)
        successResponse(res, httpStatusCode.CREATED, 'success', 'Password updated successfully', updatedHashPassword);

    } catch (error) {
        console.error('Error details:', error);
    }
};

module.exports = {
    getUser,
    getUsers,
    updateUser,
    resetPassword,
    updatedPassword
}