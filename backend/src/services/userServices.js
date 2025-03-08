const { User} = require('../models/userModel')

const createUser  = async(body) => {
    return  User.create(body)
}

const getUser = async(id) => {
    return User.findById(id)
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
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser
}