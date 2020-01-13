const express = require('express');
const logInController = require('./../controller/logInController');

const Router = express.Router();

Router.route('/').get(logInController.logInu);

module.exports = Router;
