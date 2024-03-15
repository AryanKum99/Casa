const product = require('../../models/products');
const User = require('../../models/user');
const ExpressError = require('../../utils/ExpressError');
const catchAsync = require('../../utils/catchAsync');

module.exports.addProd = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findOne({ _id: userId });
    if (!user.isAdmin) {
        return next(new ExpressError("You must be an Admin"));
    }
    const prod = req.body;
    const newProd = new product(prod);
    await newProd.save();
    res.status(200).json({
        message: "added new product",
        prod
    })
})

module.exports.getProducts = catchAsync(async (req, res, next) => {
    const products = await product.find({});
    if (!products) {
        return res.status(401).json({
            message: "Error! Can't find Products"
        })
    }
    res.render('marketplace/show', { products });
})

module.exports.getCart = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
        return res.status(400).json({ message: "Error!! Logout and Login again" })
    }
    var productArr = [];
    for (let i = 0; i < user.cart.length; i++) {
        const prod = await product.findOne({ _id: user.cart[i] });
        productArr.push(prod);
    }
    res.render('marketplace/cart/show', { productArr, user });
})

module.exports.addToCart = catchAsync(async (req, res, next) => {
    const id = (req.params.id).slice(1);
    console.log(id);
    const user = await User.findOne({ _id: req.user._id });
    console.log(user)
    const prod = await product.findOne({ _id: id });
    console.log(prod);
    user.cartTotal += prod.price;
    user.cart.push(id);
    await user.save();
    const prods = await product.find({});
    var productArr = [];
    for (let i = 0; i < user.cart.length; i++) {
        const prod = await product.findOne({ _id: user.cart[i] });
        productArr.push(prod);
    }
    res.render('marketplace/cart/show', { productArr, user });
})

module.exports.deleteFrmCart = catchAsync(async (req, res) => {
    const prodId = req.params.id;
    const prod = await product.findById(prodId);
    const user = await User.findOne({ _id: req.user._id });
    const index = user.cart.indexOf(prodId);
    if (!index) {
        return res.status(400).json({ message: "Cannot delete from the cart" });
    }
    if (index > -1) {
        user.cart.splice(index, 1);
    }
    user.cartTotal = user.cartTotal - prod.price;
    await user.save();
    res.status(200).json({ message: 'Deleted from Cart' });
});
