import express from "express" // import express
const app = express() // launching express
const port = 8000 // port setup
import router from './routes/index.js' // get the default route
app.set("view engine", "ejs") // set up a view engine
app.set("views", "./views") // set the path

app.use('/', router); // set the default route

// initiate server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }else{
        console.log(`Server is running on port: ${port}`)
    }
})