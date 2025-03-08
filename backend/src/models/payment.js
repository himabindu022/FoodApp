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
    paymentStatus : {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment