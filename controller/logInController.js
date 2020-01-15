exports.logInu = (req, res) => {
	res.status(200).json({
		message: 'go to /api/v1/auth/google to login',
	});
};
