const express = require("express");
const authController = require('../controllers/auth/userauth');
const passport = require('passport');
const authRouter = express.Router();

authRouter.route("/signup")
    .get(authController.getRegForm)
    .post(authController.register);

authRouter.get('/login', authController.getLoginForm);
authRouter.post('/login', passport.authenticate('local'), authController.login);

authRouter.get("/logout", authController.logout);

module.exports = authRouter;
