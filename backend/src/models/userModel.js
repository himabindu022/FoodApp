const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const validator = require('validator');
const fs = require('fs')

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
    address: {
        type: Array,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    role : {
        type : String,
        required : [true, 'User type is required'],
        default: 'client',
        enum : ['client', 'admin', 'vendor', 'user', 'moderator', 'editor','viewer']
    },
})


// userSchema.pre("save", async function(next) {
//      if (!this.isModified('password'))
//         return next()

//         try {
//             this.password = await bcrypt.hash(this.password, 10)
//             next()
//         } catch (error) {
//             console.log(error)
//         }
//     })

// userSchema.post("save", function(doc, next) {
//     const information = `this new user data name ${doc.name} and userType ${doc.usertype}`
//     fs.writeFile('../text.txt', information, 'utf-8', (err) => {
//         if (err) {
//             console.log(err)
//             next(err)
//         }
//          console.log(text)
//          next()
//     })

// })

const User = mongoose.model('User', userSchema)

module.exports = { User }