// load Purchase model
const Purchase = require('../models/Purchase');

// get all the Purchase history
const get = async (req, res) => {
	try {
		const data = await Purchase.find({}).populate('product');
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

// store new Purchase history
const store = async (data) => {
	try {
		const newData = await Purchase.create(data);
		return {
			status: 'success',
			data: newData
		};
	} catch (err) {
		return {
			status: 'error',
			message: err.message
		};
	}
};

// show purchase
const show = async (req, res) => {
	try {
		const data = await Purchase.find({ _id: req.params.id });
		res.status(200).json({
			message: 'success',
			data
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			err
		});
	}
};

// find products in purchase
const findProduct = async (req, res) => {
	try {
		const data = await Purchase.find({ product: req.params.id }).populate('product');
		res.status(200).json({
			message: 'success',
			data
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			err
		});
	}
};

// update Purchase
const update = async (req, res) => {
	try {
		const newUpdate = await Purchase.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		res.status(200).json({
			message: 'success',
			data: newUpdate
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'error',
			err
		});
	}
};

const destroy = async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const deletedData = await Purchase.remove({});
		res.send('success');
	} catch (err) {
		console.log(err);
		res.send(err);
	}
};

const purchasesController = {
	get,
	show,
	store,
	update,
	destroy,
	findProduct
};

module.exports = purchasesController;
