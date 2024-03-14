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
        if (registeredUser) {
            res.status(200).json({
                message: 'Registered successfully'
            });
        } else {
            throw new ExpressError({ message: 'Registration failed', status: 401 });
        }
    } catch (error) {
        next(error);
    }
};

module.exports.login = catchAsync(async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports.logout = (req, res, next) => {
    try {
        req.logout(); // This function is provided by Passport.js to clear the login session
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        next(error);
    }
};