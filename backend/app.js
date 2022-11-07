const express = require("express");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require("path");
require('./db/mongoose');
const errorHandler = require('./middelwares/error.handler')
const messagesRoute = require('./api/messages/v1/routes/message');
const authRoute = require('./api/auth/facebook/v1/routes/auth');

const app = express();
const forntedFolderPath = path.join(__dirname, '../fronted');
const viewsFolderPath = path.join(__dirname, '../fronted/views');

//app.set('view engine', 'ejs');
//app.set('views', viewsFolderPath); // Setting the view doesn't mean index.html will be rendered, it means that the view engine will look for the index.ejs file in the views folder.

app.use(session({ // when a request ends there is not communication between the server and the client, we can save data inside req.session object and it will be available in the next request.
    resave: false, // means that we don't want to save the session if nothing is modified
    saveUninitialized: true, // means that we don't want to create a session until something is stored
    secret: process.env.SESSION_SECRET
})); // We can find the session inside application tab in the browser

//require('./setups/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(forntedFolderPath))

//app.get('/', passport.authenticate('facebook'), (req, res) => { 
app.get('/',(req, res) => { 

     console.log('home.ejs');
     res.render('home', { name: 'Programmer' });
 })

app.use(authRoute)
app.use(messagesRoute)// Every request for /messages rout will go to ./routes/messages-routes
app.use(errorHandler)

module.exports = app;

// function authMidlware(req, res, next) {
//    if(Facebook.isAuthenticated())
//    {}
//     const data = jwt.verify(token, process.env.JWT_SECRET)
//     next()
// }