// load Product model
const Product = require('../models/Product');

// get all the Product
const get = async (req, res) => {
	try {
		const data = await Product.find({}).populate('category');
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

// store new product
const store = async (req, res) => {
	try {
		req.body.price = parseInt(req.body.price);
		req.body.quantity = parseInt(req.body.quantity);
		console.log(req.body);
		const newData = await Product.create(req.body);
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

// get single Product
const show = async (req, res) => {
	try {
		const data = await Product.find({ _id: req.params.id });
		res.status(200).json({
			message: 'success',
			data,
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			err,
		});
	}
};

// update product
const update = async (req, res) => {
	try {
		console.log(req.body);
		req.body.price = parseInt(req.body.price);
		req.body.quantity = parseInt(req.body.quantity);
		const newUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
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
const destroy = async (req, res) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const deletedData = await Product.findByIdAndRemove(req.params.id);
		res.status(200).send({ message: 'product deleted.' });
	} catch (err) {
		console.log(err);
	}
};
const productsController = {
	get,
	store,
	show,
	update,
	destroy,
};

module.exports = productsController;

// class ProductsController {
// 	// get all the products
// 	static async get(req, res) {
// 		try {
// 			const products = await Product.find({});
// 			res.status(200).json({
// 				products,
// 			});
// 		} catch (err) {
// 			res.status(400).json({
// 				status: 'failed',
// 				err,
// 			});
// 		}
// 	}

// 	// store new product
// 	static async store(req, res) {
// 		try {
// 			const newData = await Product.create(req.body);
// 			const search = await Product.find({ _id: newData.parId });
// 			res.status(201).json({
// 				status: 'success',
// 				data: {
// 					newData,
// 					search,
// 				},
// 			});
// 		} catch (err) {
// 			res.status(500).json({
// 				status: 'error',
// 				message: err.message,
// 			});
// 		}
// 	}

// 	// update product
// 	static async update(req, res) {
// 		try {
// 			const newUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
// 				new: true,
// 				runValidators: true,
// 			});
// 			res.status(200).json({
// 				message: 'success',
// 				data: {
// 					newUpdate,
// 				},
// 			});
// 		} catch (err) {
// 			res.status(500).json({
// 				message: 'error',
// 				err,
// 			});
// 		}
// 	}

// 	static async destroy(req, res) {
// 		try {
// 			// eslint-disable-next-line no-unused-vars
// 			const deletedData = await Product.findByIdAndRemove(req.params.id);
// 			res.redirect('/');
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	}
// }

// module.exports = new ProductsController();
