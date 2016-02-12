if (Meteor.isServer) {

    //scheduler Meteoer
    /*   setInterval(function(){
     console.log('test');
     }, 60 * 1000 );*/

    Accounts.config({
        sendVerificationEmail: true,
        forbidClientAccountCreation: true
    });

    (function () {
        "use strict";
        Accounts.urls.resetPassword = function (token) {
            console.log(token);
            //Session.set("resetPassword", token);
            return Meteor.absoluteUrl('reset-password/' + token);
        };
    })();

    smtp = {
        username: 'aktien.analyzer@gmail.com',   // eg: server@gentlenode.com
        password: 'P@ssw0rt1234',   // eg: 3eeP1gtizk5eziohfervU
        server: 'smtp.gmail.com',  // eg: mail.gandi.net
        port: 25
    };

    url = {
        urllocation: Meteor.absoluteUrl()
    };
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;


    Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
        extended: false
    }));

    Meteor.methods({

        createAppUser: function (obj) {
            Accounts.createUser({
                email: obj.email,
                password: obj.password,
                profile: {
                    vorname: obj.vorname,
                    nachname: obj.nachname,
                    role: "user"
                }
            });
        },

        InsertMessage: function () {
            console.log("test sms send");
            Messages.insert({sid: "test"});

        },

        sendsms: function (phonenumber, smstext) {
            console.log("test sms send");

            var accountSid = 'AC13799177b43a2deb2ff7c77fc937b185';
            var authToken = '1b4a1e442a1b3a5b583f7d2a2808d38f';

            //require the Twilio module and create a REST client
            var client = Meteor.npmRequire('twilio')(accountSid, authToken);

            client.messages.create({
                to: phonenumber,
                from: "+4915735982635",
                body: smstext
            }, function (err, result) {
                if (err) {
                    console.log(err);
                    return false;
                } else {
                    console.log(result)
                    //Messages.insert(result);
                    return true;
                }
            });

        }
    });


}

