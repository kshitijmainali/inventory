// load User model
const User = require('../models/User');

// get all the data
const get = async (req, res) => {
	try {
		const data = await User.find({});
		res.status(200).json({
			data
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			err
		});
	}
};

// store new data
const store = async (req, res) => {
	try {
		const newData = await User.create(req.body);
		res.status(201).json({
			status: 'success',
			data: newData
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message
		});
	}
};

// update data
const update = async (req, res) => {
	try {
		const newUpdate = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		res.status(200).json({
			message: 'success',
			data: newUpdate
		});
	} catch (err) {
		res.status(500).json({
			message: 'error',
			err
		});
	}
};
// delete data
const destroy = async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const deletedData = await User.findByIdAndRemove(req.params.id);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

const usersController = {
	get,
	store,
	update,
	destroy
};

module.exports = usersController;
