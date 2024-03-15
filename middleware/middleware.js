const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('error');
        res.redirect('/auth/login');
    }
    next();
}