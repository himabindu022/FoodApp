const { Todo } = require('../models/todoListModel')

const ObjectId = require('mongoose').Types.ObjectId;
//Todo.findById(ObjectId("your_valid_object_id_here"));

//const  todoValidate = require('../validations/todoList.validation')

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

// const getByIdTask = async (req, res) => {
//     try {
//         const todo = await Todo.findById(req.params.id)

//         if(!todo) {
//             return res.status(404).json({ message: 'Task not found' })
//         }
//         res.status(200).json({message: 'Successfully received data',Data:todo})
//     } catch (error) {
//         console.log(error)
//     }
// }

const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate} = req.body
         console.log(req.body)
        if(!title ||!description ||!status ||!dueDate ||!createdAt) {
            return res.status(404).json({ message: 'Fill the all the fields' })
        }

        const newData = new Todo({
            title, 
            description, 
            status, 
            dueDate
        })
        await newData.save()
        return res.status(200).json({ message: 'Task created successfully', Data:newData })
    } catch (error) {
        console.log(error)
    }
}

const updateTask = async (req, res) => {
    try {
        const { title, description, status, dueDate} = req.body
        const todo = await Todo.findById({_id: req.params.id})
        console.log(todo)
        if(!todo){
            return res.status(404).json({ message: 'Task not found' })
        }

        todo.title =  title  ?? todo.title,
        todo.description = description ?? todo.description,
        todo.status = status ?? todo.status,
        todo.dueDate = dueDate ?? todo.dueDate
        await todo.save()
        console.log(todo)
        const newTodo = await Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        return res.status(200).json({ message: 'Task not found', Data: newTodo })
    } catch (error) {
        console.log(error)
    }
}


const deleteTask = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)

        if(!todo) {
            return res.status(404).json({ message: 'Task not found' })
        }
        return res.status(200).json({ message: 'successfully deleted' })
    } catch (error) {
        console.log(error)
    }
}

const completedTasks = async(req, res) => {
    try {
        const todo = await Todo.find({});
        console.log(todo)
        const completed = await Todo.fliter(data => data.status === 'completed')
     
        return res.status(200).json({ message: 'completed tasks', Data:todo ,completedCount:completed.length })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getAllTasks,
    //getByIdTask,
    createTask,
    updateTask,
    deleteTask,
    completedTasks
}