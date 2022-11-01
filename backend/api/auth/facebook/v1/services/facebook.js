// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const mongoose = require('mongoose');
// const chatUser = mongoose.model('User');

// class FacebookService {

//     constructor() {
//         this.facebookStrategy = FacebookService.getFacebookStrategy();
//     }

//     static getFacebookStrategy() {

//         passport.serializeUser((user, done) => { // Save praticular user reference in the session
//             done(null, user._id) // We are using sessions in our application, when we call serializeUser, passport will store the user id to the session.
//         })

//         passport.deserializeUser((id, done) => { // When ever we want to access any user information from the session, we will use the user id stored in the session to get the user information from the database.
//             chatUser.findById(id).then((user) => {
//                 done(null, user)
//             })

//             passport.use(new FacebookStrategy({
//                 clientID: config.facebook_api_key,
//                 clientSecret: config.facebook_api_secret,
//                 callbackURL: config.callback_url
//             },
//                 (accessToken, refreshToken, profile, done) => {
//                     chatUser.findOne({ profileId: profile.id }, (err, user) => {
//                         if (err) {
//                             return done(err);
//                         }
//                         if (!err && user !== null) {
//                             return done(null, user);
//                         } else {
//                             const newChatUser = new chatUser({
//                                 profileId: profile.id,
//                                 fullName: profile.displayName,
//                                 profilePic: profile.photos[0].value || ''
//                             })

//                             newChatUser.save((err) => {
//                                 if (err) {
//                                     throw new Error("Error saving user");
//                                 } else {
//                                     console.log("Saving user ...");
//                                     done(null, user);
//                                 }
//                             });
//                         }
//                     });
//                 }
//             ));
//         })
//     }
// }