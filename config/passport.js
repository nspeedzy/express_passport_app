var passport = require('passport');
var User = require('./user');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
//
module.exports = function(psport = passport) {
    psport.use(new LocalStrategy(
        { usernameField: 'email' },
        function(email, password, done) {
            User.findOne({ email: email }, (err, user) => {
                if (err) {
                    // We have a problem here
                    return done(err, false);
                } else if (!user) {
                    // User does not exist
                    return done(null, false, { message: "User does not exist" });
                } else if (!bcrypt.compareSync(password, user.pass)) {
                    // Password is incorrect
                    return done(null, false, { message: "Password is incorrect" });
                } else {
                    // Return the user document
                    return done(null, user);
                }
            });
        }
    ));
    //
    psport.serializeUser(function(user, done) {
        return done(null, user.id);
    });
    psport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
            return done(err, user);
        });
    });
}