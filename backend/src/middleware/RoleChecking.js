const roles = {
    admin: {
        permissions: ['create','edit', 'delete', 'view']
    },
    moderator: {
        permissions: ['edit', 'delete', 'view']
    },
    user: {
        permissions: ['view']
    },
    guest: {
        permissions: ['view']
    },
    editor: {
        permissions: ['create', 'edit', 'view']
    },
    contributor: {
        permissions: ['create', 'view']
    },
    support: {
        permissions: ['view']
    },
    manager: {
        permissions: ['create', 'edit', 'delete', 'view']
    },
    Vendor: {
        permissions: ['create', 'edit', 'view']
    },
    superAdmin: {
        permissions: ['create', 'edit', 'delete', 'view','admin']
    }
}

const isAuthorized = (role,action) => (req, res, next) =>{
    try {

        const userRole =  req.body.role 

        // if (!roles[userRole]) {
        //     return res.status(400).json({ message: 'Invalid role' });
        // }
        
        const Permissions = roles[userRole].permissions

        if (role.includes(userRole) && Permissions.includes(action)) {
            next()
        } else {
            res.status(403).json({ message: 'Access denied' })
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = isAuthorized
