const express = require('express')
const route = express.Router()

const {getAllTasks, getByIdTask, createTask, deleteTask, updateTask, completedTasks } = require('../controllers/todoListController')
//const  todoSchema  = require('../validations/todoList.validation')
route.get('/', getAllTasks)
//route.get('/:id', getByIdTask)
route.post('/', createTask)
route.delete('/:id', deleteTask)
route.patch('/:id', updateTask)
route.get('/completed', completedTasks)

module.exports = route