const rateLimit = require('express-rate-limit')
const { message } = require('../validations/userValidation')

const limits = rateLimit({
    max: 1000,
    windowMs: 60*60*1000,
    message: 'We have received too many requests from the IP . Please try after one hour'
})


module.exports = limits