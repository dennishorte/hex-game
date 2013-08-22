module.exports = function(grunt) {

  // Initialize the configuration object.
  grunt.initConfig({

    // Get the values from the package.json file.
    pkg: grunt.file.readJSON('package.json'),

    cafemocha: {
      test_hexmap: {
        src: 'bin/hexmap-spec.js',
      },
    },

    clean: {
      all: ['bin'],
    },
    
    concat: {
      main: {
        options: {
          banner: '(function (Hex) {\n' + '  \'use strict\';\n\n',
          footer: '\n})(typeof exports === \'undefined\' ? this[\'Hex\'] = {} : exports);\n'
        },
        src: ['src/main/*.js'],
        dest: 'bin/hexmap.js',
      },

      spec: {
        src: ['src/test/*.js'],
        dest: 'bin/hexmap-spec.js',
      },
    },

  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-cafe-mocha');

  grunt.registerTask('default', ['clean', 'concat', 'cafemocha']);
};

