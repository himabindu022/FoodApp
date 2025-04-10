const express = require('express')
const route = express.Router()
const { tokenGenerate, isAuthorized } = require('../middleware/token.js')
const upload = require('../middleware/multer.js')
const restaurantValidation = require('../validations/restaurantValidation.js')
const validate = require('../middleware/validate.js')
const { 
    createRestaurant, 
    getAllRestaurants, 
    getByIdRestaurant, 
    deleteRestaurant, 
    updateRestaurant, 
    restaurantgetAllOrders,
    searchRestaurant   } = require('../controllers/resturantController')

route.post('/create', /*tokenGenerate,validate(restaurantValidation), upload.single('file')*/ createRestaurant)
route.get('/getAll',  getAllRestaurants)
route.get('/:id', getByIdRestaurant)
route.delete('/:id', deleteRestaurant)
route.patch('/:id',updateRestaurant)
//route.get('/:id', restaurantgetAllOrders)
route.get('/search', searchRestaurant)


module.exports = route