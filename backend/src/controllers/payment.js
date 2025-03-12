const { 
    paymentServices
} = require('../services/index')


const createPayment = async(req,res) => {
    try {
        const { order, buyer, amountPaid, paymentMethod, paymentTime, paymentStatus} = req.body 

        const  user = await userServices.createUser(req.body.buyer)
        if(!payment) {
            return res,json({message:'user not found '})
        }
        const payment = await paymentServices.createPayment(req.body)
        res.json({message:'payment created successfully', payment})
    } catch (error) {
        console.log(error)
    }
}


