const mongoose = require('mongoose')
const categorySchema  = require('../models/categoryModel')


const FoodSchema = new mongoose.Schema ({
    title : {
        type : String,
        required : [true, "title is require"]
    },
    description: {
        type: String,
        required: [true, "description is require"]
    },
    price: {
        type: Number,
        required: [true,'price is require']
    },
    images : [{
        type : String,
    }],
    category: categorySchema,
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurantId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
        default: 1,
        min:1,
        max:5
    },
    offers: {
        type: Number,
        default: 0
    }
    },
    { timestamps: true }
)

const Food = mongoose.model( 'Food' , FoodSchema)

module.exports = { Food }