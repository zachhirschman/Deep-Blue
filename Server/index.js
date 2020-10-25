/*
    Notes:
    Deep Blue API
    Author: Zach Hirschman
*/

// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');

// Database connection
const massive = require('massive');

// Session Management
const session = require("express-session");


// Require Controllers
const Dc = require("./Controller/getData");
const Uc = require('./UserController/userController');

// Test file upload
const fileUpload = require("express-fileupload");

// Environment Variables
require("dotenv").config();

const { port, 
        session_secret, 
        reinitialize_database, 
        connection_string
    } = process.env;


// Provisions
app.use(bodyParser.json());

app.use(session({
    secret:session_secret,
    saveUninitialized:false,
    resave:false
}));

// File uploader
app.use(fileUpload());

// Connect to Database
massive(
    connection_string
).then(db =>{

    console.log("Connected to Database")
    app.set("db", db);

    if(reinitialize_database != 'false'){
        db.Initialize.init().then(() =>{
            console.log("Database initialized")
        });
    }

}).catch(error => console.log("Error connecting to database: ", error));

//Authorization endpoints
app.post('/api/login', Uc.login);
app.post('/api/register', Uc.register);
app.post("/api/log-out/", Uc.logout);

// Issue endpoints
app.put("/api/add-comment", Dc.addCommentToIssue);
app.post('/api/create-Issue', Dc.createIssue);
app.get('/api/get-issues',Dc.getData);
app.get('/api/filter', Dc.filterBy);

// Get Session
app.get('/api/get-user-data/', Uc.getSession);

// Image endpoints
app.post('/api/upload-image',Dc.uploadImage);

app.listen(port, () => console.log(`Listening on port ${port}`));

