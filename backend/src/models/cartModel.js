const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema({
    buyer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    foods: [{
        foods: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Food' 
        },
        quantity: { 
            type: Number, 
            default: 1 
        },
        totalPrice: { 
            type: Number 
        }
    }],

    // totalAmount: { type: Number }
});
const Cart = mongoose.model('Cart', cartSchema);
module.exports = { Cart }

