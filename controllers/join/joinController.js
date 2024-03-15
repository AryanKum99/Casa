const seller = require('../../models/seller');
const express = require("express");
const router = express.Router();
const ExpressError = require('../../utils/ExpressError');
const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/user');


module.exports.getJoin = catchAsync(async (req, res, next) => {
    try {
        const id = req.user._id;
        const user = await User.findOne({ _id: id });
        if (!user) {
            res.redirect('/auth/login');
        }
        res.render('joinPage/join', { user });
    } catch (error) {
        next(error);
    }
})

module.exports.join = catchAsync(async (req, res, next) => {
    try {
        const newSeller = new seller(req.body);
        if (!seller) {
            return next(new ExpressError({ message: "Error!! Try Again" }));
        }
        const user = await User.findOne(req.user._id);
        user.isMember = true;
        await user.save();
        await newSeller.save();
        res.redirect('/');
    }
    catch (error) {
        next(error);
    }
})