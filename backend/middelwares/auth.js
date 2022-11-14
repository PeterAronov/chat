const IsAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { return next() } // req.isAuthenticated() is a function that passport provides to check if the user is authenticated
    res.redirect("/auth/login")
}

module.exports = IsAuthenticated
