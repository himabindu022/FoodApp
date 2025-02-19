const { Delivery } = require('../models/deliveryModel.js')

const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createDelivery = async(req, res) => {
    try {
        const {name, address, city, phone, order } = req.body

        if(!name||!address||!city||!phone||!order) {
            errorResponse(res, httpStatusCode.NOT_FOUND, error, 'Please fill in all fields.')
        }
        const delivery = await Delivery.create(req.body)
        successResponse(res,httpStatusCode.CREATED, success, 'created successfully', delivery)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')
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
        successResponse(res,httpStatusCode.CREATED,success,'Updated Successfully ', newDelivery );

    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')
    }
}

const getAllDelivery = async(req,res) => {
    try {
        const delivery = await Delivery.find()

        if(!delivery) {
            errorResponse(res,httpStatusCode.NOT_FOUND,error, 'Delivery not found')
        }
        successResponse(res, httpStatusCode.CREATED,success,'successfully received', delivery)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')

    }
}

const getByIdDelivery = async(req, res) => {
    try {
        const {id} = req.params
        const  delivery = await Delivery.findById(id).populate('order')

        if(!delivery) {
            errorResponse(res, httpStatusCode.NOT_FOUND,error, 'Delivery not found.')
        }
        successResponse(res, httpStatusCode.CREATED, success,"successfully received", delivery)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')

    }
}

const deleteDelivery = async(req, res) => {
    try {
        const {id} = req.params
        const delivery = await Delivery.findByIdAndDelete(id)

        if(!delivery) {
            errorResponse(res, httpStatusCode.NOT_FOUND, error,'Delivery not found')
        }
        successResponse(res,httpStatusCode.CREATED,success,'Delivery deleted successfully', delivery)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')

    }

}
module.exports = {
    createDelivery,
    updateDelivery,
    getAllDelivery,
    getByIdDelivery,
    deleteDelivery
}