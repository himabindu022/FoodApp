const { Delivery } = require('../models/deliveryModel.js')

const createDelivery = async(req, res) => {
    try {
        const {name, address, city, phone, order } = req.body

        if(!name||!address||!city||!phone||!order) {
            return res.status(400).json({message: 'Please fill in all fields.'})
        }
        const delivery = await Delivery.create(req.body)
        return res.json(delivery)
    } catch (error) {
        console.log(error)
    }
}

const updateDelivery = async(req, res) => {
    try {
        const {id} = req.params
        const {name, address, city, phone, order } = req.body

        const delivery = await Delivery.find({id})

        if(!delivery) {
            return res.status(404).json({message: 'Delivery not found.'})
        }
    
        delivery.name = name ?? delivery.name,
        delivery.address = address ?? delivery.address,
        delivery.city = city ?? delivery.city,
        delivery.phone = phone ?? delivery.phone,
        delivery.order = order ?? delivery.order
        await delivery.save
        console.log(delivery)
        const newDelivery = await Delivery.findByIdAndUpdate({_id:req.params.id}, delivery,{new:true})
        return res.status(404).json({ message: 'Updated Successfully ', newDelivery });
    } catch (error) {
        console.log(error)
    }
}

const getAllDelivery = async(req,res) => {
    try {
        const delivery = await Delivery.find()

        if(!delivery) {
            return res.status(404).json({message: 'Delivery not found.'})
        }
        return res.json(delivery)
    } catch (error) {
        console.log(error)
    }
}

const getByIdDelivery = async(req, res) => {
    try {
        const {id} = req.params
        const  delivery = await Delivery.findById(id).populate('order')

        if(!delivery) {
            return res.status(404).json({message: 'Delivery not found.'})
        }
        return res.json({message:"successfully received",delivery})
    } catch (error) {
        console.log(error)
    }
}

const deleteDelivery = async(req, res) => {
    try {
        const {id} = req.params
        const delivery = await Delivery.findByIdAndDelete(id)

        if(!delivery) {
            return res.status(404).json({message: 'Delivery not found.'})
        }
        return res.json({message: 'Delivery deleted successfully.'})
    } catch (error) {
        console.log(error)
    }

}
module.exports = {
    createDelivery,
    updateDelivery,
    getAllDelivery,
    getByIdDelivery,
    deleteDelivery
}