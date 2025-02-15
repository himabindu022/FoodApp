const express = require('express')
const route = express.Router()
const upload = require('../middleware/multer.js')
const {
    createCategory,
    getAllCategories,
    getByIdCategory,
    updateCategory,
    deleteCategory
}= require('../controllers/categoryController')

route.post('/', upload.single('imageUrl'),createCategory)
route.get('/getAll', getAllCategories)
route.get('/:id', getByIdCategory)
route.patch('/:id', upload.single('imageUrl'), updateCategory)
route.delete('/:id', deleteCategory)


module.exports = route