const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const Razorpay = require('razorpay');
const passport = require('passport');
const LocalStrategy = require('passport-local');
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const session = require('express-session');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const { isLoggedIn } = require('./middleware/middleware');
const User = require('./models/user');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});


morgan.token("req-headers", function (req, res) {
    return JSON.stringify(req.headers);
});

process.env.NODE_ENV != "production" &&
    app.use(morgan(":method :url :status :req-headers"));

const secret = process.env.SECRET || "thisisasecret";
const sessionConfig = {
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


app.get('/', (req, res) => { res.render('home') });

app.use('/auth', require('./routes/authRoutes'));
app.use('/join', require('./routes/joinRoutes'));
app.use('/services', require('./routes/serviceRoutes'));
app.get('/createOrder', catchAsync(async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    res.render('marketplace/cart/paymentPage', { user });
}));
app.post('/createOrder', async (req, res) => {
    try {
        const amount = req.body.amount * 100
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'akum2302@gmail.com'
        }

        razorpayInstance.orders.create(options,
            (err, order) => {
                if (!err) {
                    res.status(200).send({
                        success: true,
                        msg: 'Order Created',
                        order_id: order.id,
                        amount: amount,
                        key_id: process.env.RAZORPAY_KEY,
                        product_name: "Cart Total",
                        description: "Cart Total",
                        contact: "8567345632",
                        name: "Casa",
                        email: "Casa@gmail.com"
                    });
                }
                else {
                    res.status(400).send({ success: false, msg: 'Something went wrong!' });
                }
            }
        );
        const user = await User.findOne({ _id: req.user._id });
        while (user.cart.length > 0) {
            user.cart.pop();
        }
        user.cartTotal = 0;
        await user.save();
        console.log('success');
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = app;