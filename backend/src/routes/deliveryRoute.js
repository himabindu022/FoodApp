const express = require('express')
const route = express.Router()
const { createDelivery, getAllDelivery,getByIdDelivery, updateDelivery, deleteDelivery} = require('../controllers/deliveryController')

route.get('/', getAllDelivery)
route.get('/:id', getByIdDelivery)
route.post('/', createDelivery)
route.patch('/:id', updateDelivery)
route.delete('/:id', deleteDelivery)

module.exports = route