const express = require('express')
const route = express.Router()
const upload = require('../middleware/multer.js')
const { tokenGenerate } = require('../middleware/token.js')
const {
    createCategory,
    getAllCategories,
    getByIdCategory,
    updateCategory,
    deleteCategory
}= require('../controllers/categoryController')

route.post('/',tokenGenerate, upload.single('imageUrl'),createCategory)
route.get('/getAll',tokenGenerate, getAllCategories)
route.get('/:id', getByIdCategory)
route.patch('/:id',tokenGenerate, upload.single('imageUrl'), updateCategory)
route.delete('/:id',tokenGenerate, deleteCategory)


module.exports = route