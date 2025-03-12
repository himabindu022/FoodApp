const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require('validator');
const fs = require('fs')

const  addressSchema   = require('../models/addressModel')

//schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:[ true, 'user name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        //select: false
        validate(value) {
            if(!value.match(/\d/) || !value.match(/[a-zA-Z]/ ||!value.length<8)) {
                throw new Error('password must be at least 8 characters and must contain at least one number')
            }
        }
    },
    address: addressSchema,
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required']
    },
    role : {
        type : String,
        required : [true, 'User type is required'],
        default: 'client',
        enum : ['admin','owner','customer']
    },
    gender: {
        type: String,
        enum:["FEMALE", "MALE"],
        required: [true, 'Gender is required'],
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
    }
})

// userSchema.pre("save", async function(next) {
//      if (!this.isModified('password'))
//         next()
//         try {
//             this.password = await bcrypt.hash(this.password, 10)
//             next()
//         } catch (error) {
//             console.log(error)
//         }
//     })

// userSchema.post("save", function(doc, next) {
//     const information = `this new user data name ${doc.name} and userType ${doc.usertype}`
//     const text = fs.writeFile ('../text.txt', information, 'utf-8', (err) => {
//         if (err) {
//             console.log(err)
//         }
//          console.log(text)
//          next()
//     })

// })

const User = mongoose.model('User', userSchema)

module.exports = { User }