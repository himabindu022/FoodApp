const { Todo } = require('../models/todoListModel')
const successResponse = require('../utils/successResponse.js')
const errorResponse = require('../utils/errorResponse.js')
const httpStatusCode = require('../constants/httpStatusCode.js')
const  todoValidation = require('../validations/todoListValidation.js')

const getAllTasks = async (req, res) => {
    try {
        
        const todos = await Todo.find()
        
        if(!todos) {
            return res.status(404).json({ message: 'No tasks found' })
        }
        res.status(200).json({message: 'Successfully received data', data: todos})
    } catch (error) {
        console.log(error)
    }
}

const getByIdTask = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if(!todo) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json({message: 'Successfully received data',Data:todo})
        
        if(!todo) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json({message: 'Successfully received data',data:todo})
    } catch (error) {
        console.log(error)
    }
}

const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate} = req.body

        console.log(req.body)
        if(!title ||!description ||!status ||!dueDate) {
            return res.status(404).json({ message: 'Fill the all the fields' })
        }
        
        const newData = new Todo({
            title, 
            description, 
            status, 
            dueDate
            
        })
        await newData.save()
        return res.status(200).json({ message: 'Task created successfully', data:newData })
    } catch (error) {
        console.log(error)
    }
}

const updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate} = req.body
        
        const newTodo = await Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        if(!newTodo) {
            return res.status(404).json({ message: 'Task not found' })
        }
        return res.status(200).json({ message: 'Task updated', Data: newTodo })
    } catch (error) {
        console.log(error)
    }
}


const deleteTask = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete({_id:req.params.id})
        
        if(!todo) {
            return res.status(404).json({ message: 'Task not found' })
        }
        return res.status(200).json({ message: 'successfully deleted' })
    } catch (error) {
        console.log(error)
    }
}


const completedTasks = async (req, res) => {
    try {
        const todo = await Todo.find()
        console.log(todo)
        const completed = await todo.filter(data => data.status === 'completed')
     
        return res.status(200).json({ message: 'completed tasks', Data:completed , count : completed.length })
    } catch (error) {
        console.log(error)
    }
    
}


module.exports = {
    getAllTasks,
    getByIdTask,
    createTask,
    updateTask,
    deleteTask,
    completedTasks
}