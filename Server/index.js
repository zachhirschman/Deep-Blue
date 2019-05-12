const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const massive = require('massive')
const Dc = require("./Controller/getData")
const Uc = require('./UserController/userController')
const session = require("express-session")
require("dotenv").config()
// Provisions
app.use(bodyParser.json())
app.use(session({
    secret:process.env.session_secret,
    saveUninitialized:false,
    resave:false
}))

// Connect to Database
massive(
    process.env.connection_string
).then(db =>{
    console.log("Connected to Database")
    app.set("db", db)
}).catch(error => console.log("Error connecting to database: ", error))

//Authorization endpoints
app.post('/login',Uc.login)

//Get endpoints
app.get('/api/get-data', Dc.getData)

const port = process.env.port
server.listen(port, () => console.log(`Listening on port ${port}`))