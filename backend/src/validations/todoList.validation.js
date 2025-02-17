const Joi = require("joi")

const todoSchema = Joi.object({
    title: Joi.string().trim().required(),
    description: Joi.string().trim().default('false'),
    status: Joi.valid('pending', 'in-progress', 'completed').default('pending'),
    dueDate: Joi.date().iso(),
    createdAt: Joi.date()
})

module.exports =  todoSchema 