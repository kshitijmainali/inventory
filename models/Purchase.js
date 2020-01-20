const mongoose = require('mongoose');

const { Schema } = mongoose;

const PurchaseSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'products'
	},
	vendor: {
		type: String
	},
	quantity: {
		type: Number,
		require: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Purchase = mongoose.model('purchases', PurchaseSchema);
module.exports = Purchase;
