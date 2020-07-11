var router = require('express').Router();
var bcrypt = require('bcrypt');
var User = require('../config/user');
//
router.post('/', function(req, res) {
    var { username, password, email } = req.body;
    //
    User.findOne({ uname: username }, async (err, user) => {
        if (err) {
            // Error has occured
            req.flash('error_msg', "Whoops! An error occured!");
            res.redirect('/signup');
        } else if (user) {
            // User exists
            req.flash('error_msg', "This username already exists. Try another");
            res.redirect('/signup');
        } else {
            // No errors or existing users
            try {
                var hash = await bcrypt.hash(password, 10);
                var nuser = new User({
                    uname: username,
                    pass: hash,
                    email: email
                });
                //
                nuser.save(function(err, user) {
                    if (!err) {
                        // Success
                        req.login(user, function(e) {
                            if (!e) {
                                // We are now logged in
                                req.flash('success_msg', `Welcome!`);
                                res.redirect('/dashboard');
                            } else {
                                // A login error occured
                                req.flash('error_msg', "Login error occured");
                                res.redirect('/signup');
                            }
                        });
                        console.log(user);
                    } else {
                        // Failure
                        req.flash('error_msg', "A potential error occured");
                        res.redirect('/signup');
                        console.error(err);
                    }
                });
            } catch (e) {
                // Errors have occured
                res.send(e);
            }
        }
    });
});
//
module.exports = router;