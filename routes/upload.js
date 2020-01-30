const Route = require('express')();

const imgUploader = require('../controller/uploadController');

Route.route('/').post(
  imgUploader.uploadPhoto,
  imgUploader.resizeUserPhoto,
  imgUploader.upload
);

module.exports = Route;
