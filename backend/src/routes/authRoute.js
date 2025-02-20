const { registerController, login } = require('../controllers/authController.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')

const express = require('express')
const route = express.Router()

route.post('/register',validate(userValidation), registerController)
route.get("/login", login)

module.exports = route