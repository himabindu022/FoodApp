const { Cart } = require("../models/cartModel");
const { Food } = require("../models/foodModel");
const { User } = require("../models/userModel");
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createCart = async (req, res) => {
  try {
    const { foods, buyer} = req.body;
    
        if (!buyer || !foods) {
          return res.status(400).send("Buyer or food ID is missing.");
        }
  
        const user = await User.findById(buyer);  
        const food = await Food.findById(foods); 
        
        console.log(user)
        console.log(food)

        let price = food.price
        console.log(price)
        let quantity = 1;
        let foodName = food.title
        console.log(foodName)
    
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        if (!food) {
          return res.status(404).send("Food not found");
        }
    
        let cart = await Cart.findOne({ buyer: buyer});
  
    if(cart) {
      const foodItems = cart.foods.find((items) =>  items && items.food && items.food._id.toString() === food._id.toString())

      if(foodItems >1) {
        foodItems.quantity +=1

        TotalPrice =  cart.foods.reduce((accu, item) => {
          
        const quantity = parseInt(item.quantity)
        const price = parseInt(item.foodName)

        accu + quantity * price ,0})
        totalCount = foods.length
        await cart.save()
        return successResponse(res, 'Food added to cart', httpStatusCode.OK, cart, totalCount)

    } else {
      cart.foods.push(food._id)
      quantity += 1,
      cart.totalAmount = cart.foods.reduce((accu, item) => {
        
        const quantity = parseInt(item.quantity)
        const price = parseInt(item.foodName)

        accu + quantity * price, 0}); 
        totalCount = cart.foods.length
      await cart.save()
      return successResponse(res, httpStatusCode.CREATED,'success', 'Food added to cart', cart, totalCount)
    }} else {
      const newCart = new Cart({
        buyer: buyer,
        foods: {
        food:food._id,
        quantity: 1,
        price: price,
        },
        totalAmount: price
      });
      //totalCount = cart.food.length
      await newCart.save();
      return res.status(201).send(newCart);
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
      res.json({message:"error"})
    }
    //res.json(cart);
    res.json(cart)
    
  } catch (error) {
    console.log(error);
     //errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', 'Server Error');
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

const removeItemFromCart = async (req, res) => {
  try {

    const cart = await Cart.findById(req.params.id);

    if (!cart) {
      errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Cart not found" );
    } else {
      const { foods } = req.body

      const existing = cart.foods.findIndex((item) => {
        item.foods === foods })
        if (cart.foods.length === 0) {
          errorResponse(res,httpStatusCode.NOT_FOUND,'error', "Cart is empty" );
        } else {
        cart.foods.splice(existing, 1);
        await cart.save();
        }
      successResponse(res,httpStatusCode.SUCCESS, 'success', "Item removed from cart", cart );
    }

    //successResponse(res,httpStatusCode.SUCCESS, 'success', "Cart deleted successfully" );
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
  removeItemFromCart,
}
