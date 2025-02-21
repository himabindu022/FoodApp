const express = require("express")
const route = express.Router()
const { tokenGenerate } = require('../middleware/token.js')
const validate = require('../middleware/validate.js')
const foodValidation = require('../validations/foodValidation.js')
const { getAllFood, createFood, updateFood, foodAggre } = require('../controllers/foodControllers.js')

route.get('/', getAllFood)
//route.get('/:id', getFood)
route.post('/', tokenGenerate,validate(foodValidation), createFood)
route.patch('/:id',tokenGenerate, updateFood)
route.get('/aggre', foodAggre)


module.exports = route