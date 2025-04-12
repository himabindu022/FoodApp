const { Food } = require('../models/foodModel')
const { User } = require('../models/userModel')

const lookUpData = (
    {
        $lookup: { 
            from: "foods", 
            localField:"_id", 
            foreignField:"foods_id", 
            as: "foodDetails"  
        //( "forestaurant", "_id", "restaurant_id", "restaurantDetails"  )  
        }
    }
   
)

 //const data = req.query
 const matchData = (req) => {
    let match = {}
    if(req.query.title) {
        match['title'] = 
        {
            $or: [
                {'restaurant':req.query.title},
                {'food.title': req.query.title}
            ]
        }
       
        console.log(match)
    }
    if(req.query.food) {
        match['food'] = req.query.food
    }
    if(req.query.price) {
        match['price'] = parseInt(req.query.price)
    }
    if(req.query.rating) {
        match['rating'] = parseInt(req.query.rating)
    }
    if(req.query.fssaicertified) {
        match['fssaicertified'] = req.query.fssaicertified
    }
    if(req.query.timing) {
        match['timing'] = { $in: {$lt: 7.00 ,$gt:10.00}}
    }
    
    if(req.query.category) {
        match['$or'] = [
            //{'category':req.query.category},
            {'category.food[0].category':req.query.category}
        ]
    }
    if(req.query.location) {
        match['location'] = req.query.location
    }
    //return match
    console.log(match)
 }



const pipeline = (req) => {
    const match = matchData(req)
    return [
        {$match: match},
        lookUpData,
        { $project: { foodDetails: 1 } },
        { $unwind: "$foodDetails" },
        { $group: { _id: "$_id", foodDetails: { $push:
            "$foodDetails" } } },
            { $project: { foodDetails: 1 } },
    ]
}
console.log(pipeline)

    //  const matchingData = matchData(req)
    // { $match: matchingData},
    // // { $lookup: { from: "foods", localField: "_id", foreignField:"foods_id", as: "foodDetails" } },
    // lookUpData,
    //     { $project: { foodDetails: 1 } },
    //     { $unwind: "$foodDetails" },
    //     { $group: { _id: "$_id", foodDetails: { $push:
    //         "$foodDetails" } } },
    //         { $project: { foodDetails: 1 } },
    //         ]

module.exports = {
    pipeline
}


