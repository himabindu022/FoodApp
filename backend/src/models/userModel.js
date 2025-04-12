const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const validator = require('validator');
const fs = require('fs')
const { roles } = require('../../config/roles')

const  addressSchema   = require('../models/addressModel')
const virtuals  = require('../utils/virtuals')

//const  addressSchema   = require('../models/addressModel');
//const { instance } = require('../validations/userValidation');
//const { required } = require('joi');


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
            if(!value.match(/\d/) || !value.match(/[a-zA-Z]/ || !value.length<8)) {
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
        //enum : ['admin','owner','customer']
        enum: Object.keys(roles)

    },
    gender: {
        type: String,
        enum:["FEMALE", "MALE"],
        required: [true, 'Gender is required'],
    },
    // tokens: [{ 
    //     token : {
    //         type: String,
    //         required: true
    //     }
    // }]       
},
    {
    toJSON: { virtuals:true},
    toObject: { virtuals: true}
    },
    // order: {
    //    type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Order',
    //},
    // cart: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Cart',
    // },
   
)

virtuals(userSchema, 'food', 'Food', 'user')
virtuals(userSchema, 'restaurant', 'Restaurant', 'user')


// userSchema.methods.generateAuthToken = async function(){
//     const user = this
//     const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
//     user.tokens = user.tokens.concat({ token })
//     await user.save()
//     return token
//   }


// userSchema.pre("save", async function(next) {
//     const user = this
//     if (!user.isModified('password')) {
//             user.password = await bcrypt.hash(this.password, 10)
//         }
//         next()
// })

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