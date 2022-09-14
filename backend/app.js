const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require('./db/mongoose');

const messagesRoute = require('./api/v1/messages.router'); // Access to to this file 

const app = express();
const forntedFolderPath = path.join(__dirname, '../fronted');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(forntedFolderPath))
app.use("/messages", messagesRoute);// Every request for /messages rout will go to ./routes/messages-routes

module.exports = app;