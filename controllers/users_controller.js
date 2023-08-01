import User from '../models/user.js'
const profile = function(req, res){
    return res.render('profile', {
        title: "Profile"
    })
}

// Sign Up Page
const signUp = function(req, res){
    return res.render('user_sign_up', {
        title:"Goosip ! Sign Up"
    })
}

// Sign In page
const signIn = function(req, res){
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
    // To Do later
}

export default {
    profile, signIn, signUp, create, createSession
}