const { Order } = require('../models/orderModel')

const createOrder = async(req, res) => {
    try {
        const { food, payment, buyer, status} = req.body

        if(!food ||!payment ||!buyer ||!status) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const order = new Order({
          food,
          payment,
          buyer,
          status
        })
        await order.save()
        return res.status(200).json({message:'created successfully',  order })
    } catch (error) {
        console.log(error);
    }
}

const getAllOrders = async(req, res) => {
    try {
        const order = await Order.find()

        if(!order) {
            return res.status(404).json({ message: "No orders found" })
        }
        return res.status(200).json({ order })
    } catch (error) {
        console.log(error)
    }
}

const getByIdOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('food').populate('buyer')

        if(!order) {
            return res.status(404).json({ message: "No data found" })
        }
        return res.status(200).json({ message: "order found", order:order })

    } catch (error) {
        console.log(error)
    }
}

const updateOrder = async(req, res) => {
    try {
        const { food, payment, buyer, status} = req.body
        const order = await Order.findByIdAndUpdate(req.params.id)

        if(!order) {
            return res.status(404).json({ message: "No data found" })
        }
        order.food = food ?? order.food,
        order.payment = payment ?? order.payment,
        order.buyer = buyer ?? order.buyer,
        order.status = status ?? order.status

        const updateOrder = await Order.findByIdAndUpdate(req.params.id, order, {new:true})
        return res.status(200).json({ message: "Order updated successfully", updateOrder })
    } catch (error) {
        console.log(error)
    }
}

const deleteOrder = async(req,res) => {
    try {
        const order = await Order.findById(req.params.id)

        if(!order) {
            return res.status(404).json({ message: "No data found" })
        }
        return res.status(200).json({message:'deleted Successfully', order:order})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getByIdOrder,
    updateOrder, 
    deleteOrder

}