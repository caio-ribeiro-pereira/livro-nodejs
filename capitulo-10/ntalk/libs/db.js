const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('../config.js');
const host = config.mongodb[config.env];
mongoose.Promise = bluebird;

module.exports = mongoose.connect(host, config.mongoose);