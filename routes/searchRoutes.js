'use strict';

var express = require('express');
var router = express.Router();
var searchController = require('../controller/searchController');

router.get('/', searchController.searchByKey);

module.exports = router;