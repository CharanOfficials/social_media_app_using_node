import User from '../../../models/user.js'
import jwt from 'jsonwebtoken'
import env from '../../../config/environment.js'

const createSession = async function(req, res){
    try {
        let user = await User.findOne({ email: req.body.email })
        // if user is found
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                message: "Invalid username/ password"
            })
        } 
        return res.status(200).json({
            message: "Sign-in successfull, here is your token, please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn: '100000'})
            }
        })
    }
    catch(err) {
        console.log("Error", err)
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export default {
    createSession
}