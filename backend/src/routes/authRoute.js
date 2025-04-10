const express = require('express')
const route = express.Router()
const passport  = require('passport')
const { registerController, login } = require('../controllers/authController.js')
const { tokenGenerate, isAuthorized } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')
const passportConfig = require('../../config/passport.js')//import passport config
const successResponse = require('../utils/successResponse.js')
const { registrationValidation , loginValidation } = require('../../helper/authValidator.js')

route.post('/register', registrationValidation, registerController)
route.get('/login', loginValidation, login)

// route.post("/login", passport.authenticate("local",{
//     successRedirect: '/sucess',
//     failureRedirect: '/login' ,
//     failureFlash: true, }) , function(req, res) {
//     res.redirect('/')
// })

module.exports = route