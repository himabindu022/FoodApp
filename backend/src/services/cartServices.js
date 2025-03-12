const { Cart } = require("../models/cartModel");

const createCart = async(body) => {
    return Cart.create(body)
}

const getCarts = async() => {
    return Cart.find()
}

const getCart = async(id) => {
    return Cart.findById(id)
}

const updateCart = async(id, body) => {
    return Cart.findOneAndUpdate(id, body,{new: true})
}

const deleteCart = async(id) => {
    return Cart.findOneAndDelete(id)
}

module.exports = {
    createCart,
    getCarts,
    getCart,
    updateCart,
    deleteCart
}