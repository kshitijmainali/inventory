const express = require('express');
const passport = require('passport');
const AuthController = require('../controller/AuthController');

const checkStatus = (req, res, next) => {
	console.log('from gAuthController');
	console.log(req.user);
	if (!req.user) {
		res.status(403).json({
			message: 'You are not authorized'
		});
	} else {
		next();
	}
};

const Route = express.Router();

Route.route('/google').get(AuthController.logInGoogle);
Route.route('/google/redirect').get(passport.authenticate('google'), checkStatus, AuthController.googleRedirect);

Route.route('/facebook').get(AuthController.logInFacebook);
Route.route('/facebook/redirect').get(passport.authenticate('facebook'), checkStatus, AuthController.facebookRedirect);

module.exports = Route;
