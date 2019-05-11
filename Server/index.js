const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const massive = require('massive')
const Dc = require("./Controller/getData")
require("dotenv").config()
app.use(bodyParser.json())

// Connect to Database
massive(
    "postgres://xmyvylmyjqxqpy:5cae4271a0bd69d98662baf044ad2079197e05a3aab367e4f8143bef8667cc43@ec2-54-235-167-210.compute-1.amazonaws.com:5432/dd5ug06dkj6roi?ssl=true"
).then(db =>{
    console.log("Connected to Database")
    app.set("db", db)
}).catch(error => console.log("Error connecting to database: ", error))

//Get endpoints
app.get('/api/get-data', Dc.getData)

const port = 4000
server.listen(port, () => console.log(`Listening on port ${port}`))