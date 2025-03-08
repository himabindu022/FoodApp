const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'required field']
    },
    state: {
        type: String,
        required: [true,'required field']
    },
    city: {
        type: String,
        required: [true,'required field']
    },
    street: {
        type: String,
        required: [true,'required field']
    },
    blockNo: {
        type: String,
        required: [true,'required field']
    },
    phone: {
        type: String,
        required: [true,'required field']
    },
    // order: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Order',
    // }
})

//const Address = mongoose.model('Address', addressSchema)
module.exports =  addressSchema 