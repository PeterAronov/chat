const mongoose = require('mongoose');

const connectionURL = process.env.MONGODB_URL;

// We don't provide the database sperately we provide the data base name as part of the connectionURL string.
// Mongoose 6 always behaves as if useNewUrlParser ,useUnifiedTopology and useCreateIndex are true 

mongoose.connect(connectionURL);
