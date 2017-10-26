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
    app.post('/login',[bodyParserJSON,urlencoded],(req,res) =>{
        let loginInfo = req.body;
        res.send({status:200, loginnfo: loginInfo})
    })

    app.post('/registerUser',[bodyParserJSON,urlencoded], (req,res) =>{
        let userDetails = req.body;
        console.log(userDetails)
        res.status(200).send({message: "registration success "})
        /*res.status(400).send({error: "duplicate username "})*/
    })
    app.post('/checkForEvents' ,[bodyParserJSON,urlencoded],(req,res)=>{
        let eventsInfo = req.body.username;
        /*res.status(404).send({anyEvents: false});*/
        res.status(200).send({anyEvents: true, eventInfo: [{id: 1,
                                                            event: 'Birthday',
                                                            evtDesc: "Husband's Birthday",
                                                            evtDate:'1982-05-11',
                                                            evtReminder:true
                                                            },{id: 2,
                                                            event: 'Wedding',
                                                            evtDesc: "Mom and Dad",
                                                            evtDate:'1983-08-21',
                                                            evtReminder:true
                                                             },{id: 3,
                                                                event: 'Wedding',
                                                                evtDesc: "Abi and Balu",
                                                                evtDate:'2018-12-08',
                                                                evtReminder:true
                                                            }
        ]})
    })
/*    app.post('/createNewEvent',[bodyParserJSON,urlencoded],(req,res) => {
        let event_username = req.body.username;
        res.send({status: 400});
       /!* res.send({status: 200, eventInfo:{event: 'birthday', eventDesc: 'husband birthday', dateofEvt:'05/11/2018', needReminder:'true'}})*!/

    })*/

    app.post('/UpdateEventDB',[bodyParserJSON,urlencoded], (req, res)=>{
        res.status(200).send({anyEvents: true})
    })
}
