var mdb = require('mongoose');
var url = process.env.MONGO_URI; // ALERT: Replace proccess.env.MONGO_URI with your mongodb uri
//
module.exports = function() {
    mdb.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        authSource: 'admin'
    }).then(function() {
        console.log("Connected to MongoDB!");
    }).catch(err => console.error(err));
}