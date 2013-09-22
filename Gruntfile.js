module.exports = function(grunt) {

  // Initialize the configuration object.
  grunt.initConfig({

    // Get the values from the package.json file.
    pkg: grunt.file.readJSON('package.json'),

    cafemocha: {
      map: {
        src: 'src/test/map-spec.js',
      },

      hex: {
        src: 'src/test/hex-spec.js',
      },

      game: {
        src: 'src/test/game-spec.js',
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
        src: ['src/main/requires.js', 'src/main/util.js', 'src/main/*.js'],
        dest: 'bin/hexmap.js',
      },

    },

  });


  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-cafe-mocha');

  grunt.registerTask('default', ['clean', 'concat', 'cafemocha']);
};

