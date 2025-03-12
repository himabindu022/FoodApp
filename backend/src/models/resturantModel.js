const mongoose = require('mongoose')
const citiesInIndia = require('../constants/citiesInIndia')
const CategorySchema = require('./categoryModel')

const restaurantSchema = mongoose.Schema ({
    title : {
        type : String,
        min: 18,
        max:30,
        required : [true, "title is required"]
    },
    description : {
        type : String,
    },
    category : CategorySchema,
    // foods: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Food',
    // }],
    timings : {
        opening: {
            type: String,
            required: [true, "opening time is required"],
        },
        closing: {
            type: String,
            required: [true, "closing time is required"],
        } 
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    logoUrl: {
        type: String,
    },
    rating: {
        type: Number,
        default: 1,
        min:1,
        max:5
    },
    gstNumber: {
        type: Number,
    },
    fssaiCertified: {
        type: Boolean,
        default: false
    },
    location: {
        type: String,
        enum: citiesInIndia,
        required: [true, "location is required"],
    }
     // pickUp: {
    //     type: String,
    //     dafault: true
    // },
    // delivery : {
    //     type: String,
    //     default: true
    // },
    // order : {
    //      type: mongoose.Schema.Types.ObjectId,
    //      ref: 'Order',
    // },
    // buyer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // }
    },
    { timestamps: true }
)

const Restaurant = mongoose.model( 'Restaurant' , restaurantSchema)

module.exports = { Restaurant }