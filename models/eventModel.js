var mongoose = require('mongoose');
var dbConnection = require('../config/eventAppDb');

var schema = mongoose.Schema;

var eventSchema =  new schema({
    username: String,
    event: String,
    eventDescription: String,
    dateOfEvent: Date,
    eventReminder: Boolean
});

var event = dbConnection.model('EventsCountDown',eventSchema);

module.exports = event;