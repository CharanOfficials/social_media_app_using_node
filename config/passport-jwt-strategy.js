import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extract key for auth
    secretOrKey: 'Goosip' // Encryption/ decryption key
};

// After authentication the user will get checked on every api request
passport.use(
    new JWTStrategy(opts, (jwtPayload, done) => {
        User.findById(jwtPayload._id) // User id
            .then(user => {
                if (user) {
                    return done(null, user); // return user if found
                } else {
                    return done(null, false); 
                }
            })
            .catch(err => {
                console.log("Error in finding the user from JWT", err);
                return done(err, false); // User not found
            });
    })
);

export default passport;