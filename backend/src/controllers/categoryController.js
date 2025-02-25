const { Category } = require('../models/categoryModel')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')

const createCategory = async(req, res) => {
    try {
        const { title } = req.body
        const imageUrl = req.file ? `${req.file.filename}` : null
        console.log(imageUrl)
        console.log(req.file)

        const category = new Category({
            title,
            imageUrl
        })
        await category.save()
        successResponse(res,httpStatusCode.CREATED,success,'successfully created category', category)
    } catch (error) {
        console.log(error)
    }
}


const getAllCategories = async(req, res) => {
    try {
        const category = await Category.find()

        if(!category) {
            errorResponse(res,httpStatusCode.NOT_FOUND, error,'No data found')
        }
        successResponse( res,httpStatusCode.CREATED,success, 'successfully received', category)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Server Error');
    }
}


const getByIdCategory = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        
        if(!category) {
            return res.status(404).json({message:'No data found'})
        }
        successResponse(res,httpStatusCode.CREATED,success,'successfully received', category)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Server Error');
    }
}


const updateCategory = async(req, res) => {
    try {
        const { title } = req.body
        const category = await Category.findOne({_id:req.params.id})

        if(!category) {
            errorResponse(res,httpStatusCode.NOT_FOUND,error,'no data found')
        }
        
        if(!req.file) {
            errorResponse(res, httpStatusCode.NOT_FOUND,error,' no upload  file')
        }

        const image = req.file ? `${req.file.filename}` : null
        console.log(image)

        category.title = title ?? category.title;
        category.imageUrl = image ?? category.imageUrl;
       await category.save()
       successResponse(res,httpStatusCode.CREATED,success,'Updated successfully', category)

    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Server Error');
    }
}

const deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        if(!category) {
            errorResponse(res,httpStatusCode.NOT_FOUND,success,'no data found', category)
        }

        successResponse(res,httpStatusCode.CREATED,success,'successfully deleted data', category)
    } catch (error) {
        console.log(error)
        errorResponse(res, httpStatusCode.INTERNAL_SERVER_ERROR, error, 'Server Error');
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getByIdCategory,
    updateCategory,
    deleteCategory
}