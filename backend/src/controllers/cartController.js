const { Cart } = require("../models/cartModel");
const { Food } = require("../models/foodModel");
const { User } = require("../models/userModel");

const createCart = async (req, res) => {
  try {
    const food = await Food.findOne({ _id: req.body.foodId });
    //console.log(food)
    const user = await User.findOne({ _id: req.body.userId });
    //console.log(user)

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

    res.json({ message: "Food added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllCart = async (req, res) => {
  try {
    const cart = await Cart.find();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

const getByIdCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id)
      .populate("foods")
      .populate("buyer");
    //console.log(cart)
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    //res.json(cart);
    return res.json({
      Username: cart.buyer.username,
      Food: cart.foods.title,
      TotalPrice: cart.foods.price * cart.quantity,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id)

    const food = await Food.findOne({ _id: req.body.foodId });
    //console.log(food)
    const user = await User.findOne({ _id: req.body.userId });
    //console.log(user)

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let carts = await Cart.findOne({ buyer: user._id, foods: food._id });
    //console.log(cart)
    if (!carts) {
      carts = new Cart({
        buyer: user._id,
        foods: food._id,
        quantity: 1,
      });
    } else {
      const { _id, foods, buyer, quantity } = carts;
      await Cart.findOneAndUpdate(
        { _id },
        {
          foods: foods,
          buyer: buyer,
          quantity: quantity + 1,
        }
      );
    }

    res.json({ message: "Food added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json({ message: "Cart deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCart,
  getAllCart,
  getByIdCart,
  updateCart,
  deleteCart,
};
