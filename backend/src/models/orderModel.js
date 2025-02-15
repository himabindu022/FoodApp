const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema ({
    foods : {
        type : mongoose.Schema.Types.ObjectId,
        ref:'Food'
    },
    payment : {
        type : Number,
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum:['preparing','prepare', 'on the way', 'delivered'],
        default: 'Preparing'
    },
    },
    { timestamps: true }
)

const Order = mongoose.model('Order' , OrderSchema)

module.exports = { Order }