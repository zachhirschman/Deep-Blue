const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const massive = require('massive')
const Dc = require("./Controller/getData")
const Uc = require('./UserController/userController')
const session = require("express-session")
const fileUpload = require("express-fileupload")

require("dotenv").config()
// Provisions
app.use(bodyParser.json())
app.use(session({
    secret:process.env.session_secret,
    saveUninitialized:false,
    resave:false
}))

// File uploader
app.use(fileUpload())

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
app.post('/api/login', Uc.login)
app.post('/api/register', Uc.register)
app.post("/api/log-out/", Uc.logout)

// Put endpoints
app.put("/api/add-comment", Dc.addCommentToIssue)

//Get endpoints
app.get('/api/get-user-data/', Uc.getSession)
app.get('/api/get-issues',Dc.getData)
app.get('/api/filter',Dc.filterBy)

//Post
app.post('/api/create-Issue', Dc.createIssue)
app.post('/api/upload-image',Dc.uploadImage)

const port = process.env.port
server.listen(port, () => console.log(`Listening on port ${port}`))

