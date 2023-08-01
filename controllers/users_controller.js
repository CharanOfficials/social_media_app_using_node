import User from '../models/user.js'
const profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then(user=>{
            if(user){
                return res.render('profile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/user/sign-in')
            }
        })
        .catch(err=>{
            console.log("Unable to authenticate the user")
            return res.status(500).send("Invalid User")
        })
    }else{
        return res.redirect('/user/sign-in')
    }
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

// Check that whether user exists and create a new user accordingly
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
        console.log("Error occured which accessing the user", err)
        return res.redirect('back')
    })}

// Sign in and create a session for the user
const createSession = function(req, res){
    // steps to authenticate

    // Find the user
    User.findOne({email:req.body.email})
    .then(user=>{
        // handle user found
        if(user){
            // if user found then match password
            if(user.password !== req.body.password){
            // if password don't match
                return res.redirect('back')
            }else{
            // if password match then create a session
                res.cookie('user_id', user._id)
                return res.redirect('/user/profile')
            }
        }else{
        // handle user not found
            res.redirect(back)
        }
    })
    .catch(err=>{
        console.log("Error in finding the user while sign in")
        return res.status(500).send("Internal server error")
    })



    // handle password which don't match

    // handle session creation

    // handle user not found
}

const signOut = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('/user/sign-in')
}

export default {
    profile, signIn, signUp, create, createSession, signOut
}