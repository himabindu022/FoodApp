const upload = require('../middleware/multer')
//const { APIfeatures } = require('./../utils/APIfeatures')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')
const { 
    restaurantServices,
    foodServices,
    cartServices,
    orderServices 
} = require('../services/index.js')
const pipeline  = require('./match.js')

const createRestaurant = async(req, res, next) => {
    try {
        const {title, timings, location, logoUrl, rating, isAvailable, fssaiCertified, imageUrl, category} = req.body;
        //console.log(req.body)
       if(!title ||!timings ||!location ||!isAvailable ||!fssaiCertified ||!rating ||!imageUrl ||!logoUrl ||!category) {
              errorResponse(res, httpStatusCode.NOT_FOUND , 'error','Please fill in all fields.');
       }
 
       const newRestaurant = await restaurantServices.createRestaurant(req.body)
       console.log(newRestaurant)

        successResponse(res, httpStatusCode.CREATED , 'success','Restaurant created successfully', newRestaurant)
    } catch (error) {
        next(error)
    }
}

const getAllRestaurants = async(req, res, next) => {
    try {
        // const page = req.query.page || 1
        // const limit = req.query.limit || 10

        // const skip = (page-1) * limit

        //const total = await restaurantServices.countDocuments()

        const restaurants = await restaurantServices.getRestaurants()

        if(!restaurants){
            res.json('no data found')
        }
        return successResponse(res,httpStatusCode.CREATED,'success',"received all the data of Restaurants", {
            //page,
            //limit,
            //total,
            restaurants
        })
    } catch (error) {
        next(error)
    }
}

const getByIdRestaurant = async(req, res) => {
    try {
        const getRestaurant = await restaurantServices.getRestaurant(req.params.id)
        //await getRestaurant.populate('food').populate('order').populate('buyer')
        if(!getRestaurant) {
           errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        res.send(getRestaurant)
        //return successResponse(res, httpStatusCode.CREATED , 'success',"received all the data of Restaurants", getRestaurant)
    } catch (error) {
        console.log(error)
    }
}

const updateRestaurant  = async(req, res, next) => {
    try {
        const update = await restaurantServices.getRestaurant(req.params.id)
        console.log(update)
        if(!update) {
            errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found')
        }
        console.log(req.body)
        const updateRestaurant = await restaurantServices.updateRestaurant(req.params.id, req.body, {new: true})
        successResponse(res, httpStatusCode.CREATED , 'success','Updated successfully', updateRestaurant)
    } catch (error) {
        next(error)
    }
}

const deleteRestaurant = async(req,res) => {
    try {
        const deleteRestaurant = await restaurantServices.getRestaurant(req.params.id)

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
        const foods = await foodServices.getFoods()
        const foodIds = foods.map((u) => u._id)   //food Ids
        //console.log(foodIds.toString())
        
        const order = await orderServices.getOrder({_id:orderId})
        if(!order) {
            return errorResponse(res, httpStatusCode.NOT_FOUND , 'error','No data found1')
        }

        const cart = await cartServices.getCarts(order.cart)
        if (!cart) {
            return errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'Cart not found');
        }
        //console.log({"true":cart.foods})
        
        let FoodOrders = []
        let NoFoodorders = []
        let getOrderFromRestaurant = []

        const food = await foodServices.getFoods(cart.foods._id)
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
    const restaurants = await restaurantServices.getRestaurants()

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


const searchRestaurant = async(req, res) => {
    try {
        
        const restaurant = await restaurantServices.getRestaurants(pipeline)
        if(!restaurant) {
            return errorResponse(res, httpStatusCode.NOT_FOUND, 'error', 'Restaurant not found')
        }
        res.json(restaurant)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getByIdRestaurant,
    deleteRestaurant,
    updateRestaurant,
    //restaurantgetAllOrders,
    searchRestaurant
}