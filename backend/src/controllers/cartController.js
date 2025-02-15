const { Cart } = require('../models/cartModel');
const { Food } = require('../models/foodModel');
const { User } = require('../models/userModel');

const createCart = async (req, res) => {
            try {
                const food = await Food.findOne({_id:req.body.foodId})
                console.log(food)
                const user = await User.findOne({_id:req.body.userId})
                console.log(user._id)


               
                   // if(item.user._Id === req.body.userId) {
//                }

                if(!food) {
                    return res.status(404).json({ message: "Food not found" });
                }

                if(!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                let cart = await Cart.findOne({buyer: user._id ,foods: food._id})
                console.log(cart)
                if(!cart) {
                    cart = new Cart({
                        buyer: user._id,
                        foods:food._id,
                        quantity : 1
                        })
                } else {
                    const {_id, foods, buyer, quantity} = cart;
                    await Cart.findOneAndUpdate({_id}, {
                        foods : foods,
                        buyer  : buyer,
                        quantity : (quantity + 1)
                    })
                }
                
                res.json({ message: "Food added to cart" });
        } catch (error){
            console.log(error)
            res.status(500).json({ message: "Internal Server Error" });
        }
}

module.exports = { createCart }