const roles = {
    "admin": ["create", "read", "update", "delete"],
    "moderator": ["read", "update", "delete"],
    "user": ["read"],
    "guest": [],
    "client": ["create","read", "update"]
}

module.exports  =  {roles}