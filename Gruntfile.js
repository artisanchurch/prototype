module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    /**
     * Pull in the package.json file so we can read its metadata.
     */
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Here's a banner with some template variables.
     * We'll be inserting it at the top of minified assets.
     */
    banner:
      '/*\n' +
      ' *            /|\n' +
      ' *           / |  |\\\n' +
      ' *          /  |  | \\\n' +
      ' *         /   |   \\ \\\n' +
      ' *        / /| |    \\ \\\n' +
      ' *       / / | |     \\ \\\n' +
      ' *      / /   \\ \\     \\ \\\n' +
      ' *     / /     \\/      \\ \\\n' +
      ' *    /_/   /\\    ______\\ \\\n' +
      ' * ________/ /   / ________\\\n' +
      ' * \\  ______/   / /    __\n' +
      ' *  \\ \\         \\/    / /\n' +
      ' *   \\ \\      /\\     / /\n' +
      ' *    \\ \\     \\ \\   / /\n' +
      ' *     \\ \\     | | / /\n' +
      ' *      \\ \\    | |/ /\n' +
      ' *       \\ \\   |   /\n' +
      ' *        \\ |  |  /\n' +
      ' *         \\|  | /\n' +
      ' *             |/\n' +
      ' *\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.description %>\n' +
      ' * <%= pkg.homepage ? pkg.homepage + "\\n" : "" %>\n' +
      ' * License: Public Domain\n' +
      ' */\n\n',

    /**
     * Less: https://github.com/gruntjs/grunt-contrib-less
     *
     * Compile, concat and compress Less files.
     * Make sure to add any other CSS libraries/files you'll be using.
     * We are excluding minified files with the final ! pattern.
     */
    less: {
      dist: {
        src: ['<%= banner %>', 'static/css/main.less', '!static/css/*.min.css'],
        dest: 'static/css/main.min.css',
        options: {
          compile: true,
          compress: true
        }
      }
    },

    /**
     * Uglify: https://github.com/gruntjs/grunt-contrib-uglify
     *
     * Minify JS files.
     * Make sure to add any other JS libraries/files you'll be using.
     * We are excluding minified files with the final ! pattern.
     */
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: ['static/js/vendor/jquery-1.9.1.js', 'static/js/vendor/holder.js', 'static/js/*.js', '!static/js/*.min.js'],
        dest: 'static/js/main.min.js'
      }
    },

    /**
     * JSHint: https://github.com/gruntjs/grunt-contrib-jshint
     *
     * Validate files with JSHint.
     * Below are options that conform to idiomatic.js standards.
     * Feel free to add/remove your favorites: http://www.jshint.com/docs/#options
     */
    jshint: {
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: true,
          Backbone: true,
          _: true,
          module: true,
          Highcharts: true
        }
      },
      all: ['static/js/<%= pkg.name %>.js']
    },

    /**
     * Watch: https://github.com/gruntjs/grunt-contrib-watch
     *
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     * Add files to monitor below.
     */
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['default']
      },
      less: {
        files: ['**/*.html', 'static/css/*.less'],
        tasks: ['less']
      },
      js: {
        files: ['static/js/*.js', '!static/js/*.min.js'],
        tasks: ['jshint', 'uglify']
      }
    }
  });

  /**
   * Loading tasks
   */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /**
   * Task aliases
   */
  grunt.registerTask('default', ['less', 'jshint', 'uglify']);

};
