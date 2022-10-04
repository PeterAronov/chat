const express = require("express");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const path = require("path");
require('./db/mongoose');
const errorHandler = require('./middelwares/error.handler')
const messagesRoute = require('./api/messages/v1/routes/message');

const app = express();
const forntedFolderPath = path.join(__dirname, '../fronted');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

// unsecured routes
app.use(express.static(forntedFolderPath))
// login route
//app.use(authMidlware) 
// secured routes
app.use(messagesRoute)// Every request for /messages rout will go to ./routes/messages-routes
app.use(errorHandler)

module.exports = app;