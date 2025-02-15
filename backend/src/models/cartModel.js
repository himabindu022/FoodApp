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
const Cart = mongoose.model('Cart', cartSchema);
module.exports = {Cart}

