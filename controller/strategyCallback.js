const userModel = require('./../models/userModel');

exports.gcallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const currentUser = await userModel.findOne({ googleId: profile.id });
    if (currentUser) {
      done(null, currentUser);
    } else {
      const user = {
        name: profile.displayName,
        Id: profile.id,
        mailAddress: profile.emails[0].value
      };
      const newusr = await userModel.create(user);
      done(null, newusr);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.fcallback = async (accessToken, refreshToken, profile, done) => {
  console.log(profile);
  try {
    const currentUser = await userModel.findOne({ googleId: profile.id });
    if (currentUser) {
      done(null, currentUser);
    } else {
      console.log(profile);
      const user = {
        name: profile.displayName,
        Id: profile.id
      };
      const newusr = await userModel.create(user);
      done(null, newusr);
    }
  } catch (err) {
    console.log(err);
  }
};
