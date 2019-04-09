var createError = require('http-errors');
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var pathRouter = require('./routes/path');

var app = express();
var port = process.env.PORT || 2100

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/path', pathRouter);

module.exports = app;

app.listen(port, () => console.log(`App running, listening on port ${port}!`))