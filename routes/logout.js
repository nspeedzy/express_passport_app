var router = require('express').Router();
//
router.get('/', function(req, res) {
    req.logout();
    req.flash('success_msg', "You are now logged out");
    res.redirect('/');
});
//
module.exports = router;