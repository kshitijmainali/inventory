const express = require('express');
const logoutController = require('./../controller/logoutController');

const Router = express.Router();

Router.route('/').get(logoutController.logOutu);

module.exports = Router;
