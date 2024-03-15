const express = require("express");
const freelancer = require('../controllers/services/freelance');
const prodController = require('../controllers/services/marketplace');
const servicesRouter = express.Router();
const { isLoggedIn } = require('../middleware/middleware');

servicesRouter.route('/freelancers').get(isLoggedIn, freelancer.getFreelancers);

servicesRouter.route('/freelancers/builders').get(isLoggedIn, freelancer.getBuilders);

servicesRouter.route('/freelancers/interiorDesigners').get(isLoggedIn, freelancer.getintD);

servicesRouter.route('/freelancers/architects').get(isLoggedIn, freelancer.getArchitects);

servicesRouter.route('/admin/addProduct').post(isLoggedIn, prodController.addProd);

servicesRouter.route('/marketplace/show').get(isLoggedIn, prodController.getProducts);

servicesRouter.route('/marketplace/cart').get(isLoggedIn, prodController.getCart);
servicesRouter.route('/marketplace/cart/add/:id').post(isLoggedIn, prodController.addToCart);

module.exports = servicesRouter;