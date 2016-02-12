/**
 * Created by dr on 20.03.15.
 */
Template.loginForgotPassword.events({

    'submit #forgotPassForm': function (e) {

        e.preventDefault();

        var email = e.target.email.value;


        Accounts.forgotPassword({email: email}, function (err) {
            if (err) {
                if (err.message === 'User not found [403]') {
                    alert("E-Mail nicht vorhanden");
                } else {
                    alert(err.toString());
                }
            } else {
                alert("E-Mail wurde versendet!");
            }
        });
    }
});
