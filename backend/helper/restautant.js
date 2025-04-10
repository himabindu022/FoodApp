const { body } = require('express-validator')
const { createRestaurant } = require('../src/services/restaurantServices')

createRestaurantValidation = [
    body('title', 'title must be a string').isString(),
    body('timings', 'timings must be a number').isNumeric(),
    body('location', 'Location must be a string').isString(),
    body('rating', 'Rating must be a number').isFloat(),
    body('logoUrl', 'logoUrl must be a String').isInt(),
    body('description', 'Description must be a string').isString(),
    body('imageUrl' , 'Image must be a string').isString(),
    body('isAvailable', 'isAvailable must be a boolean').isString(),
    body('fssaiCertified', 'fssaiCertified must be a number').isInt(),
]