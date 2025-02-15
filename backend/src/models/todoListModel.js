const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed : {
        type: Boolean,
        default: false
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task