const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require('./db/mongoose');
const errorHandler = require('./middelwares/error.handler')
const messagesRoute = require('./api/messages/v1/routes/message');
const loginRoute = require('./api/auth/facebook/v1/routes/facebook');


const app = express();
const forntedFolderPath = path.join(__dirname, '../fronted');
const viewsFolderPath = path.join(__dirname, '../fronted/views');

app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// unsecured routes
app.use(express.static(forntedFolderPath))

app.get('/', (req, res) => {
    res.render('home')
})

// secured routes
app.use(messagesRoute)// Every request for /messages rout will go to ./routes/messages-routes
app.use(errorHandler)

module.exports = app;

// function authMidlware(req, res, next) {
//    if(Facebook.isAuthenticated())
//    {}
//     const data = jwt.verify(token, process.env.JWT_SECRET)
//     next()
// }