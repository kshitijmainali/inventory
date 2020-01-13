const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');

const strategyCallback = require('./../controller/strategyCallback');
const userModel = require('./../models/userModel');
const keys = require('./keys');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecrete,
      callbackURL: 'http://localhost:3000/api/v1/auth/google/redirect'
    },
    strategyCallback.gcallback
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebook.clientId,
      clientSecret: keys.facebook.clientSecret,
      callbackURL: 'http://localhost:3000/api/v1/auth/facebook/redirect'
    },
    strategyCallback.fcallback
  )
);
