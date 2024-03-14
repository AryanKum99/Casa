const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('error');
        throw new ExpressError({
            message: "Not Logged in",
            status: 401
        })
    }
    next();
}