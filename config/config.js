
// mongo-db url example
// mongodb://id:passwd@localhost:port/db-name'

module.exports = {
	development : {
		db : 'mongodb://localhost/dev'
	},
	test : {
		db : 'mongodb://localhost/test'
	},
	release : {
		db : 'mongodb://localhost/release'
	}
};