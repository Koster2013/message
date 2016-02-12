/**
 * Created by mk on 18.06.15.
 */


Template.ResetPassword.events({

    'submit #resetForm': function (e) {
        e.preventDefault();
        // retrieve the input field values
        var oldpassword = e.target.oldpassword.value;
        var password = e.target.password.value;
        var password2 = e.target.password2.value;

        if (password.localeCompare(password2) != 0) {
            alert("Please enter the same value again -Password");
            return false;
        }
        //console.log(this.params);
        if (Meteor.user()) {
            Accounts.changePassword(oldpassword, password, function (err) {
                if (err) {
                    alert('We are sorry but something went wrong.');
                } else {
                    alert('Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                    Router.go("/dashboard");
                }
            });
        } else {
            var token = Router.current().url.replace("/reset-password/", "");

            Accounts.resetPassword(token, password, function (err) {
                if (err) {
                    alert('We are sorry but something went wrong.');
                } else {
                    alert('Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                }
            });
        }
    }

});

Template.ResetPassword.helpers({
    isAuthorizedUser: function () {
        if ( Meteor.user()) {
            return true;
        } else {
            return false;
        }
    }
});