const express = require('express');
const entryController = require('../controller/productController');

const Route = express.Router();

Route.route('/').post(entryController.createEntry);
Route.route('/:id')
  .patch(entryController.update)
  .delete(entryController.delete);
Route.route('');
// Route.route('/update').;

module.exports = Route;
