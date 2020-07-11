var mdb = require('mongoose');
var UserSchema = new mdb.Schema({
    uname: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
var User = mdb.model('User', UserSchema, 'users');
//
module.exports = User;