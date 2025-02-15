const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const tokenGenerate = async (req, res, next) => {
    try {
        const token = await req.headers["authorization"].split(' ')[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' })
            }; 
            return res.json({ message: 'Token is valid', userID: decoded.id })
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { tokenGenerate }