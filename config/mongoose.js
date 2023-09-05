import mongoose from "mongoose"
import env from '../config/environment.js'
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`)

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error while connecting to MongoDB"))

db.once('open', function(){
    console.log("Connected to the database :: MongoDB")
})
export default db