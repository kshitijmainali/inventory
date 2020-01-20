// load Product model
const Product = require('../models/Product');
const purchasesController = require('./purchasesController');
const sellsController = require('./sellsController');
// get all the Product
const get = async (req, res) => {
	try {
		const data = await Product.find({}).populate('category');
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

// store new product
const store = async (req, res) => {
	try {
		req.body.price = parseInt(req.body.price);
		req.body.quantity = parseInt(req.body.quantity);
		const newData = await Product.create(req.body);
		const data = {
			product: newData._id,
			vendor: req.body.vendor,
			quantity: req.body.quantity
		};
		const purchaseHistory = await purchasesController.store(data);
		console.log(newData);
		res.status(201).json({
			status: 'success',
			data: newData,
			purchaseHistory
		});
	} catch (err) {
		res.status(500).json({
			status: 'error',
			message: err.message
		});
	}
};

// get single Product
const show = async (req, res) => {
	try {
		const data = await Product.find({ _id: req.params.id });
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

//sell the product and create the sell history
const sell = async (req, res) => {
	try {
		req.body.quantity = parseInt(req.body.quantity);
		const available = await Product.find({ _id: req.params.id });
		const newUpdate = await Product.findByIdAndUpdate(
			req.params.id,
			{ $set: { quantity: available[0].quantity - req.body.quantity } },
			{
				new: true,
				runValidators: true
			}
		);
		const data = {
			id: available[0]._id,
			quantity: req.body.quantity,
			price: req.body.quantity * available[0].price
		};
		await sellsController.sellHistory(data);
		res.status(200).json({
			status: 'success',
			newUpdate
		});
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			massage: err.message
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
	sell,
	show,
	update,
	destroy
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
