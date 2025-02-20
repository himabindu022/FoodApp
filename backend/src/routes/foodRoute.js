const express = require("express")
const route = express.Router()
const validate = require('../middleware/validate.js')
const foodValidation = require('../validations/foodValidation.js')
const { getAllFood, createFood, updateFood, foodAggre } = require('../controllers/foodControllers.js')

route.get('/', getAllFood)
//route.get('/:id', getFood)
route.post('/', validate(foodValidation), createFood)
route.patch('/:id', updateFood)
route.get('/aggre', foodAggre)


module.exports = route