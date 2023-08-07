import express from "express" // import express
const app = express() // launching express
const port = 8000 // port setup
import router from './routes/index.js' // get the default route
import expressLayouts from "express-ejs-layouts"
import connectMongo from "connect-mongo" // importing mongo store
import { MongoClient } from 'mongodb'; // necessary for mongo-store vesrsion 5
import db from "./config/mongoose.js"
// used for session cookie
import session from 'express-session';
import passport from "passport";
import passportLocal from './config/passport-local-strategy.js'
import cookieParser from 'cookie-parser' //cookie parser for authentication
import sassMiddleware from 'sass-middleware';  // sass middleware for rendering the css

app.set("view engine", "ejs") // set up a view engine
app.set("views", "./views") // set the path
app.use(expressLayouts) // set the layouts before routing starts
app.use(express.static('./assets')) // entered in assets

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const currentFileURL = import.meta.url;
// const currentFilePath = fileURLToPath(currentFileURL);
// const currentDirPath = dirname(currentFilePath);

// const setupSassMiddleware = async () => {
//   app.use(await sassMiddleware({
//     src: `${currentDirPath}/assets/scss`,
//     dest: `${currentDirPath}/assets/css`,
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
//   }));
// };
// console.log(`${currentDirPath}/assets/scss`)
// setupSassMiddleware();

app.use(express.urlencoded()) // middleware
app.use(cookieParser()) // Setup cookie parser

// extract styles and scripts from the subpages into the layout
app.set('layout extractStyles', true) 
app.set('layout extractScripts', true)

// Necessary for using the latest version of the mongo-store
const mongoClient = new MongoClient('mongodb://127.0.0.1:27017/goosip_development', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoClient.connect();
console.log("Connected to MongoDB successfully!");

app.use(session({
  store: connectMongo.create({
    mongooseConnection: db,
    autoRemove: 'disabled',
    client: mongoClient // Used for mongo-store latest verasion
  }),
    name: "goosip", // Session cookie name
    // Todo chabge the secret before deployment in production node
    secret: "manipal",  // Encryption key for cookie
    saveUninitialized: false, // if the session is not initialized then don't save
    resave: false,
    //  Cookie age
    cookie:{
        maxAge: (1000*60*100)
    }
}));

// Initialize, Set the session for passport, set the auth function mentioned in passport local strategy
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)

app.use('/', router); // set the default route

// initiate server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }else{
        console.log(`Server is running on port: ${port}`)
    }
})