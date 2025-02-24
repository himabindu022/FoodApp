const { Food } = require('../models/foodModel') 
const mongoose = require('mongoose')

const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')


const getAllFood = async(req, res, next) => {
    try {
        const foods = await Food.find()
        console.log(foods)
        if(!foods) {
            errorResponse(res,httpStatusCode.NOT_FOUND,error, "No foods found" )
        }
        console.log(foods)
        successResponse(res,httpStatusCode.CREATED, 'success','received all food data',foods )
    } catch (error) {
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR,'error', "Internal server error")
        next(error)

    }
}

const getFood = async(req, res, next) => {
    try {
        const food = await Food.findById(req.params.id).populate('restaurant')
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

        if(!title ||!description ||!price ||!foodtags ||!category ||!isAvailable ||!rating ||!restaurant) {
            return res.status(400).json({ message: "Please fill in all fields" })
        }
        const createFood = new Food({
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
        return res.status(201).json({message:'created successfully', Food :createFood})
    } catch (error) {
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal server Error')
        next(error)
    }
}

const updateFood = async(req, res) => {
    try {
        const { title, description, price, foodtags, category, isAvailable, rating, restaurant} = req.body
        const food = await Food.findById(req.params.id)
     
        if(!food) {
            return res.status(404).json({ message: "Food not found" })
        }
        const updateFood = {
            title : title ?? food.title,
            description : description ?? food.description,
            price : price ?? food.price,
            foodtags : foodtags ?? food.foodtags,
            category : category ?? food.category,
            isAvailable : isAvailable ?? food.isAvailable,
            rating : rating ?? food.rating,
            restaurant : restaurant ?? food.restaurant
        }
        await Food.findByIdAndUpdate({_id:req.params.id}, updateFood, {new: true})
    } catch (error) {
        console.log(error)
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal server Error')
    }
}

const foodAggre = async (req, res) => {
    try {
        const foodss = await Food.aggregate([
            { 
                $match: {                        //filter
                    category : "veg pizza"
                } 
            }, 
            {
                $group: {                        //group
                    _id: "$category",
                    totalPrice: { $sum: "$price" },
                    count: {$sum : 1 },
                }
            },
            { 
                $sort: {                       //sort
                    totalPrice: 1
                }
            },   
            {$unwind : '$restaurant'},         //decontructor the array into single document
            {
                $project: {                  // Project the desired fields
                    _id: "totalprice",
                    category: "$_id",
                    totalPrice: 1,
                    count: 1
                }
            }   
        ]);
        console.log(foodss)
        return res.status(200).json(foodss);
    } catch (error) {
        console.log(error);
        errorResponse(res,httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Internal server Error')

    }
};


module.exports = {
    getAllFood,
    createFood,
    updateFood,
    foodAggre
}