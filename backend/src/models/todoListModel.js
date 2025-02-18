const mongoose = require('mongoose')

const todoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description : {
        type: String,
        default: false
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate : {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Todo = mongoose.model('Todo', todoListSchema)

module.exports = { Todo }