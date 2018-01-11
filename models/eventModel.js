var mongoose = require('mongoose');
var dbConnection = require('../config/eventAppDb');

var schema = mongoose.Schema;

var eventSchema =  new schema({
    username: String,
    event:[{
        event:String,
        eventDescription: String,
        dateOfEvent: Date
    }]
});

var eventCountDown = dbConnection.model('EventsCountDown',eventSchema);

module.exports = eventCountDown;
