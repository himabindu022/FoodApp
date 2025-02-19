const ErrorResponse = ( res, statusCode = 500, status = 'Error', message) => {
    res.status(statusCode).json({status, message})

}

module.exports = ErrorResponse