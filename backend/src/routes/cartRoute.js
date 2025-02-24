const express = require('express')
const route = express.Router()
const { createCart, getAllCart, getByIdCart, removeItemFromCart } = require('../controllers/cartController')

route.post('/', createCart)
route.get('/:id', getByIdCart)
route.get('/', getAllCart)
//route.patch('/:id', updateCart)
route.delete('/:id', removeItemFromCart)

module.exports = route