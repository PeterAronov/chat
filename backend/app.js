const express = require("express");
const bodyParser = require("body-parser");

const messagesRoute = require('./api/v1/messages.router'); // Access to to this file 
'../'
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('../fronted'))
app.use("/messages", messagesRoute);// Every request for /messages rout will go to ./routes/messages-routes

module.exports = app;

