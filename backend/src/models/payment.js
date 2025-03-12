const mongoose = require('mongoose')
// const { orderSummary } = require('./orderSummary')
// const { Delivery } = require('./deliveryModel')

const paymentSchema = mongoose.Schema({
    amout:{
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum:[ 'Netbanking', 'cards', 'UPI', 'Apple Pay'],
        required: true
    },
    paymentStatus : {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        required: true
    },
    paymentTime: {
        type: Date,
        default: Date.now
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment