const express = require('express');
const categoriesController = require('../controller/categoriesController');

const Route = express.Router();

Route.route('/').get(categoriesController.get).post(categoriesController.store);
Route.route('/:id')
	.get(categoriesController.show)
	.patch(categoriesController.update)
	.delete(categoriesController.destroy);

module.exports = Route;
