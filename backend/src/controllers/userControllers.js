const bcrypt = require("bcrypt")
const { userServices } = require('../services/index')
const successResponse = require('../utils/successResponse')
const httpStatusCode = require('../constants/httpStatusCode')
//const { message } = require("../validations/userValidation")
//const { food } = require('../models/foodModel')

const getUser = async(req, res) => {
    try {
        const data = req.user
        console.log(data)
        const user = await userServices.getUser(data._id)
        //await user.populate('restaurant')
        console.log(user)
        if(!user) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        return res.send(user)
       //return successResponse(res, httpStatusCode.CREATED, 'success', 'received Successfully', user,)
    } catch (error) {
        console.log(error)
    }
}

// const getUser = async(req, res) => {
//     try {
//         const user = await userServices.getUser(req.user._id)
//         console.log(user)
//         if(!user) {
//             errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
//         }
//        successResponse(res, httpStatusCode.CREATED, 'success', 'received Successfully', user)
//     } catch (error) {
//         console.log(error)
//     }
// }


// const getUsers = async(req, res) => {
//     try {
//         const users = await userServices.getUsers({})
      
//         if(users.length === 0) {
//             errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
//         }
//         successResponse(res, httpStatusCode.CREATED, 'success', 'received Successfully',users)
//     } catch (error) {
//         console.log(error)
//     }
// }

const updateUser = async( req, res) => {
    try {
        const updateUser = req.user._id;
        console.log(updateUser)
        // if(!updateUser) {
        //     errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        // }
        const updatedUser = await userServices.updateUser(updateUser,req.user.body,{new:true});
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

        const user = await userServices.getUsers({email})

        if(!user) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','user not found')
        }
        const hashedPassword = await bcrypt.hash(newpassword,10)
        const updatedUser = await userServices.updateUser({email}, {password: hashedPassword},{new:true}) 
        successResponse(res, httpStatusCode.CREATED, 'success', "reset password successfully", updatedUser)
    } catch (error) {
        console.log(error)
    }
}

const updatedPassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        console.log(req.body)

        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Please provide email, old password, and new password' });
        }

        const user = await userServices.getUser({_id:req.params.id});
        console.log(user)
        
        if (!user) {
            return res.status(404).json({message:"Not Found"})
        }

        console.log(user.password)
        const isMatch = await bcrypt.compare(oldPassword, user.password);  
        console.log(isMatch)
        if (!isMatch) {
            return res.status(403).json({message:'Old password is incorrect'});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); 

        const updatedHashPassword = await userServices.updateUser(req.params.id, hashedPassword,{new:true})
        console.log(updatedHashPassword)
        successResponse(res, httpStatusCode.CREATED, 'success', 'Password updated successfully', updatedHashPassword);

    } catch (error) {
        console.error('Error details:', error);
    }
};

module.exports = {
    getUser,
    //getUsers,
    updateUser,
    resetPassword,
    updatedPassword
}