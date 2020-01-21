const express = require('express');
const purchasesController = require('../controller/purchasesController');

const Route = express.Router();

/*
Route: /api/v1/purchases
*/
Route.route('/').get(purchasesController.get);
Route.route('/:id').get(purchasesController.show);
Route.route('/product:id').get(purchasesController.findProduct);
Route.route('/').delete(purchasesController.destroy);
Route.route('/details/:id').get(purchasesController.findProduct);

module.exports = Route;
