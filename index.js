import express from "express" // import express
const app = express() // launching express
const port = 8000 // port setup
import router from './routes/index.js' // get the express router
app.use('/', router) // set the default route



// initiate server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`)
    }else{
        console.log(`Server is running on port: ${port}`)
    }
})