var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 8078;
var path = require('path');
var setUpController = require('./controllers/setUpControllers');
var apiController = require('./controllers/apicontroller');

setUpController(app);
apiController(app);
app.listen(PORT);




