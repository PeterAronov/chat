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

router.get('/auth/facebook', (req, res) => {   // auth with facebook
    console.log('facebook');
    // handle with passport
    res.send('logging in with Facebook');
});

router.get('/auth/facebook/callback', (req, res) => {   // auth with facebook
    console.log('facebook');
    // handle with passport
    res.send('logging in with Facebook');
});

module.exports = router;
