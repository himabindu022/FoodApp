const express = require("express")
const route = express.Router()
const { tokenGenerate } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')
const { getUser, getUsers, updateUser, resetPassword, updatedPassword } = require('../controllers/userControllers')

route.get('/getUser/:id',tokenGenerate, getUser)
route.get('/getUsers', getUsers)
route.patch('/updateUser/:id', validate(userValidation), updateUser)
route.post('/resetpassword', resetPassword)
route.post('/updatepassword/:id', updatedPassword)


module.exports = route