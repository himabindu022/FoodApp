const express = require('express')
const route = express.Router()
const passport  = require('passport')
const { registerController, login } = require('../controllers/authController.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')
const passportConfig = require('../../config/passport.js')//import passport config
const successResponse = require('../utils/successResponse.js')

route.post('/register', registerController)

route.post("/login", passport.authenticate("local",{
    successRedirect: '/sucess',
    failureRedirect: '/login' ,
    failureFlash: true, }) , function(req, res) {
    res.redirect('/')
})

module.exports = route