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

const updateRestaurant = async(id, body) => {
    return Restaurant.findByIdAndUpdate(id, body,{new:true})
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