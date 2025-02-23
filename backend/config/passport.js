const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require('express-session')
const { User} = require('../src/models/userModel');



passport.use( new LocalStrategy(
    (username, password, dn) => {
    let user = User.find(data => data.username === username)

    if(!user) {
        return dn(null, false)
    }
    if(user.password !== password)  {
        return dn(null, false)
    }
        return dn(null, user)
}))


passport.serializeUser(( user, dn) => {
    return dn(null, {
        id: user.id,
        username: user.username,
    })
})

passport.deserializeUser(( user, dn) => {
    return dn(null, user)
})
    
