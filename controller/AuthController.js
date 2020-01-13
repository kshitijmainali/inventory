const passport = require('passport');

exports.logInGoogle = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.googleRedirect = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      massage: 'new user created successfully',
      user: req.user
    }
  }); 
};

exports.logInFacebook = passport.authenticate('facebook');

exports.facebookRedirect = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      massage: 'new user created successfully',
      user: req.user
    }
  });pac
};
