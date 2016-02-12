/**
 * Created by dr on 19.03.15.
 * Improved by dr on 31.03 -01.04.2015
 */
Template.loginForm.events({

    //TODO im HTML validierung einbauen Welche? In Abhängigkeit von der Eingabe muss entweder auf Username oder E-Mail validiert werden.

    'submit #loginForm': function (e) {
        e.preventDefault();

        var email = e.target.email.value;
        var password = e.target.password.value;

        Meteor.loginWithPassword(email, password, function (err) {
            if (err) {
                alert(err.toString());
            }
        });
        return false;
    }
});
