module.exports = function(grunt) {
	grunt.initConfig({
		// Task configuration.
		concat : {
			dist : {
				src : ['test/config.js', 'test/server.js'],
				dest : 'test/result.js'
			}
		},
		uglify : {
			dist : {
				src : '<%= concat.dist.dest %>',
				dest : 'test/result.min.js'
			}
		},
		watch : {
			backend: {
				files : ['server.js', 'app/**/*.js'],
				tasks : ['express:dev'],
				options : {
					spawn : false
				}
			},
			
			frontend : {
				options :{
					livereload : true
				},
				files: [
					'app/views/**/*.html',
					'public/javascripts/**/*.js',
					'public/stylesheets/**/*.css',
				]
			}
		},
		express : {
			options: {
				node_env: 'development'
			},
			dev : {
				options : {
					script : 'server.js'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express-server');

	grunt.registerTask('server', ['express:dev', 'watch']);
};
