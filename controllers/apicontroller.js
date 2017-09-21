var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userInfo = require('../models/userInfoModel');
var events = require('../models/eventModel');
var path = require('path');

module.exports = function(app){
    app.set('view engine', 'html');
    app.engine('html', (path,options,callback) => {
        fs.readFile(path, 'utf-8', callback);
    });

    let bodyParserJSON = bodyParser.json();
    let urlencoded = bodyParser.urlencoded({extended: true});
    app.use(express.static(path.join(__dirname,'../src/client')));


    app.get('/', (req,res) =>{
        var pathDir = path.parse(__dirname);
        res.sendFile(path.join(pathDir.dir+ '/src/client/index.html'));

    })
    app.post('/loginForm',[bodyParserJSON,urlencoded],(req,res) =>{
        let loginInfo = req.body;
        res.send({status:200, loginnfo: loginInfo})
    })

    app.post('/registerUser',[bodyParserJSON,urlencoded], (req,res) =>{
        let userDetails = req.body;
        console.log(userDetails);
    })
}
