const express = require("express");

const authRouter = express.Router();

authRouter.route("/googleAuth").post(authController.googleAuth);
authRouter.route("/logout").delete(authController.logout);

module.exports = authRouter;
