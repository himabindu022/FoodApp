const express = require("express")
const route = express.Router()
const { tokenGenerate, isAuthorized } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const userValidation = require('../validations/userValidation.js')
const { rolePermissions } = require('../middleware/rolesPermissions.js')

const { getUser, getUsers, updateUser, resetPassword, updatedPassword } = require('../controllers/userControllers')
const {
    updatePasswordValidator,
    resetPasswordValidator
} = require('../../helper/userValidation.js')


// route.get('/getUser/:id', getUser)
// route.get('/getUsers', rolePermissions(['user']), getUsers)
// route.patch('/updateUser/:id',  updateUser)
// route.post('/resetpassword', resetPasswordValidator,  resetPassword)
// route.post('/updatepassword/:id', updatePasswordValidator, updatedPassword)

//const { 
        //getUser, 
        //getUsers, 
        //updateUser, 
        //resetPassword, 
        //updatedPassword 
//} = require('../controllers/userControllers')

route.get('/getUser', tokenGenerate, rolePermissions(['read']),getUser)
//route.get('/getUsers', tokenGenerate,getUsers)
route.patch('/updateUser/', tokenGenerate, updateUser)
//route.post('/resetpassword', tokenGenerate, resetPassword)
route.post('/updatepassword/:id', tokenGenerate,updatedPassword)


module.exports = route