module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    jsbeautifier: {
      files: ["d3.chart.pie.js"],
      options: {
        js: {
          indentSize: 2
        }
      }
    },
    bower: {
      install: {
        options: {
          cleanBowerDir: true
        }
      }
    },
    jshint: {
      all: ['d3.chart.pie.js'],
      options: {
        "curly": true,
        "eqnull": true,
        "eqeqeq": true,
        "undef": true,
        "unused": true,
        "latedef": true,
        "camelcase": true,
        "strict": true,
        "newcap": true,
        "maxcomplexity": 3,
        "globals": {
          "jQuery": true,
          "d3": true,
          "define": false,
          "setTimeout": false,
          "clearTimeout": false,
          "window": false
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'jsbeautifier','bower' ]);

};
