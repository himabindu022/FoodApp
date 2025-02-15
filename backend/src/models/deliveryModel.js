const mongoose = require('mongoose')

const deliverySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'required field']
    },
    address: {
        type: String,
        required: [true,'required field']
    },
    city: {
        type: String,
        required: [true,'required field']
    },
    phone: {
        type: String,
        required: [true,'required field']
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }
})

const Delivery = mongoose.model('Delivery', deliverySchema)
module.exports = { Delivery }