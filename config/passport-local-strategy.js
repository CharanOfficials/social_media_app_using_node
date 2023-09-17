// for auto authentication

import passport from "passport";
import LocalStrategy from 'passport-local'
import User from '../models/user.js'

// authentication user passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function(req,email, password, done){
        // find a user and establish the identity
        // email as a paraeter and email as a value fro schema
        User.findOne({email:email})
        .then(user=>{
            if(user && user.password === password){
                return done(null, user)
            }else{
                req.flash('error', 'Invalid username/ password')
                return done(null, false)
            }
        })
        .catch(err=>{
            req.flash('error', err)
            return done(err)
        })
    }
    ))

// Serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id)
})

// Deserializing the user fro the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id)
    .then(user=>{
        return done(null, user)
    })
    .catch(err=>{
        console.log("Error in finding the user ---> Passport")
        return done(err)
    })
})

// Define the checkAuthentication middleware function
passport.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/user/sign-in');
};

// After authentication set the key for overall token access
passport.setAuthenticatedUser = function(req, res, next){
    // req.user contains the current signed in user from the session cookie and we are sending this
    // to the locals for the views ejs
    if(req.isAuthenticated()){
        res.locals.user = req.user
    }
    next()
}

export default passport