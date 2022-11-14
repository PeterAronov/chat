const express = require("express");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require("path");
require('./db/mongoose');
const errorHandler = require('./middelwares/error.handler')
const messagesRoute = require('./api/messages/v1/routes/message');
const authRoute = require('./api/auth/google/v1/routes/auth');
const isAuthenticated = require('./middelwares/auth');
const IsAuthenticated = require("./middelwares/auth");
require('./setups/passport')(passport)

const app = express();
const forntedFolderPath = path.join(__dirname, '../fronted');
const viewsFolderPath = path.join(__dirname, '../fronted/views');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath); // Setting the view doesn't mean index.html will be rendered, it means that the view engine will look for the index.ejs file in the views folder.

// Inside developers tab => Application => there was a cookie called "connect.sid" which was set by express-session and signed with the secret key.
// e.g s%3AOZe_SbbG8gWkCQGI0TvCdl3ZUHvhMbkK.4pEWWntQiXMPGs354BbxUZSgF6AzMtGI%2BIOnIWYAuWA 
// req.session.id = GjBXAoWrLeId6d9wOPb6v7f1e2vAu0hJ which is part of the cookie string.

app.use(session({ // when a request ends there is not communication between the server and the client, we can save data inside req.session object and it will be available in the next request.
    resave: false, // means that we don't want to save the session if nothing is modified
    saveUninitialized: true, // means that we don't want to create a session until something is stored
    secret: process.env.SESSION_SECRET
})); // We can find the session inside application tab in the browser

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(forntedFolderPath))

app.get('/', isAuthenticated, (req, res) => {
    res.render('home', { name: req.user.fullName, profilePic: req.user.profilePic });
})
app.use(authRoute)
app.use(IsAuthenticated)
app.use(messagesRoute)// Every request for /messages rout will go to ./routes/messages-routes
app.use(errorHandler)

module.exports = app;