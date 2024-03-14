const express = require("express");
const freelancer = require('../controllers/services/freelance');
const servicesRouter = express.Router();
const { isLoggedIn } = require('../middleware/middleware');

servicesRouter.route('/freelancers').get(isLoggedIn, freelancer.getFreelancers);

servicesRouter.route('/freelancers/builders').get(isLoggedIn, freelancer.getBuilders);

servicesRouter.route('/freelancers/interiorDesigners').get(isLoggedIn, freelancer.getintD);

servicesRouter.route('/freelancers/architects').get(isLoggedIn, freelancer.getArchitects);

module.exports = servicesRouter;