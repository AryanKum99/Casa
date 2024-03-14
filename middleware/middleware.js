module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        console.log('error');
        return res.redirect('/user/login');
    }
    next();
}