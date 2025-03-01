const { Cart } = require("../models/cartModel");
const { Food } = require("../models/foodModel");
const { User } = require("../models/userModel");
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createCart = async (req, res) => {
  try {
    const { foods, buyer, quantity } = req.body;    
    if (!buyer || !foods) {
      return res.status(400).send("Buyer or food ID is missing.");
    }

    const user = await User.findById(buyer);  
    const food = await Food.findById(foods); 

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (!food) {
      return res.status(404).send("Food not found");
    }

    let cart = await Cart.findOne({ buyer: buyer});
  
    if(cart) {
      const foodItemIdx = cart.foods.findIndex((item) => item.foods._id.toString() === food._id.toString())
      console.log(foodItemIdx)
      if(foodItemIdx > -1) {
        cart.foods[foodItemIdx].quantity += quantity || 1;
        cart.foods[foodItemIdx].totalPrice = cart.foods[foodItemIdx].quantity * food.price;
      }
      else {  
        cart.foods.push({ foods, quantity : quantity || 1, totalPrice : (quantity || 1) * food.price })
      }
      await cart.save()
      return successResponse(res, httpStatusCode.CREATED,'success', 'Food added to cart', cart)
    } else {
      const newCart = new Cart({
        buyer: buyer,
        foods: [{ foods, quantity : quantity || 1, totalPrice : (quantity || 1) * food.price }]
      });
      await newCart.save();
      return successResponse(res, httpStatusCode.CREATED,'success', 'Food added to cart', newCart)
    }
  } catch (error) {
    console.log(error)
  }
}


const getAllCart = async (req, res) => {
  try {
    const cart = await Cart.find();

    if (!cart) {
      errorResponse(res, httpStatusCode.NOT_FOUND,'error', "Cart not found" );
    }
    res.json(cart);
  } catch (error) {
    console.log(error);
     errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
  }
};

const getByIdCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate({path:"foods", select:'title price'}).populate({path:"buyer", select: "name"});
    console.log(cart)
    if (!cart) {
      // errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Cart not found" );
      return res.json({message:"error"})
    }
    //res.json(cart);
    return res.json(cart)
    
  } catch (error) {
    console.log(error);
     //errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
  }
};

// const updateCart = async (req, res) => {
//   try {
//     const cart = await Cart.findByIdAndUpdate(req.params.id)

//     const food = await Food.findOne({ _id: req.body.foodId });
     //console.log(food)
//     const user = await User.findOne({ _id: req.body.userId });
    //console.log(user)

//     if (!food) {
//       errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Food not found" );
//     }

//     if (!user) {
//       errorResponse(res,httpStatusCode.NOT_FOUND,'error', "User not found" );
//     }

//     let carts = await Cart.findOne({ buyer: user._id, foods: food._id });
     //console.log(cart)
//     if (!carts) {
//       carts = new Cart({
//         buyer: user._id,
//         foods: food._id,
//         quantity: 1,
//       });
//     } else {
//       const { _id, foods, buyer, quantity } = carts;
//       await Cart.findOneAndUpdate(
//         { _id },
//         {
//           foods: foods,
//           buyer: buyer,
//           quantity: quantity + 1,
//         }
//       );
//     }

//     successResponse(res,httpStatusCode.SUCCESS, 'success', "Food added to cart", carts );
//   } catch (error) {
//     console.log(error);
//      errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
//   }
// };

const removeItemFromCart = async (req, res) => {
  try {
    const { buyer } = req.body
    const cart = await Cart.findOne({buyer: buyer})
    const foodId = req.params.id
    const food = await Food.findById(foodId); 

    if (!cart) {
      return errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Cart not found" );
    } 
    if (!food) {
      return errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Food not found" );
    }

    const existing = cart.foods.findIndex((item) => item.foods.toString() == foodId)
    console.log(existing)


    if (existing == -1) {  // cart.foods[existing] replaced with existing
      return errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'not found');
    }

    console.log(cart.foods[existing]) 
    //const cartItem = cart.foods
    //console.log(cartItem)

    if (cart.foods[existing].quantity > 1) {
      cart.foods[existing].quantity  -= 1;
      cart.foods[existing].totalPrice = cart.foods[existing].quantity * food.price;
    } else {
      cart.foods.splice(existing, 1);
    }
    await cart.save()
    return successResponse(res,httpStatusCode.CREATED, 'success', "Item removed from cart", cart);
  } catch (error) {
    console.log(error);
    return errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
  }
};

module.exports = {
  createCart,
  getAllCart,
  getByIdCart,
  //updateCart,
  removeItemFromCart,
}
