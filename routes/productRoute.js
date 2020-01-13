const express = require('express');
const productController = require('../controller/productController');

const Route = express.Router();

Route.route('/')
  .get(productController.getProduct)
  .post(productController.createEntry);
Route.route('/:id')
  .patch(productController.update)
  .delete(productController.delete);
Route.route('');
// Route.route('/update').;

module.exports = Route;
