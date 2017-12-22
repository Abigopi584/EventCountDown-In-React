let express = require('express');
let app = express();
let fs = require('fs');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let userInfo = require('../models/userInfoModel');
let events = require('../models/eventModel');
let path = require('path');

module.exports = function(app){
    app.set('view engine', 'html');
    app.engine('html', (path,options,callback) => {
        fs.readFile(path, 'utf-8', callback);
    });

    let bodyParserJSON = bodyParser.json();
    let urlencoded = bodyParser.urlencoded({extended: true});
    app.use(express.static(path.join(__dirname,'../src/client')));

    app.get('*', function (request, response){
        var pathDir = path.parse(__dirname);
        response.sendFile(path.join(pathDir.dir, '/src/client/index.html'))
    })

    app.get('/', (req,res) =>{
        var pathDir = path.parse(__dirname);
        res.sendFile(path.join(pathDir.dir+ '/src/client/index.html'));

    })
    app.post('/login',[bodyParserJSON,urlencoded],(req,res) =>{
        let loginInfo = req.body;
        res.send({status:200, loginnfo: loginInfo})
    })

    app.post('/registerUser',[bodyParserJSON,urlencoded], (req,res) =>{
        console.log('re.body '+ JSON.stringify(req.body));
        const username = req.body.username,
              email = req.body.email,
              password = req.body.password;


        console.log('req.body.username '+ username);
        // check if username is already so that duplicate userinfo is not created.

        userInfo.find({username: username },(err,userInfoDb)=>{
            console.log('inside db find')
            if(err){
                throw err;
            }
            else{
                if(userInfoDb && userInfoDb.length ){
                    console.log('if userInfo found '+ userInfoDb )
                    res.status(403).send({message: "Duplicate Username"})
                }
                else{
                    console.log('if userInfo not found')
                    let newUserInfo =  new userInfo({
                        username: username,
                        email: email,
                        password: password
                    });
                    newUserInfo.save((err,data) => {
                        if(err){
                            console.log('eer ' + err)
                            throw err;
                        }
                        else{
                            console.log('newUserInfo ' + newUserInfo)
                            res.status(200).send({message: "registration success"})
                        }
                    })
                }
            }
        })


        /*res.status(400).send({error: "duplicate username "})*/
    })
    app.post('/getEventsFromDB' ,[bodyParserJSON,urlencoded],(req,res)=>{
        let eventsInfo = req.body.username;
        /*res.status(404).send({anyEvents: false});*/
        res.status(200).send({ eventsInfo: [{id: 1,
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

    app.post('/checkEventsFromDB',[bodyParserJSON,urlencoded],(req,res)=>{
        res.status(200).send({areThereAnyEvents : true});
    })

    app.post('/UpdateEventDB',[bodyParserJSON,urlencoded], (req, res)=>{
        let eventInfo = {
            id: 4,
            event: req.body.eventInfo.event,
            evtDesc: req.body.eventInfo.evtDesc,
            evtDate:req.body.eventInfo.evtDate,
            evtReminder:true
        }
        res.status(200).send({anyEvents: true })
    })
}
