const User = require('./../models/User');

exports.gcallback = async (accessToken, refreshToken, profile, done) => {
	try {
		const currentUser = await User.findOne({ googleId: profile.id });
		if (currentUser) {
			done(null, currentUser);
		} else {
			const user = {
				name: profile.displayName,
				Id: profile.id,
				mailAddress: profile.emails[0].value,
			};
			const newusr = await User.create(user);
			done(null, newusr);
		}
	} catch (err) {
		console.log(err);
	}
};

exports.fcallback = async (accessToken, refreshToken, profile, done) => {
	console.log(profile);
	try {
		const currentUser = await User.findOne({ googleId: profile.id });
		if (currentUser) {
			done(null, currentUser);
		} else {
			console.log(profile);
			const user = {
				name: profile.displayName,
				Id: profile.id,
			};
			const newusr = await User.create(user);
			done(null, newusr);
		}
	} catch (err) {
		console.log(err);
	}
};
