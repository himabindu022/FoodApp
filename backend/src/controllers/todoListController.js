const Task = require('../models/todoListModel')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})

        if(!tasks) {
            return res.status(404).json({ message: 'No tasks found' })
        }
        res.status(200).json({message: 'Successfully received data',tasks})
    } catch (error) {
        console.log(error)
    }
}

const getByIdTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        if(!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        res.status(200).json({message: 'Successfully received data',task})
    } catch (error) {
        console.log(error)
    }
}

const createTask = async (req, res) => {
    try {
        const tasks = await Task.create(req.body)
        const { task, completed} = req.body
         
        if(!task||!completed) {
            return res.status(404).json({ message: 'Fill the all the fields' })
        }
        return res.status(200).json({ message: 'Task created successfully', task:tasks })
    } catch (error) {
        console.log(error)
    }
}

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body,{new:true})

        if(!task){
            return res.status(404).json({ message: 'Task not found' })
        }
        return res.status(200).json({ message: 'Task not found',task:task })
    } catch (error) {
        console.log(error)
    }
}


const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            return res.status(404).json({ message: 'Task not found' })
        }
        return res.status(200).json({ message: 'successfully deleted' })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllTasks,
    getByIdTask,
    createTask,
    updateTask,
    deleteTask
}