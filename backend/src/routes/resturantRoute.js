const express = require('express')
const route = express.Router()
const { tokenGenerate, isAuthorized } = require('../middleware/token.js')
const upload = require('../middleware/multer.js')
const restaurantValidation = require('../validations/restaurantValidation.js')
const validate = require('../middleware/validate.js')
const { createRestaurant, getAllRestaurant, getByIdRestaurant, deleteRestaurant, updateRestaurant } = require('../controllers/resturantController')

route.post('/create', tokenGenerate,validate(restaurantValidation), upload.single('file'), createRestaurant)
route.get('/getAll',  getAllRestaurant)
route.get('/:id', tokenGenerate, isAuthorized("client"), getByIdRestaurant)
route.delete('/:id',tokenGenerate, deleteRestaurant)
route.patch('/:id', tokenGenerate,updateRestaurant)


module.exports = route