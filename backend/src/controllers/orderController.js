// const { Order } = require('../models/orderModel')
// const { Cart } = require('../models/cartModel.js')
// const { User } = require('../models/userModel.js')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')
const myEmitters = require("events")
const { OrderStatus } = require('../middleware/userEmitter')

const { 
    orderServices,
    cartServices,
    userServices
} = require('../services/index.js')

//placeOrder
const createOrder = async(req, res) => {
    try {
        const { buyer, cart, status } = req.body
        //console.log(req.body)
        const carts = await cartServices.getCarts(buyer)
        //console.log(carts)

        // const cart1 =  await cartServices.getCart(cart)
        // console.log(cart1)

        if(!carts){
            return errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'Cart not found6')
        }

        const order = await orderServices.createOrder({
            buyer,
            cart: carts,
            status
            })
            
        await order.save(statusdata);
        console.log(order)
        return successResponse(res, httpStatusCode.CREATED, 'success', 'updated successfully', order)

    } catch (error) {
        console.log(error);
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

// const getAllOrders = async(req, res) => {
//     try {
//         const order = await orderServices.getAllOrder()

//         if(!order) {
//             return errorResponse(res, httpStatusCode.NOT_FOUND, 'error', "No orders found5",)
//         }
//         return successResponse(res, httpStatusCode.CREATED, 'success', 'updated successfully', order)
//     } catch (error) {
//         console.log(error)
//         errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
//     }
// }


//getOrdersByUserId
const getByIdOrder = async(req, res) => {
    try {
        const { id } = req.params.id
        const order = await orderServices.getAllOrder(id)//.populate('buyer').populate('cart').populate('foods')

        if(!order) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found4" )
        }
        return successResponse(res, httpStatusCode.CREATED, 'success', "order found", order)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

//update Order Status
const updateOrder = async(req, res) => {
    try {
        const { food, buyer, status} = req.body
        const order = await orderServices.getOrder(req.params.id)

        if(!order) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found3" )
        }
        //order.food = food ?? order.food,
        //order.payment = payment ?? order.payment,
        //order.buyer = buyer ?? order.buyer,
        order.status = status ?? order.status

        const updateOrder = await orderServices.updateOrder(req.params.id, order, {new:true})
        return successResponse(res, httpStatusCode.CREATED, 'success', "Order status updated successfully", updateOrder )
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}


//cancel order
const deleteOrder = async(req,res) => {
    try {
        const order = await orderServices.getOrder(req.params.id)

        if(!order) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found2" )
        }
        order.status = 'cancelled'
        await order.save()    
        return successResponse(res, httpStatusCode.CREATED, 'success','deleted Successfully', order)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

//confirmationOrder

const orderConfrimation = async(req, res) => {
    try {
        const order = await orderServices.getOrder(req.params.id)

        if(!order) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found" )
        }
        order.status = 'confirmed'
    } catch (error) {
        console.log(error)
    }
}


const trackOrder = async(req, res) => {
    try {
        //const { cart } = req.body
        const order = await orderServices.getOrder(req.params.id).populate('cart').populate('buyer').populate('foods.food')

        if(!order) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error', "No data found1" )
        }

        return successResponse(res, httpStatusCode.CREATED, 'success', 'tracking the order', {
            order: order,
            buyer: order.buyer,
            cart: cart.foods.map((item) => ({
                    foods:item.foods,
                    quantity: item.quantity,
                    totalPrice:item.totalPrice
                })),
                status: order.status,
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createOrder,
    //getAllOrders,
    getByIdOrder,
    updateOrder, 
    deleteOrder,
    trackOrder
}