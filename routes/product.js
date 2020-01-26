const express = require('express');
const productsController = require('../controller/productsController');

const Route = express.Router();

/*
Route: /api/v1/products
*/
Route.route('/')
  .get(productsController.get)
  .post(productsController.store);
Route.route('/:id')
  .get(productsController.show)
  .patch(productsController.update)
  .delete(productsController.destroy);
Route.route('/search/:tag').get(productsController.search);
module.exports = Route;
