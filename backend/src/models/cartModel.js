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
        price: { 
            type: Number 
        }
    }],

    totalAmount: { type: Number }
});
const Cart = mongoose.model('CartModel', cartSchema);
module.exports = { Cart }

