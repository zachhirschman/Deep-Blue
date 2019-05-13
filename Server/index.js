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
    // db.Initialize.init().then(() =>{
    //     console.log("Database initialized")
    // })
}).catch(error => console.log("Error connecting to database: ", error))

//Authorization endpoints
app.post('/login', Uc.login)
app.post('/register', Uc.register)

//Get endpoints
app.get('/api/get-data', Dc.getData)
app.get('/api/get-user-data', Uc.getSession)

const port = process.env.port
server.listen(port, () => console.log(`Listening on port ${port}`))