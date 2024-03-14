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
            res.status(401).json({
                message: "Login Again"
            })
        }
        res.status(200).json(user);
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
        await newSeller.save();
        res.status(200).json({
            message: "success"
        })
    }
    catch (error) {
        next(error);
    }
})