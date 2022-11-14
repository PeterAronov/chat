authLoginCallback = (req, res) => {
    res.render('login', { message: 'Hello to the chat app please login via Google to continue' });
}

authLogoutCallback = (req, res) => {
    req.logout(function (err) { // req.logout() is a function that passport provides to log out the user
        if (err) { throw new Error("Error logging out"); }
    })
    res.redirect('/');
}

authErrorCallback = (req, res) => {
    res.render('login', { message : 'Error logging in please try again ...' });
}

module.exports = {
    authLoginCallback,
    authLogoutCallback,
    authErrorCallback
}