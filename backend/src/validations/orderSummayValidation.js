const Joi = require("joi")

const OrderSummaryValidation  =  Joi.object({
    orderId: Joi.ref('Order'),
    delivery: Joi.ref('Delivery')
    
})

module.exports = orderSummaryValidation