const Joi = require('joi')

const restaurantValidation = Joi.object({
    title: Joi. string().min(18).max(30).required(),
    imageUrl: Joi.string(),
    foods: Joi.ref('Food'),
    time: Joi.string(),
    pickUp : Joi.string(),
    delivery: Joi.string(),
    isOpen: Joi.boolean().default('true'),
    logoUrl : Joi.string(),
    rating: Joi.number().min(1).max(5).default('1'),
    ratingCount: Joi.number(),
    code: Joi.number(),
    order: Joi.ref('Order'),
    buyer: Joi.ref('User')
})


module.exports = restaurantValidation