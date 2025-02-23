const ErrorResponse = ( res, statusCode, status , message) => {
    res.status(statusCode).json({
        status, 
        message
    })
}

module.exports = ErrorResponse