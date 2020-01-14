const express = require('express');
const productsController = require('../controller/productsController');

const Route = express.Router();

Route.route('/').get(productsController.get).post(productsController.store);
Route.route('/').patch(productsController.update).delete(productsController.destroy);

module.exports = Route;
