const express = require('express')
const route = express.Router()
const { createCart, getByIdCart, removeItemFromCart, addItemsToCart, updateCart } = require('../controllers/cartController')

route.post('/', createCart)
route.get('/:id', getByIdCart)
route.patch('/:id', updateCart)
route.delete('/:id', removeItemFromCart)
route.post('/add/:id', addItemsToCart)

module.exports = route