const { Cart } = require("../models/cartModel");
const { Food } = require("../models/foodModel");
const { User } = require("../models/userModel");
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createCart = async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.body.foodId });
    //console.log(food)
    const user = await User.findOne({ _id: req.body.userId });
    //console.log(user)

    if (!food) {
      errorResponse(res,httpStatusCodes.NOT_FOUND,'error', "Food not found" );
    }

    if (!user) {
       errorResponse(res,httpStatusCodes.NOT_FOUND,'error',"User not found" );
    }

    let cart = await Cart.findOne({ buyer: user._id, foods: food._id });
    //console.log(cart)
    if (!cart) {
      cart = new Cart({
        buyer: user._id,
        foods: food._id,
        quantity: 1,
      });
    } else {
      const { _id, foods, buyer, quantity } = cart;
      await Cart.findOneAndUpdate(
        { _id },
        {
          foods: foods,
          buyer: buyer,
          quantity: quantity + 1,
        }
      );
    }
 
    successResponse(res, httpStatusCode.SUCCESS, 'success', "Food added to cart" , cart);
  } catch (error) {
    console.log(error);
     errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
  }
};

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
    const cart = await Cart.findById(req.params.id)
      .populate("foods")
      .populate("buyer");
    //console.log(cart)
    if (!cart) {
      errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Cart not found" );
    }
    //res.json(cart);
    successResponse(
      res,
      httpStatusCode.SUCCESS, 
      success,
      {
      Username: cart.buyer.username,
      Food: cart.foods.title,
      TotalPrice: cart.foods.price * cart.quantity,
      }
    );
    
  } catch (error) {
    console.log(error);
     errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
  }
};

// const updateCart = async (req, res) => {
//   try {
//     const cart = await Cart.findByIdAndUpdate(req.params.id)

//     const food = await Food.findOne({ _id: req.body.foodId });
//     //console.log(food)
//     const user = await User.findOne({ _id: req.body.userId });
//     //console.log(user)

//     if (!food) {
//       errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Food not found" );
//     }

//     if (!user) {
//       errorResponse(res,httpStatusCode.NOT_FOUND,'error', "User not found" );
//     }

//     let carts = await Cart.findOne({ buyer: user._id, foods: food._id });
//     //console.log(cart)
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

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Cart not found" );
    }
    successResponse(res,httpStatusCode.SUCCESS, 'success', "Cart deleted successfully" );
  } catch (error) {
    console.log(error);
     errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
  }
};

module.exports = {
  createCart,
  getAllCart,
  getByIdCart,
  //updateCart,
  deleteCart,
};
