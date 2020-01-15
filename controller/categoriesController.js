// load Category model
const Category = require('../models/Category');

// get all the data
const get = async (req, res) => {
	try {
		const data = await Category.find({}).populate('parentCategory');
		// lets send array of objects directly for convinent in frontend
		res.status(200).json({ data });
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
		const newData = await Category.create(req.body);
		// lets send newData directly for convinent in frontend
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
		const newUpdate = await Category.findByIdAndUpdate(req.params.id, req.body, {
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
		const deletedData = await Category.findByIdAndRemove(req.params.id);
		res.status(200).json({
			message: 'success',
			data: deletedData,
		});
	} catch (err) {
		console.log(err);
	}
};

const categoriesController = {
	get,
	store,
	update,
	destroy,
};

module.exports = categoriesController;
