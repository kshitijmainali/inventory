const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		require: true,
		trim: true
	},
	email: {
		type: String,
		require: true
	},
	password: {
		type: String
	},
	provider: {
		type: String
	},
	providerUserId: {
		type: String
	}
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
