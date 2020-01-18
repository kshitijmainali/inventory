const mongoose = require('mongoose');

const { Schema } = mongoose;

const SellSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'products'
  },
  quantity: {
    type: Number,
    default: 1
  },
  price: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Sell = mongoose.model('sells', SellSchema);
module.exports = Sell;
