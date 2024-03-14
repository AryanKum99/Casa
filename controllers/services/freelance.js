const seller = require('../../models/seller');
const ExpressError = require('../../utils/ExpressError');
const catchAsync = require('../../utils/catchAsync');

module.exports.getFreelancers = catchAsync(async (req, res, next) => {
    const freelancers = await seller.find({});
    if (!freelancers) {
        return next(new ExpressError({ message: "Error!!" }))
    }
    res.status(200).json(freelancers);
})

module.exports.getArchitects = catchAsync(async (req, res, next) => {
    const freelancers = await seller.find({ typeOfSeller: "Architect" });
    if (!freelancers) {
        return next(new ExpressError({ message: "Error!!" }))
    }
    res.status(200).json(freelancers);
})

module.exports.getintD = catchAsync(async (req, res, next) => {
    const freelancers = await seller.find({ typeOfSeller: "Interior Designer" });
    if (!freelancers) {
        return next(new ExpressError({ message: "Error!!" }))
    }
    res.status(200).json(freelancers);
})

module.exports.getBuilders = catchAsync(async (req, res, next) => {
    const freelancers = await seller.find({ typeOfSeller: "Builder" });
    if (!freelancers) {
        return next(new ExpressError({ message: "Error!!" }))
    }
    res.status(200).json(freelancers);
})