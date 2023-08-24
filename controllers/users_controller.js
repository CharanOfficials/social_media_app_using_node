import User from '../models/user.js'
import { fileURLToPath } from 'url'
import { dirname, join} from "path"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
import fs from 'fs'
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
const updateProfile = async function (req, res) {
    // if (req.user.id == req.params.id) {
    //     console.log(req.body.name)
    //     User.findByIdAndUpdate(req.params.id, req.body)
    //         .then((user) => {
    //             req.flash('success',"Profile information is updated.")
    //             return res.redirect('back')
    //         }).catch((err) => {
    //             req.flash('error', "Error occured while updating the profile.")
    //             res.redirect('back')
    //     })
    // } else {
    //     req.flash('error',"You are not authorized to update the profile.")
    //     return res.redirect('back')
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id)
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log("Multer error", err)
                } else {
                    user.name = req.body.name
                    user.email = req.body.email
                    if (req.file) {
                        if (user.avatar && fs.existsSync(join(__dirname, '..', user.avatar))){
                            fs.unlinkSync(join(__dirname, '..', user.avatar))
                        }
                        // this is saving the path of the uploaded filee into the avatar field in the user
                        user.avatar = User.avatarPath+'/'+req.file.filename
                    }
                    user.save()
                    return res.redirect('back')
                }
            })
        } catch {
            req.flash('error', err)
            return res.redirect('back')
        }
    } else {
        req.flash('error',"You are not authorized to update the profile.")
        return res.redirect('back')
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
    if (req.body.password != req.body.confirm_password) {
        req.flash('error',"Password and Confirm password should be same")
        return res.redirect('back')
    } 
    User.findOne({email:req.body.email})
    .then(user=>{
        if (user) {
            req.flash('error',"User already exists with same email")
            return res.redirect('back')
        }
        User.create(req.body)
            .then((user) => {
            req.flash('success',"User created successfully")
            return res.redirect('/user/sign-In')
        })
            .catch((err) => {
            req.flash('error',"Error occured while creating a new user")
            return res.redirect('back')
        })
    })
        .catch(err => {
        req.flash('error',"Error occured which checking the user")
        return res.redirect('back')
    })}

// Sign in and create a session for the user
const createSession = function(req, res){
    req.flash('success', 'Logged in Successfully')
    return res.redirect('/')
}

const destroySession = function (req, res) {
     // passport function
    req.logout(function (err) {
        if (err) {
            req.flash('error', 'Logging out failed')
            return next(err)
        } else {
            req.flash('success', 'Logged out successfully')
            return res.redirect('/')
        }
    })
}

export default {
    profile, signIn, signUp, create, createSession, destroySession, updateProfile
}