var mongoose = require('mongoose');
var dbConnection  = require('../config/eventAppDb');

var schema = mongoose.Schema;

var userInfoS = new schema({
    username: String,
    Email:  String,
    password: String,
    eventReminder: Boolean
});

var userInfo = dbConnection.model('users', userInfoS);

module.exports = userInfo;