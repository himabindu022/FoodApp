const mongoose = require('mongoose')
const { orderSummary } = require('./orderSummary')

const paymentSchema = mongoose.Schema({
    cardNumber : {
        type: String,
        required: true
    },
    nameOnCard: {
        type: String,
        required: true
    },
    expiryDate : {
        type: String,
        required: true
    },
    cvv : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
    orderSummary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderSummary',
    }

})