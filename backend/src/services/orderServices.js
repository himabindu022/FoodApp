const { Order } = require("../models/orderModel");

const createOrder = async(body) => {
    return Order.create(body)
}

const getAllOrder = async() => {
    return Order.find()
}


const getOrder = async(id) => {
    return Order.findById(id)
}


const updateOrder = async(id, body) => {
    return Order.findOneAndUpdate(id, body,{new: true})
}


const deleteOrder = async(id) => {
    return Order.findOneAndDelete(id)
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrder,
    updateOrder,
    deleteOrder
}