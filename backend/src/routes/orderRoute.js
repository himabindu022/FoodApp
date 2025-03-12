const express = require('express')
const route = express.Router()
const { tokenGenerate , isAuthorized } = require('../middleware/token.js')
const { createOrder, getAllOrders, getByIdOrder, updateOrder,deleteOrder, trackOrder } = require('../controllers/orderController.js')
const validate = require('../middleware/validate')
const orderValidation = require('../validations/orderValidation.js')

route.post('/', createOrder)
//route.get('/', getAllOrders)

route.get('/:id', getByIdOrder)
route.patch('/:id', updateOrder)
route.delete('/:id', deleteOrder)
route.get('/:id', trackOrder)

module.exports = route