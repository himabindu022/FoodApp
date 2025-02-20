const express = require('express')
const route = express.Router()
const {getAllTasks, getByIdTask, createTask, deleteTask, updateTask, completedTasks } = require('../controllers/todoListController')
const  todoValidation  = require('../validations/todoListValidation')
const validate = require('../middleware/validate')

route.get('/', getAllTasks)
route.get('/:id', getByIdTask)
route.post('/', validate(todoValidation) , createTask)
route.delete('/:id', deleteTask)
route.patch('/:id', updateTask)
route.get('/completed', completedTasks)

module.exports = route