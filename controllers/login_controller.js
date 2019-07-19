const User = require('../models/User');

module.exports = {

    signin: function(req, res){

        User.find({
            email: req.body.email,
            password: req.body.password
        }).exec(function(error, user) {
            if (error) res.status(500).send(error);

            if(user.length){
                res.status(201).json({success: true, user: {
                  firstName: user.firstName,
                  name: user.name,
                  email: user.email,
                  nationality: user.nationality,
                  createdOn: user.createdOn
                }});
            }

            
            res.status(201).json({success: false});
        });
    },

    locationPush: function(req, res){

        var sendNotification = function(data) {
            var headers = {
              "Content-Type": "application/json; charset=utf-8",
              "Authorization": "MTMyODk4MWMtOWY3OC00NGMyLWI2MDItNjQ1OWU0ZTEyNWEx"
            };
            
            var options = {
              host: "onesignal.com",
              port: 443,
              path: "/api/v1/notifications",
              method: "POST",
              headers: headers
            };
            
            var https = require('https');
            var req = https.request(options, function(res) {  
              res.on('data', function(data) {
                console.log("Response:");
                console.log(JSON.parse(data));
              });
            });
            
            req.on('error', function(e) {
              console.log("ERROR:");
              console.log(e);
            });
            
            req.write(JSON.stringify(data));
            req.end();
          };
          
          var message = { 
            app_id: "70ca3981-3ce0-47df-bb3d-70cf8a689048",
            contents: {"en": "You are near an area in which you must be careful."},
            headings: {"en": "Warning"},
            subtitle: {"en": "Take precaution"},
            include_player_ids: ["59e12242-88ef-4deb-b302-7dd7e5488011"]
          };
          
          sendNotification(message);
          
        // console.log(req.body);
    }
}