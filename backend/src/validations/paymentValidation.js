const Joi = require('joi')

const paymentValidation = Joi.object({
    cardNumber: Joi.string().required(),
    nameOnCard : Joi.string().required(),
    expiryDate : Joi.string().required(),
    cvv : Joi.string().required(),
    amount : Joi.number().required(),
    orderSummary : Joi.ref('OrderSummary')
})

module.exports = paymentValidation