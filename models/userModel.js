const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a user must have a name']
  },
  Id: {
    type: String,
    required: [true, 'a user must have a third party Id']
  },
  mailAddress: {
    type: String,
    default: null
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
