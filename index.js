const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const messagesRoute = require('./api/messages/messages'); //access to to this file 

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/messages", messagesRoute);//every request for /messages rout will go to ./routes/messages-routes

app.listen(process.env.PORT, process.env.IP, () => {
  console.log("application start at", process.env.PORT);
});