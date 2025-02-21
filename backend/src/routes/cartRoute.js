const express = require('express')
const route = express.Router()
const { createCart, getAllCart, getByIdCart, updateCart, deleteCart } = require('../controllers/cartController')

route.post('/', createCart)
route.get('/:id', getByIdCart)
route.get('/', getAllCart)
//route.patch('/:id', updateCart)
route.delete('/:id', deleteCart)

module.exports = route