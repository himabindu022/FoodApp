const { CartModel } = require("../models/cartModel");

const createCart = async(body) => {
    return CartModel.create(body)
}

const getAllCart = async() => {
    return CartModel.find()
}


const getCart = async(id) => {
    return CartModel.find(id)
}


const updateCart = async(id, body) => {
    return CartModel.findOneAndUpdate(id, body,{new: true})
}


const deleteCart = async(id) => {
    return CartModel.findOneAndDelete(id)
}

module.exports = {
    createCart,
    getAllCart,
    getCart,
    updateCart,
    deleteCart
}