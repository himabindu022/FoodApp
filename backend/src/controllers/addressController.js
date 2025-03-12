const { addressServices } = require('../services/addressServices.js')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createAddress = async(req, res) => {
    try {
        const {name, state, city, street, blockNo, phone } = req.body

        if(!name ||!state ||!city ||!street ||!blockNo||!phone) {
            errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'Please fill in all fields.')
        }
        const address = await addressServices. createAddress(req.body)
        successResponse(res,httpStatusCode.CREATED, 'success', 'created successfully', address)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Internal Server Error')
    }
}

const updateAddress = async(req, res) => {
    try {
        const {id} = req.params
        const address = await addressServices.getAddress({id})

        if(!address) {
            errorResponse(res, httpStatusCode.NOT_FOUND,'error', 'Delivery not found.')
        }

        const newAddress = await addressServices.updateAddress({_id:req.params.id}, address,{new:true})
        successResponse(res,httpStatusCode.CREATED,success,'Updated Successfully ', newAddress );

    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')
    }
}

// const getAllAddress = async(req,res) => {
//     try {
//         const address = await addressServices.getAllAddresses()

//         if(!delivery) {
//             errorResponse(res,httpStatusCode.NOT_FOUND,error, 'Delivery not found')
//         }
//         successResponse(res, httpStatusCode.CREATED,success,'successfully received', address)
//     } catch (error) {
//         console.log(error)
//         errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')

//     }
// }

const getByIdAddress = async(req, res) => {
    try {
        const {id} = req.params
        const  address = await addressServices.getAddress(id).populate('order')

        if(!address) {
            errorResponse(res, httpStatusCode.NOT_FOUND,error, 'Delivery not found.')
        }
        successResponse(res, httpStatusCode.CREATED, success,"successfully received", address)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')

    }
}

const deleteAddress = async(req, res) => {
    try {
        const {id} = req.params
        const address = await addressServices.deleteDelivery(id)

        if(!address) {
            errorResponse(res, httpStatusCode.NOT_FOUND, error,'Delivery not found')
        }
        successResponse(res,httpStatusCode.CREATED,success,'Delivery deleted successfully', delivery)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal Server Error')

    }

}
module.exports = {
    createAddress,
    //getAllAddress,
    getByIdAddress,
    deleteAddress,
    updateAddress
}