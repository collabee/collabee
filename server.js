/**
 * Module dependencies.
 */
var env = process.env.NODE_ENV || 'development';

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');

var app = express();
var ejs = require('ejs');
ejs.open = '{<{';
ejs.close = '}>}';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({
	secret : 'express-template'
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

// Load configuration
var config = require('./config/config')[env];

// Connect to mongodb
var connect = function() {
	var options = {
		server : {
			socketOptions : {
				keepAlive : 1
			}
		}
	};
	mongoose.connect(config.db, options);
};
// connect();

// Error handler
mongoose.connection.on('error', function(err) {
	console.log(err);
});

// Reconnect when closed
mongoose.connection.on('disconnected', function() {
	connect();
});

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function(file) {
	if (~file.indexOf('.js')) {
		require(__dirname + '/app/models/' + file);
	}
});

// Bootstrap routing
require('./app/route')(app);

// Run application
http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
