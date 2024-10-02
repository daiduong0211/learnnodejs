const express = require('express');
const route = express.Router();
const newController = require('../app/controllers/NewControllers');

// Use newController.index to handle the '/' route
route.get('/', newController.index);

module.exports = route;
