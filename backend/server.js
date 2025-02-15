const { bgWhite, bgCyan } = require('colors');
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const connectDB = require('./config/db.js')
const authRoute = require('./src/routes/authRoute.js')
const userRoute = require('./src/routes/userRoute.js')
const restaurantRoute = require('./src/routes/resturantRoute.js')
const todoListRoute = require("./src/routes/todoListRoute.js")
const errorMiddleware = require('./src/middleware/errorMiddleware.js')
const foodRoute = require('./src/routes/foodRoute.js')
const categoryRoute = require('./src/routes/categoryRoute.js')
const orderRoute = require('./src/routes/orderRoute.js')
const deliveryRoute = require('./src/routes/deliveryRoute.js')
const cartRoute = require('./src/routes/cartRoute.js')


//dotenv configuration
dotenv.config()

//rest object
const app = express()

//validate middleware
app.use(errorMiddleware)

//Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

//parse incoming JSON requests
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true })) //parse incoming url request

//route
//URL:http://localhost:3000

app.use("/api/v1/task", todoListRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRoute)
app.use('/api/v1/restaurant', restaurantRoute)
app.use('/api/v1/food', foodRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/order', orderRoute)
app.use('/api/v1/delivery', deliveryRoute)
app.use('/api/v1/cart', cartRoute)


//Default Route
//app.all('*', (req, res, next) =>{
 //   res.status(404).json({message: `can't find ${req.originalUrl} on the server`})
//})

//PORT
const PORT = process.env.PORT || 8080 ;

//Listen
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`.bgCyan)
})


//DB Connection
connectDB()
