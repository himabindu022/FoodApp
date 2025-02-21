const mongoose = require('mongoose')

const orderSummarySchema = mongoose.Schema({
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'Order'
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery'
    }
})

const orderSummary = mongoose.model('orderSummary', orderSummarySchema)
module.exports = { orderSummary };