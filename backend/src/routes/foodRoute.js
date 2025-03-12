const express = require("express")
const route = express.Router()
const { tokenGenerate } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const foodValidation = require('../validations/foodValidation.js')
const { getAllFood, getFood, createFood, updateFood, deleteFood, foodAggre } = require('../controllers/foodControllers.js')

route.get('/', getAllFood)
route.get('/:id', getFood)
route.post('/', createFood)
route.patch('/:id', updateFood)
route.delete('/:id', deleteFood)
//route.get('/aggre', foodAggre)

module.exports = route