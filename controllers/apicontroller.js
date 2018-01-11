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
        let loginUsername = req.body.username,
            loginPassword = req.body.password;
            console.log('username '+ loginUsername );
            console.log('password ' + loginPassword);
        userInfo.find({$and: [{username: loginUsername}, {password:loginPassword}]},(err,loginInfo) => {
            if(err){
                throw err
            }
            else if(loginInfo && loginInfo.length){
                res.status(200).send({message: true});
            }
            else {
                res.status(404).send({message: "Check your username and password"});
            }
        })
    })

    app.post('/registerUser',[bodyParserJSON,urlencoded], (req,res) =>{

        const username = req.body.username,
              email = req.body.email,
              password = req.body.password;
        
        // check if username is already so that duplicate userinfo is not created.

        userInfo.find({username: username },(err,userInfoDb)=>{
            if(err){
                throw err;
            }
            else{
                if(userInfoDb && userInfoDb.length ){
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
                            res.status(200).send({message: "registration success"})
                        }
                    })
                }
            }
        })


        /*res.status(400).send({error: "duplicate username "})*/
    })
    app.post('/getEventsFromDB' ,[bodyParserJSON,urlencoded],(req,res)=>{
        let username = req.body.username;
        let eventArr =[]
        events.find({username: username},(err, eventsInfo)=> {
            if(err){
                throw err;
            }
            else if(eventsInfo && eventsInfo.length){
                eventsInfo.forEach((eventInfo ) => {
                    {
                        eventInfo.event.forEach((event) => {
                            console.log('event '+ event)
                            eventArr.push(event)
                        })
                    }
                })

                res.status(200).send({eventsInfo:eventArr})
            }
            else {
                res.status(404).send({anyEvents: false})
            }
        })
    })

    app.post('/checkEventsFromDB',[bodyParserJSON,urlencoded],(req,res)=>{
        let username =  req.body.username;
        events.find({username:username},(err, eventsData) => {
            if(err){
                throw err;
            }
            else if(eventsData && eventsData.length){
                res.status(200).send({areThereAnyEvents : true});
            }
            else
                {
                res.status(404).send({areThereAnyEvents : false});
            }

        })

    })

    app.post('/UpdateEventDB',[bodyParserJSON,urlencoded], (req, res)=>{
        let username = req.body.username,
            eventInfo= req.body.eventInfo;
        events.findOneAndUpdate({username : username },{$push: {
            event:{
                event: eventInfo.event,
                eventDescription:  eventInfo.evtDesc,
                dateOfEvent: eventInfo.dateOfEvt
            }
        }},{upsert:true},(err,eventInfo)=> {
            if(err){
                throw err
            }
            else {
                res.status(200).send({anyEvents: true })
            }
        })

    })
}
