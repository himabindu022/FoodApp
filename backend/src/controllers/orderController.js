const { Order } = require('../models/orderModel')
const { Cart } = require('../models/cartModel.js')
const { User } = require('../models/userModel.js')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createOrder = async(req, res) => {
    try {
        const { buyer } = req.body
        console.log(req.body)
        const cart = await Cart.findOne({buyer: req.body.buyer})
        console.log(cart)
        if(!cart){
            errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'Cart not found')
        }

        const order = new Order({
            buyer,
            user: buyer,
            foods: cart.foods,
            totalPrice: cart.totalPrice
        });
        await order.save();
        successResponse(res, httpStatusCode.CREATED, 'success', 'updated successfully', order)
    } catch (error) {
        console.log(error);
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

const getAllOrders = async(req, res) => {
    try {
        const order = await Order.find()

        if(!order) {
            errorResponse(res, httpStatusCode.NOT_FOUND, 'error', "No orders found",)
        }
        successResponse(res, httpStatusCode.CREATED, 'success', 'updated successfully', order)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

const getByIdOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('food').populate('buyer')

        if(!order) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found" )
        }
        successResponse(res, httpStatusCode.CREATED, 'success', "order found", order )

    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

const updateOrder = async(req, res) => {
    try {
        const { food, payment, buyer, status} = req.body
        const order = await Order.findByIdAndUpdate(req.params.id)

        if(!order) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found" )
        }
        order.food = food ?? order.food,
        order.payment = payment ?? order.payment,
        order.buyer = buyer ?? order.buyer,
        order.status = status ?? order.status

        const updateOrder = await Order.findByIdAndUpdate(req.params.id, order, {new:true})
        successResponse(res, httpStatusCode.CREATED, 'success', "Order updated successfully", updateOrder )
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

const deleteOrder = async(req,res) => {
    try {
        const order = await Order.findById(req.params.id)

        if(!order) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found" )
        }
        successResponse(res, httpStatusCode.CREATED, 'success','deleted Successfully', order)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getByIdOrder,
    updateOrder, 
    deleteOrder

}