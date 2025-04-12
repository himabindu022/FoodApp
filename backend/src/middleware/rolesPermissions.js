const { roles, Allroles } = require('../../config/roles')


const rolePermissions = (allowedRights) => {
    return (req, res, next) => {
        const user = req.user?.role 
        console.log(user)
        if(!Object.keys(roles).includes(user)) {
           return  res.send({ message: 'Forbidden: You do not have access' })
        }
        const userRole = roles[user]
        console.log(userRole)
        const permissions = allowedRights.every((right) => userRole.includes(right))
        console.log(permissions)
        if(!permissions) {
            return res.send({ message: 'Forbidden: You do not have access' })
        }      
        next()
    }
}

module.exports = {
    rolePermissions: rolePermissions
}