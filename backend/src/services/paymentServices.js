const { Payment } = require("../models/payment");

const createPayment = async(body) => {
    return Payment.create(body)
}

const getPayments = async() => {
    return Payment.find()
}

const getPayment = async(id) => {
    return Payment.findById(id)
}

const updatePayment = async(id, body) => {
    return Payment.findOneAndUpdate(id, body,{new: true})
}

const deletePayment = async(id) => {
    return Payment.findOneAndDelete(id)
}

module.exports = {
    createPayment,
    getPayments,
    getPayment,
    updatePayment,
    deletePayment
}