const express = require("express");
const bodyParser = require("body-parser");

const messagesRoute = require('./routes/messages-routes'); //access to to this file 

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/messages", messagesRoute);//every request for /messages rout will go to ./routes/messages-routes

app.listen(port, '127.0.0.1', () => {
  console.log(`application start at ${port}`);
});