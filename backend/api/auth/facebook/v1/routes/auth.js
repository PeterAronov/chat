// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');

router.get('/auth/login', (req, res) => {    // Auth login
    console.log('login');
    res.send('logging in');
    //res.render('login', { user: req.user });
});

router.get('/auth/logout', (req, res) => {   // Auth logout
    console.log('logout');
    // handle with passport
    res.send('logging out');
});

router.get('/auth/facebook', passport.authenticate('facebook',
    { successRedirect: '/auth/facebook/callback', failureRedirect: '/auth/error' }
))

router.get('/auth/facebook/callback', passport.authenticate('facebook',
    { successRedirect: '/auth/facebook/success', failureRedirect: '/auth/error' }
));

router.get('/auth/error', (req, res) => {   // auth with facebook
    console.log('error');
    res.send('error logging in');
});

router.get('/auth/facebook/success', (req, res) => {   // auth with facebook
    console.log('success');
    res.send('success logging in');
});

module.exports = router;
