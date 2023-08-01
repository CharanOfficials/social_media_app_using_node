import mongoose from "mongoose"

mongoose.connect('mongodb://127.0.0.1:27017/goosip_development')

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error while connecting to MongoDB"))

db.once('open', function(){
    console.log("Connected to the database :: MongoDB")
})

export default db