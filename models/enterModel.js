const mongoose = require('mongoose');

const inputSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'product must have a name'],
    unique: true,
    trim: true
  },
  quantity: {
    type: Number,
    require: [true, 'product must have a quantity']
  },
  price: {
    type: Number,
    required: [true, 'product must have an amount']
  },
  catId: {
    type: String,
    default: null
  }
});

const Data = mongoose.model('product', inputSchema);
const PurModel = mongoose.model('entryHistory', inputSchema);
const SellModel = mongoose.model('sellHistory', inputSchema);

module.exports = [Data, PurModel, SellModel];
