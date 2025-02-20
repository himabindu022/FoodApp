const Joi = require("joi")

const userValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-z0-9]{10-18}$')),
    address : Joi.array(),
    phone : Joi.string().pattern(/^[6-9]{1}[0-9]{9}$/),
    usertype : Joi.string().valid('client', 'admin', 'vendor', 'driver')
})

module.exports = userValidation