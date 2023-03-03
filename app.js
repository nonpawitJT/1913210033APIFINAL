var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/index')
const passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandRouter = require('./routes/brand');
const productRouter = require('./routes/product');
var app = express();
const errorHandler = require('./middleware/errorHandler');
mongoose.connect('mongodb+srv://superdev:9UfyUwkZofsEB9JU@1913210033-tan.pud4w2f.mongodb.net/restfulapi?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});

app.use(logger('dev'));
app.use(express.json({
    limit:'50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/brand',brandRouter);
app.use('/product', productRouter);

app.use(errorHandler);
module.exports = app;
