import passport from "passport";
import { OAuth2Strategy } from 'passport-google-oauth'
import crypto from 'crypto'
import User from '../models/user.js'
import env from '../config/environment.js'
console.log("Nodemailer",env)
// tell passport to use a new startegy for google login
passport.use(new OAuth2Strategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url
},
    async function (accessToken, refreshToken, profile, done) {
        // find a user
        let user = await User.findOne({ email: profile.emails[0].value }).exec()
            .then((user) => {
                if (user) {
                    // console.log(accessToken) can be used to communicate with google
                    // if found set this user as req.user
                    return done(null, user)
                } else {
                    // if not found, create a user and set it as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    }).then((user) => {
                        return done(null, user)
                    })
                    .catch((err) => {
                        console.log("Error in creating user using google strategy passport", err)
                        return
                    })
                }
            })
            .catch((err) => {
                if (err) {
                console.log("Error in google strategy passport", err)
                return
            }
            console.log(profile)
            })
    }))
export default passport