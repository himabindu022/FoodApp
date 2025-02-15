const { User } = require('../models/userModel')
const bcrypt = require("bcrypt")

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        console.log(user)
        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({user:user})
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await User.find({})
      
        if(users.length === 0) {
            return res.status(400).json({message: 'no Users found'})
        }
        return res.status(200).json({users:users})
    } catch (error) {
        console.log(error)
    }
}

const updateUser = async( req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate({_id:req.params.id},req.body,{new:true});
        if(!updatedUser) 
            return res.status(400).json({message:'user not found'})
        else 
        await updateUser.save
        return res.status(200).json({message:'user updated successfully', updatedUser})
    } catch (error) {
        console.log(error)
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newpassword, confirmpassword} = req.body

        if(!email || !newpassword || !confirmpassword ) {
            return res.status(400).json({message: 'Please fill all the fields'})
        }

        if( newpassword !== confirmpassword) {
            return res.status(400).json({message: 'Passwords do not match'})
        }

        const user = await User.findOne({ email})

        if(!user) {
            return res.status(400).json({message:'user not found'})
        }
        const hashedPassword = await bcrypt.hash(newpassword,10)
      
        const updatedUser = await User.findOneAndUpdate({email}, {password: hashedPassword},{new:true}) 
        return res.status(200).json({message : "reset password successfully", updatedUser})
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
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user.password)
        const isMatch = await bcrypt.compare(oldPassword, user.password);  
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10); 

        const updatedHashPassword = await User.findByIdAndUpdate({_id: req.params.id}, hashedPassword,{new:true})
        console.log(updatedHashPassword)
        res.status(200).json({ message: 'Password updated successfully', updatedHashPassword });

    } catch (error) {
        console.error('Error details:', error);
        res.status(500).json({ message: 'Error updating password' });
    }
};

module.exports = {
    getUser,
    getUsers,
    updateUser,
    resetPassword,
    updatedPassword
}