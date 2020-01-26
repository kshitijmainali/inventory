const validator = require('validator');

const validate = body => {
  try {
    validator.isAlpha(body.name);
    if (body.quantity <= 0) {
      throw 'quanti ty can not be zero';
    }
  } catch (err) {
    return err.message;
  }
};
