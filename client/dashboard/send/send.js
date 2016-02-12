Template.send.events({
    'submit #sendForm': function (e) {
        e.preventDefault();
        var phonenumber = e.target.phonenumber.value;
        var smstext = e.target.smstext.value;
        var test = Meteor.call("sendsms", phonenumber, smstext);
        console.log(test);
    },

    'click #insert': function (e) {
        var test = Meteor.call("InsertMessage");
    }


});

