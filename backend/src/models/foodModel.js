const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema ({
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
    foodtags : {
        type : String,
    },
    category: {
        type: String,
        enum:['chicken pizza', 'veg pizza', 'non veg pizza']
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    restaurant: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    rating: {
        type: Number,
        default: 1,
        min:1,
        max:5
    }
    },
    { timestamps: true }
)

const Food = mongoose.model( 'Food' , FoodSchema)

module.exports = { Food }