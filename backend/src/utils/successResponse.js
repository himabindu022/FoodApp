const successResponse = ( res, statusCode = 200, status = 'success', message, data={}) => {
    res.status(statusCode).json({status, message, data})
}
    
module.exports = successResponse
