const express = require("express")
const route = express.Router()
const { tokenGenerate, isAuthorized } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')
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


module.exports = route