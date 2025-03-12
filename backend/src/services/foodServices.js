const { Food } = require('../models/foodModel')

const createFood  = async(body) => {
    return  Food.create(body)
}

const getFood = async(id) => {
    return Food.findById(id)
}

const getFoods = async() => {
    return Food.find({})
}

const updateFood = async(id, body) => {
    return Food.findByIdAndUpdate(id,body,{ new: true})
}

const deleteFood = async(id) => {
    return Food.findByIdAndDelete(id)
}

module.exports = {
    createFood,
    getFood,
    getFoods,
    updateFood,
    deleteFood
}