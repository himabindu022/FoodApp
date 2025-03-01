const mongoose = require('mongoose')
// const { orderSummary } = require('./orderSummary')
// const { Delivery } = require('./deliveryModel')

const paymentSchema = mongoose.Schema({
    amout:{
        type: Number,
        required: true
    },
    patmentMethod: {
        type: String,
        required: true
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery',
    },
    paymentStatus : {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        required: true
    }
    // orderSummary: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'OrderSummary',
    // }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment