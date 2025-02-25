const { Restaurant } = require('../models/resturantModel')

const createRestaurant  = async(body) => {
    return  Restaurant.create(body)
}

const getRestaurant = async(id) => {
    return Restaurant.findById(id)
}

const getRestaurants = async() => {
    return Restaurant.find({})
}

const updateRestaurant = async(id) => {
    return Restaurant.findByIdAndUpdate(id)
}

const deleteRestaurant = async(id) => {
    return Restaurant.findByIdAndDelete(id)
}

module.exports = {
   createRestaurant,
   getRestaurant,
   getRestaurants,
   updateRestaurant,
   deleteRestaurant
   
}