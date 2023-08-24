import passport from "passport";
import { OAuth2Strategy } from 'passport-google-oauth'
import crypto from 'crypto'
import User from '../models/user.js'

// tell passport to use a new startegy for google login
passport.use(new OAuth2Strategy({
    clientID: "614238014972-88cdi2i6j767jslus4hvtoifu9g0fj4f.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://127.0.0.1:8000/user/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        // find a user
        console.log(profile)

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