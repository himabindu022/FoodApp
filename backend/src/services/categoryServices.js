const { Category } = require('../models/categoryModel')

const createCategory  = async(body) => {
    return  Category.create(body)
}

const getCategory = async(id) => {
    return Category.findById(id)
}

const getCategories = async() => {
    return Category.find({})
}

const updateCategory = async(id,body) => {
    return Category.findByIdAndUpdate(id, body,{ new: true})
}

const deleteCategory = async(id) => {
    return Category.findByIdAndDelete(id)
}

module.exports = {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory
}