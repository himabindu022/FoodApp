const roles = {
    admin: {
        can: ['create','edit', 'delete', 'view']
    },
    moderator: {
        can: ['edit', 'delete', 'view']
    },
    user: {
        can: ['view']
    },
    guest: {
        can: ['view']
    },
    editor: {
        can: ['create', 'edit', 'view']
    },
    contributor: {
        can: ['create', 'view']
    },
    support: {
        can: ['view']
    },
    manager: {
        can: ['create', 'edit', 'delete', 'view']
    },
    Vendor: {
        can: ['create', 'edit', 'view']
    },
    superAdmin: {
        can: ['create', 'edit', 'delete', 'view','admin']
    }
}

const isAuthorized = (role,action) => (req, res, next) =>{
    try {

        const userRole = req.body.role
        const permission = roles[userRole].can

        if (permission.include(action)) {
            next()
        }
        res.status(403).json({ message: 'Access denied' });
    } catch (error) {
        console.log(error)
    }
}


module.exports = isAuthorized
