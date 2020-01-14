const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	productCode: {
		type: String,
		require: true,
		unique: true,
	},
	quantity: {
		type: Number,
		require: true,
	},
	price: {
		type: Number,
		require: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'categories',
	},
});

const Product = mongoose.model('products', ProductSchema);
module.exports = Product;
