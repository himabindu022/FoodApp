const mongoose = require('mongoose')
const CategorySchema = require('./categoryModel')

const preferencesSchema = new mongoose.Schema({
    category: CategorySchema,
    foods: {
        type: mongoose.Types.Schema.ObjectId,
        ref: 'Food',
    },
})

module.exports = preferencesSchema 