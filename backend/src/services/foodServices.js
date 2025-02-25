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

const updateFood = async(id) => {
    return Food.findByIdAndUpdate(id)
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