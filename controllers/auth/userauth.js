const User = require('../../models/user');
const ExpressError = require('../../utils/ExpressError');
const catchAsync = require('../../utils/catchAsync');


module.exports.register = async (req, res, next) => {
    try {
        const { emailId, firstName, lastName, username, mobileNumber, password } = req.body;
        const existingUserID = await User.findOne({ emailId });
        if (existingUserID) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        const newUser = new User({ emailId, firstName, lastName, username, mobileNumber });
        console.log(newUser);
        const registeredUser = await User.register(newUser, password);
        console.log('success');
        req.login(registeredUser, err => {
            if (err) return next(err);
            console.log('loggedIn');
            res.redirect('/');
        })
    } catch (error) {
        next(error);
    }
};

module.exports.login = catchAsync(async (req, res, next) => {
    try {
        res.redirect('/');
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }; // This function is provided by Passport.js to clear the login session
        res.redirect('/');
    }
    )
};


module.exports.getRegForm = (req, res) => {
    res.render('auth/signup');
}

module.exports.getLoginForm = (req, res) => {
    res.render('auth/login');
}