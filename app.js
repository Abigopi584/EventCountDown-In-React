var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 8079;
var setUpController = require('./controllers/setUpControllers');

setUpController(app);

app.listen(PORT);




