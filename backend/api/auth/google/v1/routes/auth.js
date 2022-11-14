// const passport = require('passport');
// const FacebookStrategy = require('passport-google').Strategy;
// const mongoose = require('mongoose');
const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/auth');

router.get('/auth/login', authController.authLoginCallback);

router.get('/auth/logout', authController.authLogoutCallback);

router.get('/auth/error', authController.authErrorCallback);

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile'],
    prompt: 'select_account'
}));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

module.exports = router;
