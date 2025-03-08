const { Address } = require("../models/addressModel");

const createAddress = async(body) => {
    return Address.create(body)
}

const getAllAddresses = async() => {
    return Address.find()
}


const getAddress = async(id) => {
    return Address.findById(id)
}


const updateAddress = async(id, body) => {
    return Address.findOneAndUpdate(id, body,{new: true})
}


const deleteAddress = async(id) => {
    return Address.findOneAndDelete(id)
}

module.exports = {
    createAddress,
    getAllAddresses,
    getAddress,
    updateAddress,
    deleteAddress
}