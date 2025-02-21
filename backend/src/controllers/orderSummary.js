const { OrderSummary, orderSummary } = require('../models/orderSummary')
const { Cart} = require('../models/cartModel')

const createOrderSummary = async( req, res) => {
    try {
        const { order, delivery } = req.body

        const cart  = await Cart.findOne({orderId: order})

        if(!cart){
            return res.status(404).json({message: 'Cart not found'})
        }

        const orderSummary = new OrderSummary({
            order,
            delivery,
        })
        await orderSummary.save()
        res.status(201).json({message: 'Order Summary created successfully'})
    } catch (error) {
        console.log(error)
    }
}

const cancelOrder = async (req, res) => {
    try {
        const order = await OrderSummary.findOne(req.params.id)

        if(!order){
            return res.status(404).json({message: 'Order not found'})
        }
        order.status = 'cancelled'
        await order.save()
        res.status(200).json({message: 'Order cancelled successfully'})
    } catch (error) {
        console.log(error)
    }
}

const updateOrder = async(req, res) => {
    try {
        const { order, delivery } = req.body;
        const orderSummary = await OrderSummary.findOne(req.params.id)

        if(!orderSummary){
            return res.status(404).json({message: 'Order not found'})
        }

        const orders = await orderSummary.findOneAndUpdate(req.params.id,req.body, {new:true})
        res.status(200).json({message: 'Order updated successfully'})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createOrderSummary,
    cancelOrder,
    updateOrder
}