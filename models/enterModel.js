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
  parId: {
    type: String,
    default: null
  }
});

const Data = mongoose.model('product', inputSchema);

module.exports = Data;
