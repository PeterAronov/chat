const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config({ path: './config/test.env' }); // Default: path.resolve(process.cwd(), '.env')

const messagesRoute = require('./api/messages/messages'); // Access to to this file 

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/messages", messagesRoute);// Every request for /messages rout will go to ./routes/messages-routes

module.exports = app;


