const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const productRoute = require('./routes/productRoute');
// eslint-disable-next-line no-unused-vars
const passportSetup = require('./config/passwordSetup');
const keys = require('./config/keys');
const AuthRoute = require('./routes/AuthRoute');
const logOut = require('./routes/logoutRoute');
const logIn = require('./routes/googleSignIn');

const app = express();
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK'
  });
});
app.use('/api/v1/products', productRoute);
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/logout', logOut);
app.use('/api/v1/google', logIn);

module.exports = app;
