const { body } = require('express-validator')


registrationValidation = [
    body('username', 'Name is required')
    .not()
    .isEmpty(),

    body('email', 'Email is required').custom( value => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-z]$/
        if(!emailRegex.test(value)){
            return false
        }
        return true
    }),
    

    body('password', 'Password must 8 charcters')
    .not()
    .notEmpty()
]

loginValidation = [
    body('username', 'Name is required')
    .not()
    .isEmpty(),

    body('password', 'Password must 8 charcters')
    .not()
    .notEmpty()
]

module.exports = {
    registrationValidation,
    loginValidation
}