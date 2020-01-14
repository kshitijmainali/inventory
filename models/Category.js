const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	parentCategory: {
		type: Schema.Types.ObjectId,
		ref: 'categories',
		default: null,
	},
});

const Category = mongoose.model('categories', CategorySchema);
module.exports = Category;
