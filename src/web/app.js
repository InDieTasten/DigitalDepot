var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var busesRoutes = require('./routes/buses');
var lanesRoutes = require('./routes/lanes');
var positionRoutes = require('./routes/postition');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

app.use('/buses', busesRoutes);
app.use('/lanes', lanesRoutes);
app.use('/position', positionRoutes);

app.listen(8080, () => {
    console.log('Server is listening to http://localhost:8080');
});
