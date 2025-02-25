const { Restaurant } = require('../models/resturantModel')
const upload = require('../middleware/multer')
const { APIfeatures } = require('./../utils/APIfeatures')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createRestaurant = async(req, res, next) => {
    try {
        const {title, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, imageUrl} = req.body;
         console.log(req.body)
       if(!title ||!foods ||!time ||!pickup ||!delivery ||!isOpen ||!rating ||!ratingCount ||!code ||!imageUrl ||!logoUrl) {
              errorResponse(res, httpStatusCode.NOT_FOUND , 'error','Please fill in all fields.');
       }

       const newRestaurant = await Restaurant.create(req.body)
       console.log(newRestaurant)

        successResponse(res, httpStatusCode.CREATED , 'success','Restaurant created successfully', newRestaurant)
    } catch (error) {
        next(error)
    }
}

const getAllRestaurant = async(req, res, next) => {
    try {
        const features = new APIfeatures(Restaurant.find(),req.query).filter().sort().limitFields().paginate()
        const restaurants = await features.req.query
        return res.status(200).json({message:"received all the data of Restaurants", length:query.length, restaurants})
    } catch (error) {
        next(error)
    }
}

const getByIdRestaurant = async(req, res) => {
    try {
        const getRestaurant = await Restaurant.findOne({_id:req.params.id}).populate('foods').populate('order').populate('buyer')
        if(!getRestaurant) {
           errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        successResponse(res, httpStatusCode.CREATED , 'success',"received all the data of Restaurants", getRestaurant)
    } catch (error) {
        console.log(error)

    }
}

const updateRestaurant  = async(req, res, next) => {
    try {
        const update = await Restaurant.findById(req.params.id)

        if(!update) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }

        const updateRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await updateRestaurant.save()
        successResponse(res, httpStatusCode.CREATED , 'success','Updated successfully', updateRestaurant)
    } catch (error) {
        next(error)
    }
}

const deleteRestaurant = async(req,res) => {
    try {
        const deleteRestaurant = await Restaurant.findByIdAndDelete(req.params.id)

        if(! deleteRestaurant) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        successResponse(res, httpStatusCode.CREATED , 'success',"Deleted Restaurant", deleteRestaurant)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurant,
    getByIdRestaurant,
    deleteRestaurant,
    updateRestaurant
}