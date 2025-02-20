const Joi = require("joi")

const todoValidation = Joi.object ({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().default('false'),
    status: Joi.string().valid('pending', 'in-progress', 'completed').default('pending'),
    dueDate: Joi.date().iso(),
    createdAt: Joi.date().default(Date.now)
})

module.exports =  todoValidation 