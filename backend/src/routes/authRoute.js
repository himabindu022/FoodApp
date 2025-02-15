const { registerController, login } = require('../controllers/authController.js')

const express = require('express')
const route = express.Router()

route.post('/register', registerController)
route.get("/login", login)

module.exports = route