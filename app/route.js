var index = require('./controllers/index');
var project = require('./controllers/project');
var workspace = require('./controllers/workspace');

module.exports = function(app) {
	app.get('/', index.index);
	app.get('/workspace', workspace.index);
	app.get('/project', project.index);
};
