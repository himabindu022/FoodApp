const express = require("express")
const route = express.Router()
const { tokenGenerate } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const foodValidation = require('../validations/foodValidation.js')
const { getAllFood, getFood, createFood, updateFood, deleteFood, foodAggre } = require('../controllers/foodControllers.js')

route.get('/', getAllFood)
//route.get('/:id', getFood)
route.post('/', tokenGenerate,validate(foodValidation), createFood)
route.patch('/:id',tokenGenerate, updateFood)
route.delete('/:id', tokenGenerate, deleteFood)
route.get('/aggre', foodAggre)

module.exports = route