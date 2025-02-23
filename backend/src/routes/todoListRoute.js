const express = require('express')
const route = express.Router()
//const passport = require('passport')
const { tokenGenerate } = require('../middleware/token.js')
const {getAllTasks, getByIdTask, createTask, deleteTask, updateTask, completedTasks } = require('../controllers/todoListController')
const  todoValidation  = require('../validations/todoListValidation')
const validate = require('../middleware/validate')
const successResponse = require('../utils/successResponse.js')

route.get('/', getAllTasks)
route.get('/completed', completedTasks)
route.get('/:id', getByIdTask)

route.post('/', tokenGenerate, validate(todoValidation) , createTask)

route.delete('/:id',tokenGenerate, deleteTask)
route.patch('/:id',tokenGenerate, updateTask)

module.exports = route