const mongoose = require('mongoose');
const addressSchema = require('./addressModel');

const orderSummarySchema = mongoose.Schema({
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'Order'
    },
    address: addressSchema
})

const orderSummary = mongoose.model('orderSummary', orderSummarySchema)
module.exports = { orderSummary };