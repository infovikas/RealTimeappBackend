var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
var bodyParser = require('body-parser');

// Connect to MongoDB
const mongoUrl = 'mongodb://test:test12345@ds261570.mlab.com:61570/rte';
(mongoose).Promise = bluebird;
mongoose.connect(mongoUrl).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  },
).catch(err => {
  console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  // process.exit();
});

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//app.use(express.bodyParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());


app.use('/', cors(), indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
