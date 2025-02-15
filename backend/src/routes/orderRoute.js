const express = require('express')
const route = express.Router()
const { createOrder, getAllOrders, getByIdOrder, updateOrder,deleteOrder } = require('../controllers/orderController.js')

route.post('/create', createOrder)
route.get('/', getAllOrders)
route.get('/:id', getByIdOrder)
route.patch('/:id', updateOrder)
route.delete('/:id', deleteOrder)

module.exports = route