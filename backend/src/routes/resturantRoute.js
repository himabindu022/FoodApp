const express = require('express')
const route = express.Router()
const upload = require('../middleware/multer.js')
const { createRestaurant, getAllRestaurant, getByIdRestaurant, deleteRestaurant, updateRestaurant } = require('../controllers/resturantController')

route.post('/create', upload.single('file'), createRestaurant)
route.get('/getAll', getAllRestaurant)
route.get('/:id', getByIdRestaurant)
route.delete('/:id', deleteRestaurant)
route.patch('/:id', updateRestaurant)


module.exports = route