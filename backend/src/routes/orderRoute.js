const express = require('express')
const route = express.Router()
const { tokenGenerate , isAuthorized } = require('../middleware/token.js')
const { createOrder, getAllOrders, getByIdOrder, updateOrder,deleteOrder } = require('../controllers/orderController.js')
const validate = require('../middleware/validate')
const orderValidation = require('../validations/orderValidation.js')

route.post('/',validate(orderValidation), createOrder)
route.get('/', getAllOrders)
route.get('/:id', getByIdOrder)
route.patch('/:id',tokenGenerate, updateOrder)
route.delete('/:id',tokenGenerate, isAuthorized("admin"), deleteOrder)

module.exports = route