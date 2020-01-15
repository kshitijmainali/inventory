// load Purchase model
const Purchase = require('../models/Purchase');

// get all the Purchase history
const get = async (req, res) => {
	try {
		const data = await Purchase.find({});
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

// store new Purchase history
const store = async (req, res) => {
	try {
		const newData = await Purchase.create(req.body);
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

// update Purchase
const update = async (req, res) => {
	try {
		const newUpdate = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			massage: 'success',
			data: newUpdate,
		});
	} catch (err) {
		res.status(500).json({
			massage: 'error',
			err,
		});
	}
};
const destroy = async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const deletedData = await Purchase.findByIdAndRemove(req.params.id);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

const purchasesController = {
	get,
	store,
	update,
	destroy,
};

module.exports = purchasesController;
