const express = require('express')
const route = express.Router()
const { tokenGenerate } = require('../middleware/token.js')
const { createOrder, getAllOrders, getByIdOrder, updateOrder,deleteOrder } = require('../controllers/orderController.js')
const validate = require('../middleware/validate')
const orderValidation = require('../validations/orderValidation.js')

route.post('/create',tokenGenerate,validate(orderValidation), createOrder)
route.get('/', getAllOrders)
route.get('/:id', getByIdOrder)
route.patch('/:id',tokenGenerate, updateOrder)
route.delete('/:id',tokenGenerate, deleteOrder)

module.exports = route