const Joi = require("joi")

const orderValidation = Joi.object({
    foods: Joi.ref('Food'),
    payment : Joi.number(),
    buyer: Joi.ref('User'),
    status: Joi.string().valid('preparing','prepare', 'on the way', 'deliverd'),

})

module.exports = orderValidation