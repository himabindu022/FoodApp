const mongoose = require('mongoose')

const orderSummarySchema = mongoose.Schema({
    order_id: { 
        type: String, 
        required: true 
    },
    delivery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Delivery'
    }
})

const orderSummary = mongoose.model('orderSummary', orderSummarySchema)
module.exports = { orderSummary };