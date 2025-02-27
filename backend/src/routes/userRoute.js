const express = require("express")
const route = express.Router()
const { tokenGenerate, isAuthorized } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')
const { getUser, getUsers, updateUser, resetPassword, updatedPassword } = require('../controllers/userControllers')

route.get('/getUser/:id', getUser)
route.get('/getUsers', getUsers)
route.patch('/updateUser/:id', isAuthorized('moderator','client'),tokenGenerate,validate(userValidation), updateUser)
route.post('/resetpassword',tokenGenerate, resetPassword)
route.post('/updatepassword/:id',tokenGenerate, updatedPassword)


module.exports = route