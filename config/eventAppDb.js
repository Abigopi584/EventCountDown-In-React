// Establishing databases Connection
var mongoose = require('mongoose');
var mongoUri = `mongodb://127.0.0.1/EventApp`;

var eventAppDbConnection = mongoose.connect(mongoUri);

module.exports = eventAppDbConnection;

