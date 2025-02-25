const { User} = require('../models/userModel')

const createuser  = async(body) => {
    return  User.create(body)
}

const getUser = async(id) => {
    return User.find(id)
}

const getUsers = async() => {
    return User.find({})
}

const updateUser = async(id) => {
    return User.findByIdAndUpdate(id)
}

const deleteUser = async(id) => {
    return User.findByIdAndDelete(id)
}

module.exports = {
    createuser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}