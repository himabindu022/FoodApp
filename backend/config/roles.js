const roles = {
    "admin": ["create", "read", "update", "delete"],
    "moderator": ["read", "update", "delete"],
    "user": ["read"],
    "guest": [],
    "client": ["create","read", "update"]
}


const Allroles = Object.keys(roles)
console.log(typeof Allroles)

const roleRights = new Map(Object.entries(roles))
console.log(typeof roleRights)

module.exports  =  {
    roles,
    Allroles,
}