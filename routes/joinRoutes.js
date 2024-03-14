const express = require("express");
const joinController = require('../controllers/join/joinController');
const passport = require('passport');
const joinRouter = express.Router();
const { isLoggedIn } = require('../middleware/middleware');
joinRouter.route('/')
    .get(isLoggedIn, joinController.getJoin)
    .post(isLoggedIn, joinController.join);

module.exports = joinRouter;