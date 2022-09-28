const express = require("express");
const helmet = require('helmet');
const bodyParser = require("body-parser");
const path = require("path");
require('./api/v1/db/mongoose');
const errorHandler = require('./api/v1/middelwares/error.handler')
const messagesRoute = require('./api/v1/routes/message');

const app = express();
const forntedFolderPath = path.join(__dirname, '../fronted');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

app.use(express.static(forntedFolderPath))
app.use(messagesRoute)// Every request for /messages rout will go to ./routes/messages-routes
app.use(errorHandler)

module.exports = app;