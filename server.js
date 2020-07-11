// Libraries
var express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var path = require('path');
// Config
require('dotenv').config();
require('./config/database')();
require('./config/passport')(passport);
// Variables
var app = express();
var port = process.env.PORT || 5000;
var login = require('./routes/login');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: process.env.SECRET, // Replace proccess.env.SECRET with your secret
    resave: true,
    saveUninitialized: false,
    cookie: {}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
//
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Routes
app.get('/', (req, res, next) => {
    if (req.isUnauthenticated()) {
        return next();
    } else {
        res.redirect('/dashboard');
    }
}, function(req, res) {
    res.render('index');
});
//
app.get('/login', function(req, res, next) {
    if (req.isUnauthenticated()) {
        return next();
    } else {
        res.redirect('/dashboard');
    }
}, (req, res) => {
    res.render('login');
});
//
app.get('/signup', (req, res, next) => {
    if (req.isUnauthenticated()) {
        return next();
    } else {
        res.redirect('/dashboard');
    }
}, function(req, res) {
    res.render('signup');
});
//
app.get('/dashboard', function(req, res, next) {
    if (req.isAuthenticated()) {
        // You're in the clear
        return next();
    } else {
        req.flash('error_msg', "401 Not authorized");
        res.redirect('/login');
    }
}, (req, res) => {
    res.render('dash', {
        user: req.user
    });
});
// Deployment
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});