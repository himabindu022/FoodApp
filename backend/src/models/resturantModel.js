const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema ({
    title : {
        type : String,
        required : [true, "title is required"]
    },
    imageUrl : {
        type : String,
    },
    foods: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
    },
    time : {
        type: String,
    },
    pickUp: {
        type: String,
        dafault: true
    },
    delivery : {
        type: String,
        default: true
    },
    isOpen:{
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
    ratingCount:{
        type:Number,
    },
    code: {
        type: Number,
    },
    order : {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Order',
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
    },
    { timestamps: true }
)

const Restaurant = mongoose.model( 'Restaurant' , restaurantSchema)

module.exports = { Restaurant }