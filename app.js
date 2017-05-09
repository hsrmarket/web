'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var session = require('express-session');
require('./core/helpers/handlebars-helpers');
hbs.registerPartials(__dirname + '/views/partials');

var app = express();

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(session({ secret: 'casduichsfsdfsdfwerwerxcvmnqeqwablmlksdfertpeoritpeoi', resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));

var authRoutes = require('./routes/authRoutes');
var appRoutes = require('./routes/appRoutes');
var userRoutes = require('./routes/userRoutes');
var accountRoutes = require('./routes/accountRoutes');
var purchaseRoutes = require('./routes/purchaseRoutes');
var adminRoutes = require('./routes/adminRoutes');

app.use('/', authRoutes);
app.use('/articles/', appRoutes);
app.use('/user/', userRoutes);
app.use('/accounts/', accountRoutes);
app.use('/purchases/', purchaseRoutes);
app.use('/admin', adminRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
