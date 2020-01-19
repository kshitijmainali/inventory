const Purchase = require('./../models/Purchase');
const Sell = require('./../models/Sell');

const storeHistory = async spec => {
  try {
    const history = await Purchase.create(spec);
    console.log('Purchase history created');
  } catch (err) {
    console.log(err.message);
  }
};

const sellHistory = async body => {
  try {
    const history = await Sell.create(body);
    console.log(history);
  } catch (err) {
    console.log(err.message);
  }
};
module.exports = {
  storeHistory,
  sellHistory
};
