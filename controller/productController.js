const [ Data ] = require('../models/enterModel');

exports.getProduct = async (req, res) => {
	try {
		const products = await Data.find({});
		res.status(201).json({
			products
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			err
		});
	}
};

exports.createEntry = async (req, res) => {
	try {
		const newData = await Data.create(req.body);
		const search = await Data.find({ _id: newData.parId });
		res.status(200).json({
			status: 'success',
			data: {
				newData,
				search
			}
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			massage: err.message
		});
	}
};
//
exports.update = async (req, res) => {
	try {
		const newUpdate = await Data.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		res.status(200).json({
			massage: 'success',
			data: {
				newUpdate
			}
		});
	} catch (err) {
		res.status(500).json({
			massage: 'error',
			err
		});
	}
};
exports.delete = async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const deletedData = await Data.findByIdAndRemove(req.params.id);
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};
