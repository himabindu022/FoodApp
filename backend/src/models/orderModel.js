const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema ({
    // foods : [{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref:'Food'
    // }],
    // payment : {
    //     type : Number,
    // },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum:['confirm','preparing','prepared', 'on the way', 'reached','delivered', 'cancelled'],
        default: 'preparing'
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
    },
    { timestamps: true }
)

const Order = mongoose.model('Order' , OrderSchema)

module.exports = { Order }