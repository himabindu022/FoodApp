const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema ({
    title : {
        type : String,
        required : [true, "title is required"]
    },
    imageUrl : {
        type : String,
    },
    },
    { timestamps: true }
)

const Category = mongoose.model( 'Category' , CategorySchema)

module.exports = { Category }