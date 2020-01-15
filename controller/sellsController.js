// load Sell model
const Sell = require('../models/Sell');

// get all the data
const get = async (req, res) => {
	try {
		const data = await Sell.find({});
		res.status(200).json({
			data,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			err,
		});
	}
};

// store new data
const store = async (req, res) => {
	try {
		const newData = await Sell.create(req.body);
		res.status(201).json({
			status: 'success',
			data: newData,
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message,
		});
	}
};

// update data
const update = async (req, res) => {
	try {
		const newUpdate = await Sell.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			message: 'success',
			data: newUpdate,
		});
	} catch (err) {
		res.status(500).json({
			message: 'error',
			err,
		});
	}
};
// delete data
const destroy = async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const deletedData = await Sell.findByIdAndRemove(req.params.id);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

const sellsController = {
	get,
	store,
	update,
	destroy,
};

module.exports = sellsController;
