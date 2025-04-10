const { body } = require('express-validator')
const { resetPassword } = require('../src/controllers/userControllers')

updatePasswordValidator = [
    body('email', 'Email is required').custom( value => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-z]$/
        if(!emailRegex.test(value)){
            return false
        }
        return true
    }),

    body('oldPassword', 'Password is required')
    .not()
    .isEmpty(),

    body('newPassword', 'Password is required').custom( value => {
        if(value === req.body.oldpassword) {
            return false
        }
        return true
    })
]

resetPasswordValidator = [
    body('newpassword', 'Password must 8 charcters')
    .not()
    .notEmpty(),

    body('confirmpassword', 'Password must 8 charcters').custom( value => {
        if(value !== req.body.newpassword) {
            return false
        }
        return true
    }),

    body('email', 'Email is required').custom( value => {
        const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+.[a-z]$/
        if(!emailRegex.test(value)){
            return false
        }
        return true
    }),
];

module.exports = {
    updatePasswordValidator,
    resetPasswordValidator
}