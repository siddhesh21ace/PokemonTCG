/**
 * Created by Siddhesh on 4/3/2017.
 */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Passport JS*/
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: process.env.WEBDEV_PROJECT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));

var project = require("./server/app.js");
project(app);

var port = process.env.PORT || 3000;

app.listen(port);