const { foodServices } = require('../services/index.js') 
const mongoose = require('mongoose')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const getAllFood = async(req, res, next) => {
    try {
        const foods = await foodServices.getFoods()
        console.log(foods)
        if(!foods) {
            errorResponse(res,httpStatusCode.NOT_FOUND,error, "No foods found" )
        }
        console.log(foods)
        successResponse(res,httpStatusCode.CREATED, 'success','received all food data',foods )
    } catch (error) {
        //errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR,'error', "Internal server error")
        next(error)

    }
}

const getFood = async(req, res, next) => {
    try {
        const food = await foodServices.getFood(req.params.id).populate('restaurant')
        const foodie = food.toObject()
        console.log({"food":foodie})
        if(!food) {
            return res.status(404).json({ message: "Food not found" })
        }
        return res.status(200).json({message:"received food data", food:food })
    } catch (error) {
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal server Error')
        next(error)
    }
}

const createFood = async(req, res, next) => {
    try {
        const { title, description, price, foodtags, category, isAvailable, rating, restaurant} = req.body

        if(!title ||!description ||!price ||!category ||!isAvailable ||!rating ||!restaurantId ||!offers ||!images) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const createFood = new foodServices.createFood({
            title,
            description,
            price,
            foodtags,
            category,
            isAvailable,
            rating,
            restaurant
        })
        await createFood.save()
        successResponse(res, httpStatusCode.CREATED,'success','created successfully', createFood)
    } catch (error) {
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal server Error')
        next(error)
    }
}

const updateFood = async(req, res) => {
    try {
        const { title, description, price, foodtags, category, isAvailable, rating, restaurant} = req.body
        const food = await foodServices.getFood(req.params.id)
     
        if(!food) {
            errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Food not found" )
        }
        // const updateFood = {
        //     title : title ?? food.title,
        //     description : description ?? food.description,
        //     price : price ?? food.price,
        //     foodtags : foodtags ?? food.foodtags,
        //     category : category ?? food.category,
        //     isAvailable : isAvailable ?? food.isAvailable,
        //     rating : rating ?? food.rating,
        //     restaurant : restaurant ?? food.restaurant
        //}
        const updatedFood = await foodServices.updateFood({_id:req.params.id}, food, {new: true})
        successResponse(res, httpStatusCode.CREATED, 'success', 'updated successfully', updatedFood)
    } catch (error) {
        console.log(error)
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal server Error')
    }
}

const deleteFood = async(req, res) => {
    try {
        const food = await foodServices.getFood(req.params.id)

        if(!food) {
            errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Food not found" )
        }
        const deleted = await foodServices.deleteFood(req.params.id)
        successResponse(res, httpStatusCode.CREATED, 'success', 'updated successfully', deleted)
    } catch (error) {
        console.log(error)
    }
}

const foodAggre = async (req, res) => {
    try {
        const foodss = await foodServices.aggregate([
        {
            $match: {
                isAvailable: true
            }
        },
        {
            $addFields: {
                _id: "$category",
                name: "$title",
                available: "$isAvailable",
                total: "$price",
                rating: "$rating",
                category: "$category"
            }
         },
        //  {
        //     $lookup:{
        //         from:"restaurant",
        //         localField: "restaurant",
        //         foreignField: "_id",
        //         as:"restaurant"
        //     }
        //  },
        //  {
        //     $project:{
        //         resturant: {
        //             $arrayElemAt: ["$restaurant.foods", 0] 
        //         },
        //         _id: 0

        //     }
        //  },
        // {
        //     $lookup: {
        //         from:"food",
        //         localFields: "food",
        //         foreignField: "_id",
        //         as: "food"
        //     }
        // },
        // {
        //     $project: {
        //         food:{
        //             $arrayElemAt: ["$food", 0]
        //         }
        //     }
        // }

        ])
        //console.log(foodss)
        return res.status(200).json(foodss);
    } catch (error) {
        console.log(error);
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal server Error')

    }
};


module.exports = {
    getAllFood,
    getFood,
    createFood,
    updateFood,
    deleteFood,
    //foodAggre
}