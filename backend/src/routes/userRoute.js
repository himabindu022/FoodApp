const express = require("express")
const route = express.Router()
const { tokenGenerate, isAuthorized } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')
<<<<<<< HEAD
const { getUser, getUsers, updateUser, resetPassword, updatedPassword } = require('../controllers/userControllers')
const {
    updatePasswordValidator,
    resetPasswordValidator
} = require('../../helper/userValidation.js')


route.get('/getUser/:id', getUser)
route.get('/getUsers', getUsers)
route.patch('/updateUser/:id',  updateUser)
route.post('/resetpassword', resetPasswordValidator,  resetPassword)
route.post('/updatepassword/:id', updatePasswordValidator, updatedPassword)
=======
const { 
        //getUser, 
        //getUsers, 
        updateUser, 
        resetPassword, 
        updatedPassword 
} = require('../controllers/userControllers')

//route.get('/getUser/:id', tokenGenerate, getUser)
//route.get('/getUsers', tokenGenerate,getUsers)
route.patch('/updateUser/', tokenGenerate, updateUser)
route.post('/resetpassword', tokenGenerate, resetPassword)
route.post('/updatepassword/:id', tokenGenerate,updatedPassword)
>>>>>>> 0135c9bc57345452a47d096ef8792324ac80ec66


module.exports = route