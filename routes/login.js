var router = require('express').Router();
var passport = require('passport');
//
router.post('/', function(req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        successFlash: "Welcome back!",
        failureFlash: true
    })(req, res, next);
});
//
module.exports = router;