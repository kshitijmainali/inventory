const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const productRoute = require('./routes/product');
const categoryRoutes = require('./routes/category');
const purchaseRoute = require('./routes/purchase');
// eslint-disable-next-line no-unused-vars
const passportSetup = require('./config/passwordSetup');
const keys = require('./config/keys');
const AuthRoute = require('./routes/auth');
const logOut = require('./routes/logout');
const logIn = require('./routes/googleSignIn');

const app = express();

app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		keys: [ keys.session.cookieKey ]
	})
);

app.use(passport.initialize());
app.use(passport.session());

// parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).json({
		status: 'OK'
	});
});
app.use('/api/v1/products', productRoute);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/purchases', purchaseRoute);
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/logout', logOut);
app.use('/api/v1/google', logIn);

module.exports = app;
