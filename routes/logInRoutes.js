const express = require('express');
const logIn = require('./../controller/logInController');

const Route = express.Router();

Route.route('/').post(logIn.logInUser);

module.exports = Route;
