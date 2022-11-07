const FacebookStrategy = require('passport-facebook').Strategy;
const chatUser = require('../api/auth/facebook/v1/models/user');

console.log('passport setup');

module.exports = function (passport) {

    console.log('passport setup');
    passport.serializeUser((user, done) => { // req.session.passport.user = {id: '..'} Save praticular user reference in the session
        done(null, user._id) // We are using sessions in our application, when we call serializeUser, passport will store the user id to the session.
    })
    console.log('passport setup 2');
    passport.deserializeUser((id, done) => { // When ever we want to access any user information from the session, we will use the user id stored in the session to get the user information from the database.
        chatUser.findById(id).then((user) => { // user object attaches to the request as req.user
            done(null, user)
        })
    })
    console.log('passport setup 3');

    console.log(process.env.FACEBOOK_APP_ID);
    console.log(process.env.FACEBOOK_APP_SECRET);
    console.log(process.env.FACEBOOK_CALLBACK_URL);

    passport.use(new FacebookStrategy({
        clientID: '614397593554229',
        clientSecret: '018e3e3b9b312009ef7462aa97b6fddc',
        callbackURL: 'https://dashboard.heroku.com/apps/chat-app-v1-peter/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        (accessToken, refreshToken, profile, done) => { // profile is the user profile object we get from facebook it contains the user information like name, email, profile picture etc.
            chatUser.findOne({ profileId: profile.id }, (err, user) => {
                if (err) {
                    return done(err); // done(null, false, { message: 'Something went wrong with Facebook' });
                }
                if (!err && user !== null) {
                    return done(null, user);
                } else {
                    const newChatUser = new chatUser({
                        profileId: profile.id,
                        fullName: profile.displayName,
                        profilePic: profile.photos[0].value || ''
                    })

                    newChatUser.save((err) => {
                        if (err) {
                            throw new Error("Error saving user"); // done(null, false, { message: 'Error saving user' });
                        } else {
                            console.log("Saving user ...");
                            done(null, user);
                        }
                    })
                }
            })
        })
    )
}

    
