var eventCountDown = require('../models/eventModel');
var userInfo = require('../models/userInfoModel');

module.exports = function(app){
    //Initial seeding of data
    app.get('/userInfo', (req,res) =>{
        var initialUserInfo =[
            {
            username:'abirami',
            Email: 'abigopi584@gmail.com',
            password:'Shakthi30',
            eventReminder: true
        },
            {
                username:'bala',
                Email: 'bitz.bala@gmail.com',
                password:'Nethra28',
                eventReminder: true
            },
        ];
        if(userInfo.length > 0){
            userInfo.remove().exec();
            userInfo.create(initialUserInfo, (err, result) => {
                if(err) throw err;
                else
                    res.send(JSON.stringify(result));
            })
        }
    });

    app.get('/EventCountDown', (req,res) =>{
        var initialEvents =[
            {
                username: 'abirami',
                event: 'Birthday',
                eventDescription: "balu's Birthday",
                dateOfEvent: new Date(1982, 5,11),
                eventReminder: true
            },
            {
                username: 'abirami',
                event: 'birthday',
                eventDescription: "Sahkthi's Birthday",
                dateOfEvent: new Date(2010, 6,30),
                eventReminder: true
            },
            {
                username: 'bala',
                event: 'Birthday',
                eventDescription: "Nethra's Birthday",
                dateOfEvent: new Date(2016, 6,28),
                eventReminder: true
            }
        ];
        if(eventCountDown.length > 0){
            eventCountDown.remove().exec();
            eventCountDown.create(initialEvents, (err, result) => {
                if(err) throw err;
                else
                    res.send(JSON.stringify(result));
            })
        }
    })

}