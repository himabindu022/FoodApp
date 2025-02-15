const mongoose  = require('mongoose')
const dotenv = require("dotenv")
dotenv.config();

//function mongodb connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDb Connected'.bgMagenta)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB


