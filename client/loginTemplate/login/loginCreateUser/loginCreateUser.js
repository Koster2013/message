/**
 * Created by dr on 20.03.15.
 */
Template.loginCreateUser.events({

    //TODO validierung im HTML


    'submit #createForm': function (e) {
        e.preventDefault();
        // retrieve the input field values
        var vorname = e.target.vorname.value;
        var nachname = e.target.nachname.value;
        var email = e.target.email.value;

        var password = e.target.password.value;
        var password2 = e.target.password2.value;

        if (password.localeCompare(password2) != 0) {
            alert("Please enter the same value again -Password");
            return false;
        }

        var user_email = Meteor.users.find({email: email});
        if (user_email.count() == 0) {
            Meteor.call('createAppUser', {
                vorname: vorname,
                nachname: nachname,
                password: password,
                email: email
            }, function (err) {
                if (!err) {
                    //Benutzer automatisch einloggen.
                    Meteor.loginWithPassword(email, password, function (err) {
                        if (err) {
                            alert(err.toString());
                        }
                        else {
                            console.log("gayt");
                        }
                    });
                }
                else {
                    alert(err.toString());
                }

            });

        }
        else {
            alert("another_user_with_the_given_emailaddress_exists");
        }
        return false;
    }


});


