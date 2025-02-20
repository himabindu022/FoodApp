const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    foods : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food'
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quantity : {
        type: Number,
        // required: true
    }
})
const CartModel = mongoose.model('CartModel', cartSchema);
module.exports = {CartModel}

