const express = require('express')
const route = express.Router()
const { createCart } = require('../controllers/cartController')

route.post('/', createCart)
//route.get('/:id', getByIdCart)
//route.get('/', getAllCart)

module.exports = route