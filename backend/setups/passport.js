const chatUser = require('../api/auth/google/v1/models/user');
const GoogleStrategy =  require('passport-google-oauth20').Strategy;

module.exports = function (passport) {

    passport.serializeUser((user, done) => { // req.session.passport.user = {id: '..'} Save praticular user reference in the session
        done(null, user._id) // We are using sessions in our application, when we call serializeUser, passport will store the user id to the session.
    })
    
    passport.deserializeUser((id, done) => { // When ever we want to access any user information from the session, we will use the user id stored in the session to get the user information from the database.
        chatUser.findById(id).then((user) => { // user object attaches to the request as req.user
            done(null, user)
        })
    })

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_APP_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: [ 'profile' ],
        state: true
    },
        (accessToken, refreshToken, profile, done) => { // profile is the user profile object we get from facebook it contains the user information like name, email, profile picture etc.
            chatUser.findOne({ profileId: profile.id }, (err, user) => {
                if (err) {
                    return done(err); // done(null, false, { message: 'Something went wrong with Facebook' });
                }
                if (!err && user !== null) {
                    return done(null, user);
                } else {
                    console.log("profile ", profile);
                    const newChatUser = new chatUser({
                        profileId: profile.id,
                        fullName: profile.displayName,
                        profilePic: profile.photos[0].value || ''
                    })

                    newChatUser.save((err) => {
                        if (err) {
                            throw new Error("Error saving user"); // done(null, false, { message: 'Error saving user' });
                        } else {
                            done(null, user);
                        }
                    })
                }
            })
        })
    )
}

    
