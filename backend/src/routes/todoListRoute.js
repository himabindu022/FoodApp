const express = require('express')
const route = express.Router()
const {getAllTasks, getByIdTask, createTask, deleteTask, updateTask, completedTasks } = require('../controllers/todoListController')
const  todoValidation  = require('../validations/todoListValidation')
const validate = require('../middleware/validate')

route.get('/', getAllTasks)
<<<<<<< HEAD
route.get('/:id', getByIdTask)
route.post('/', validate(todoValidation) , createTask)
=======
route.get('/completed', completedTasks)
route.get('/:id', getByIdTask)
route.post('/', createTask)
>>>>>>> 9fe52d8dc3a23eff48c2c2d2edd9036de583751e
route.delete('/:id', deleteTask)
route.patch('/:id', updateTask)

module.exports = route