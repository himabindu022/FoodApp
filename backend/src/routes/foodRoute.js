const express = require("express")
const route = express.Router()

const { getAllFood, createFood, updateFood, foodAggre } = require('../controllers/foodControllers.js')

route.get('/', getAllFood)
//route.get('/:id', getFood)
route.post('/', createFood)
route.patch('/:id', updateFood)
route.get('/aggre', foodAggre)


module.exports = route