var landing = require('./controllers/landing');
var home = require('./controllers/home');
var workspace = require('./controllers/workspace');

module.exports = function(app) {
	app.get('/', home.index);
	app.get('/landing', landing.index);
	app.get('/workspace', workspace.index);
};
