const express = require("express");
const passport = require('passport');
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require("path");
require('./db/mongoose');
const errorHandler = require('./middelwares/error.handler')
const messagesRoute = require('./api/messages/v1/routes/message');
const authRoute = require('./api/auth/facebook/v1/routes/auth');
//require('./setups/passport')(passport)
const FacebookStrategy = require('passport-facebook').Strategy;

const app = express();
const forntedFolderPath = path.join(__dirname, '../fronted');
const viewsFolderPath = path.join(__dirname, '../fronted/views');

app.set('view engine', 'ejs');
app.set('views', viewsFolderPath); // Setting the view doesn't mean index.html will be rendered, it means that the view engine will look for the index.ejs file in the views folder.

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(forntedFolderPath))

app.get('/', (req, res) => {
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