const express = require('express')
const route = express.Router()
const { createOrder, getAllOrders, getByIdOrder, updateOrder,deleteOrder } = require('../controllers/orderController.js')
const validate = require('../middleware/validate')
const orderValidation = require('../validations/orderValidation.js')

route.post('/create',validate(orderValidation), createOrder)
route.get('/', getAllOrders)
route.get('/:id', getByIdOrder)
route.patch('/:id', updateOrder)
route.delete('/:id', deleteOrder)

module.exports = route