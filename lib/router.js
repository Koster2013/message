
Router.configure({
    layoutTemplate: 'mainContent'
});

Router.map(function () {

    this.route('/receive_sms/', {where: 'server'})
        .get(function () {
            console.log("iwejfiehjhfri");
            this.response.end('get request\n');
        })
        .post(function () {
            console.log("iwejirfieuji");
            console.log(this.request.query);
            console.log(this.request.body);
            console.log(this.request.body.Body);
            this.response.end('post request\n');
        });


    this.route('dashboard', {
        path: '/dashboard',
        onBeforeAction: function () {
            if (Meteor.user()) {
                this.render('dashboard', {to: 'content'});
                this.render('main', {to: 'dashboard'});
            } else {
                Router.go('login');
            }

        }
    });

    this.route('main', {
        path: '/',
        onBeforeAction: function () {
            if (!(Meteor.user())) {
                Router.go("/login");
            } else {
                Router.go('/dashboard');
            }
        }
    });


    this.route('login', {
        path: '/login',
        onBeforeAction: function () {
            if (!(Meteor.user())) {
                this.render('loginPanel', {to: 'content'});
                this.render('loginForm', {to: 'loginContent'});
            } else {
                Router.go('/dashboard');
            }
        }
    });


    this.route('send', {
        path: '/send',
        onBeforeAction: function () {
            if (!(Meteor.user())) {
                Router.go('/login');
            } else {
                this.render('send', {to: 'dashboard'});
            }
        }
    });

    this.route('signOut', {
        path: '/signout',
        onBeforeAction: function () {
            Meteor.logout();
            Router.go('/');
        }
    });


    this.route('forgotPassword', {
        path: '/forgotPassword',
        onBeforeAction: function () {
            if (!(Meteor.user())) {
                this.render('loginPanel', {to: 'content'});
                this.render('loginForgotPassword', {to: 'loginContent'});
            } else {
                Router.go('/dashboard');
            }
        }
    });

    this.route('resetPassword', {
        path: '/reset-password/:token',
        onBeforeAction: function () {
            if (!(Meteor.user())) {
                this.render('loginPanel', {to: 'content'});
                this.render('ResetPassword', {to: 'loginContent'});
            } else {
                Router.go('/dashboard');
            }
        }
    });


    this.route('resetPasswordAuthorizedUser', {
        path: '/reset-password-authorized-user',
        onBeforeAction: function () {
            if ((Meteor.user())) {
                this.render('loginPanel', {to: 'content'});
                this.render('ResetPassword', {to: 'loginContent'});
            } else {
                Router.go('/');
            }
        }
    });

    this.route('createUser', {
        path: '/createUser',
        onBeforeAction: function () {
            if (!(Meteor.user())) {
                this.render('loginPanel', {to: 'content'});
                this.render('loginCreateUser', {to: 'loginContent'});
            } else {
                Router.go('/dashboard');
            }
        }
    });
});