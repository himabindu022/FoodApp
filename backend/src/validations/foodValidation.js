const Joi = require("joi")

const foodValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    foodtags: Joi.string(),
    category: Joi.string().valid('chicken pizza','veg pizza', 'non veg pizza'),
    isAvailable: Joi.boolean().default('true'),
    restaurant : Joi.ref('Restaurant'),
    rating: Joi.number().min(1).max(5).default(1)
})

module.exports = foodValidation