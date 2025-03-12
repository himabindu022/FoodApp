const mongoose = require('mongoose')
const foodCategories = require('../constants/categories')

const CategorySchema = new mongoose.Schema ({
    food: {
        category: {
            type : String,
            enum : foodCategories.category,
            required : [true, "title is required"]
        },
        types: {
            type:String,
            enum:foodCategories.types,
            required:[true,"type is required"]
        }
    }, 
    imageUrl : {
        type : String,
    },
    },
    { timestamps: true }
)

//const Category = mongoose.model( 'Category' , CategorySchema)

module.exports =  CategorySchema 