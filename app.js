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
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


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
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET
// });


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/join', require('./routes/joinRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));

module.exports = app;