import User from '../models/user.js'
// Edit the user profile
const profile = function(req, res){
    User.findById(req.params.id)
        .then((user) => {
        return res.render('profile', {
            title: "Profile",
            profile_user: user
        })
    })
}

// UPdate the user profile
const updateProfile = function (req, res) {
    if (req.user.id == req.params.id) {
        console.log(req.body.name)
        User.findByIdAndUpdate(req.params.id, req.body)
            .then((user) => {
                
                return res.redirect('back')
            }).catch((err) => {
            console.log("Error occured while updating the profile", err)
        })
    } else {
        return res.status(401).send("Unauthorized Access")
    }
}

// Sign Up Page
const signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render('user_sign_up', {
        title:"Goosip ! Sign Up"
    })
}

// Sign In page
const signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile')
    }
    return res.render('user_sign_in', {
        title:"Goosip ! Sign In"
    })
}

// Get sign up data
const create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back')
    } 
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            console.log("User already exists with user name", res.body.email)
            return res.redirect('back')
        }
        User.create(req.body)
        .then((user)=>{
            console.log("User created successfully")
            return res.redirect('/user/sign-In')
        })
        .catch((err)=>{
            console.log("Error occured while creating a new user")
            return res.redirect('back')
        })
    })
    .catch(err=>{
        console.log("Error occure which accessing the user", err)
        return res.redirect('back')
    })}

// Sign in and create a session for the user
const createSession = function(req, res){
    return res.redirect('/')
}

const destroySession = function (req, res) {
     // passport function
    req.logout(function (err) {
        if (err) {
            return next(err)
        } else {
            return res.redirect('/')
        }
    })
}

export default {
    profile, signIn, signUp, create, createSession, destroySession, updateProfile
}