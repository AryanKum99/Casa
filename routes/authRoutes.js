const express = require("express");
const authController = require('../controllers/auth/userauth');
const passport = require('passport');
const authRouter = express.Router();

authRouter.route("/signup").post(authController.register);
authRouter.post('/login', passport.authenticate('local'), authController.login);
authRouter.route("/logout").delete(authController.logout);

module.exports = authRouter;
