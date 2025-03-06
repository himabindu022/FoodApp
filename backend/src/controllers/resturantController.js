const { Restaurant } = require('../models/resturantModel')
const upload = require('../middleware/multer')
const { APIfeatures } = require('./../utils/APIfeatures')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')
const { Order } = require('../models/orderModel.js')
const { Cart } = require('../models/cartModel.js')
const { Food } = require('../models/foodModel.js')

const createRestaurant = async(req, res, next) => {
    try {
        const {title, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, imageUrl} = req.body;
         console.log(req.body)
       if(!title ||!foods ||!time ||!pickup ||!delivery ||!isOpen ||!rating ||!ratingCount ||!code ||!imageUrl ||!logoUrl) {
              errorResponse(res, httpStatusCode.NOT_FOUND , 'error','Please fill in all fields.');
       }

       const newRestaurant = await Restaurant.create(req.body)
       console.log(newRestaurant)

        successResponse(res, httpStatusCode.CREATED , 'success','Restaurant created successfully', newRestaurant)
    } catch (error) {
        next(error)
    }
}

const getAllRestaurant = async(req, res, next) => {
    try {
        //const features = new APIfeatures(Restaurant.find(),req.query)//.filter().sort()//.limitFields().paginate()
        //const restaurants = await features.req.query

        const page = req.query.page || 1
        const limit = req.query.limit || 10

        const skip = (page-1) * limit

        const total = await Restaurant.countDocuments()

        const restaurants = await Restaurant.find().skip(skip).limit(limit)

        if(!restaurants){
            res.json('no data found')
        }
        return successResponse(res,httpStatusCode.CREATED,'success',"received all the data of Restaurants", {
            page,
            limit,
            total,
            restaurants
        })
    } catch (error) {
        next(err)
    }
}

// const getByIdRestaurant = async(req, res) => {
//     try {
//         const getRestaurant = await Restaurant.findOne({_id:req.params.id}).populate('foods').populate('order').populate('buyer')
//         if(!getRestaurant) {
//            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
//         }
//         successResponse(res, httpStatusCode.CREATED , 'success',"received all the data of Restaurants", getRestaurant)
//     } catch (error) {
//         console.log(error)

//     }
// }

const updateRestaurant  = async(req, res, next) => {
    try {
        const update = await Restaurant.findById(req.params.id)

        if(!update) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }

        const updateRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
        await updateRestaurant.save()
        successResponse(res, httpStatusCode.CREATED , 'success','Updated successfully', updateRestaurant)
    } catch (error) {
        next(error)
    }
}

const deleteRestaurant = async(req,res) => {
    try {
        const deleteRestaurant = await Restaurant.findByIdAndDelete(req.params.id)

        if(! deleteRestaurant) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        successResponse(res, httpStatusCode.CREATED , 'success',"Deleted Restaurant", deleteRestaurant)

    } catch (error) {
        console.log(error)
    }
}

const restaurantgetAllOrders = async(req, res) => {
    try {
        const orderId = req.params.id
        const foods = await Food.find()
        const foodIds = foods.map((u) => u._id)   //food Ids
        //console.log(foodIds.toString())
        
        const order = await Order.findOne({_id:orderId})
        if(!order) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found1')
        }

        const cart = await Cart.findOne(order.cart)
        if (!cart) {
            return errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'Cart not found');
        }
        //console.log({"true":cart.foods})
        
        let FoodOrders = []
        let NoFoodorders = []
        let getOrderFromRestaurant = []

        const food = await Food.findOne(cart.foods._id)
        //console.log(food)
        if (!food) {
            return errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'Food not found');
        }

        for ( const existing of foodIds) {
            if(food._id.toString().includes(existing.toString())) {
                FoodOrders.push(existing)
                //console.log(FoodOrders)
        } else {
            NoFoodorders.push(existing)
        }
    }
    //const orderFoods = FoodOrders.map(items => items.toString())
    const restaurants = await Restaurant.find()

    for(const restaurant of restaurants) {
         for (const restaurantFood of restaurant.foods){
            if (FoodOrders.toString().includes(restaurantFood._id.toString())) {
                getOrderFromRestaurant.push(restaurant.title)
                //console.log(getOrderFromRestaurant)
         }
        }
        }
        return successResponse(res,httpStatusCode.CREATED, 'success', {
            'FoodName':food.title, 
            "FoodOrders":FoodOrders, 
            "restaurantName": getOrderFromRestaurant})
    } catch (error) {
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, 'error', "Internal Server Error1")
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurant,
    //getByIdRestaurant,
    deleteRestaurant,
    updateRestaurant,
    //restaurantgetAllOrders
}