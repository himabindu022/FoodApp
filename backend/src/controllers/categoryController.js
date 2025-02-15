const { Category } = require('../models/categoryModel')

const createCategory = async(req, res) => {
    try {
        const { title } = req.body
        const imageUrl = req.file ? `${req.file.filename}` : null
        console.log(imageUrl)
        console.log(req.file)
       // if(!title) {
       //     return res.status(400).json({message:'fill the field'})
       // }

        //const image = req.File ? '/uploads/'+ req.file.fileName : null
        //console.log(image)
        const category = new Category({
            title,
            imageUrl
        })
        await category.save()
        return res.status(200).json({message:'successfully created category', category: category})
    } catch (error) {
        console.log(error)
    }
}


const getAllCategories = async(req, res) => {
    try {
        const category = await Category.find()

        if(!category) {
            return res.status(404).json({message:'No data found'})
        }
        return res.status(200).json({message:'successfully received', category: category})
    } catch (error) {
        console.log(error)
    }
}


const getByIdCategory = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        
        if(!category) {
            return res.status(404).json({message:'No data found'})
        }
        return res.status(200).json({message:'successfully received', category: category})
    } catch (error) {
        console.log(error)
    }
}


const updateCategory = async(req, res) => {
    try {
        const { title } = req.body
        const category = await Category.findOne({_id:req.params.id})

        //const { title } = req.body
        //console.log(req.file)

        if(!category) {
            return res.status(404).json({message:'no data found', category: category})
        }
        
        if(!req.file) {
            return res.status(400).json({message:' no upload  file'})
        }

        const image = req.file ? `${req.file.filename}` : null
        console.log(image)

        category.title = title ?? category.title;
        category.imageUrl = image ?? category.imageUrl;
       await category.save()
       return res.status(200).json({ category: category})

    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        if(!category) {
            return res.status(404).json({message:'no data found', category: category})
        }

        return res.status(200).json({message:'successfully deleted data', category: category})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getByIdCategory,
    updateCategory,
    deleteCategory
}