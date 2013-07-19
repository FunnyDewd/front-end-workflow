var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};


module.exports = function(grunt){

  var buildConfig = grunt.file.readJSON('build.config.json');
  // Project configuration.
  grunt.initConfig({

    // Read the package.json file for info.
    pkg: grunt.file.readJSON('package.json'),
    fedConfig: grunt.file.readJSON('fed.config.json'),

    // Set up the watch tasks. These tasks run when the file
    // system detects changes/additions to particular files.
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      compass: {
        files: ['<%= fedConfig.source.cssDir %>/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },
      less: {
        files: ['<%= fedConfig.source.cssDir %>/**/*.less'],
        tasks: ['less']
      },
      stylus: {
        files: ['<%= fedConfig.source.cssDir %>/**/*.styl'],
        tasks: ['stylus']
      },
      coffee: {
        files: ['<%= fedConfig.source.jsDir %>/**/*.coffee',
                '!<%= fedConfig.source.vendorDir %>/**/*.coffee'],
        tasks: ['coffee:dist']
      },
      jade: {
        files: ['<%= fedConfig.source.dir %>/**/*.jade',
                '!<%= fedConfig.source.vendorDir %>/**/*.jade'],
        tasks: ['coffee:dist']
      },
      html: {
        files: ['<%= fedConfig.source.dir %>/**/*.html',
                '<%= fedConfig.source.vendorDir %>/**/*.html'],
        tasks: ['htmllint']
      },
      css: {
        files: ['<%= fedConfig.source.cssDir %>/**/*.css'],
        tasks: ['csslint']
      },
      js: {
        files: ['<%= fedConfig.source.jsDir %>/**/*.js',
                '!<%= fedConfig.source.vendorDir %>/**/*.js'],
        tasks: ['jshint']
      },
      karma: {
        files: ['<%= fedConfig.source.jsDir %>/**/*.js',
                '<%= fedConfig.server.jsDir %>/**/*.js',
                '!<%= fedConfig.source.vendorDir %>/**/*.js'],
        tasks: ['concurrent:compile', 'karma:unit:run']
      }
    },

    // Task for cleaning directories
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
              '<%= fedConfig.server.dir %>/',
              '<%= fedConfig.dist.dir %>/'
          ]
        }]
      },

      server: '<%= fedConfig.server.dir %>'
    },

    // Tasks for copying files
    copy: {
      server: {
        files: [
          { expand: true,
            cwd: '<%= fedConfig.source.dir %>',
            src: ['**/*.html',
                  '!<%= fedConfig.relative.vendorDir %>/**/*.html'],
            dest: '<%= fedConfig.server.dir %>' },
          { expand: true,
            cwd: '<%= fedConfig.source.dir %>',
            src: ['<%= fedConfig.relative.cssDir %>/**/*.css',
                  '<%= fedConfig.relative.vendorDir %>/**/*.css'],
            dest: '<%= fedConfig.server.dir %>' },
          { expand: true,
            cwd: '<%= fedConfig.source.dir %>',
            src: ['<%= fedConfig.relative.jsDir %>/**/*.js',
                  '<%= fedConfig.relative.vendorDir %>/**/*.js'],
            dest: '<%= fedConfig.server.dir %>' },
          { expand: true,
            cwd: '<%= fedConfig.source.dir %>',
            src: ['<%= fedConfig.relative.imageDir %>/**/*'],
            dest: '<%= fedConfig.server.dir %>' },
          { expand: true,
            cwd: '<%= fedConfig.source.dir %>',
            src: ['<%= fedConfig.relative.fontDir %>/**/*'],
            dest: '<%= fedConfig.server.dir %>' }
        ]
      },
      dist: {
        files: [
          { expand: true,
            cwd: '<%= fedConfig.server.dir %>',
            src: ['**/*.html',
                  '!<%= fedConfig.relative.vendorDir %>/**/*.html'],
            dest: '<%= fedConfig.dist.dir %>' },
          { expand: true,
            cwd: '<%= fedConfig.server.dir %>',
            src: ['<%= fedConfig.relative.imageDir %>/**/*'],
            dest: '<%= fedConfig.dist.dir %>' },
          { expand: true,
            cwd: '<%= fedConfig.server.dir %>',
            src: ['<%= fedConfig.relative.fontDir %>/**/*'],
            dest: '<%= fedConfig.dist.dir %>' }
        ]
      }
    },

    // Tasks for concatenating and minification
    // We'll have separate concat and uglify tasks for convenience
    concat: buildConfig.concat,

    cssmin: buildConfig.cssmin,

    uglify: buildConfig.uglify,

    // Tasks for jshint module
    jshint: {
      jshintrc: '.jshintrc',
      all: [
        'Gruntfile.js',
        '<%= fedConfig.source.jsDir %>/**/*.js',
        '!<%= fedConfig.source.vendorDir%>/**/*.js',
        '<%= fedConfig.server.jsDir %>/**/*.js',
        '!<%= fedConfig.server.vendorDir%>/**/*.js'
      ]
    },

    // Tasks for csslint
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      all: ['<%= fedConfig.source.cssDir %>/**/*.css']
    },

    // Task to validate the HTML
    // ******* Unfortunately, we'll have to punt momentarily because
    // htmllint task won't interpolate the template inside the
    // files string ******
    htmllint: {
      all: [
        './source/**/*.html',
        '!./source/vendor/**/*.html'
      ]
    },

    // Start with the precompilers. Jade is first.
    jade: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },

        files: [{
          expand: true,
          cwd: '<%= fedConfig.source.dir %>',
          src: '**/*.jade',
          dest: '<%= fedConfig.server.dir %>',
          ext: '.html'
        }]
      }
    },

    // for Sass and Compass
    compass: {
      options: {
        sassDir: '<%= fedConfig.source.cssDir %>',
        cssDir: '<%= fedConfig.server.cssDir %>',
        imagesDir: '<%= fedConfig.source.imageDir %>',
        javascriptsDir: '<%= fedConfig.source.jsDir %>',
        fontsDir: '<%= fedConfig.source.fontDir %>',
        importPath: '<%= fedConfig.source.vendorDir %>',
        relativeAssets: true
      },
      dist: {},
      server: {
        options: {
          debugInfo: true
        }
      }
    },


    // for LESS compilation
    less: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= fedConfig.source.cssDir %>',
          src: '**/*.less',
          ignore: '<%= fedConfig.source.vendorDir %>/**/*.less',
          dest: '<%= fedConfig.server.cssDir %>',
          ext: '.css'
        }]
      }
    },

    // for Stylus compilation
    stylus: {
      all: {
        files: [{
          expand: true,
          cwd: '<%= fedConfig.source.cssDir %>',
          src: '**/*.styl',
          ignore: '<%= fedConfig.source.vendorDir %>/**/*.styl',
          dest: '<%= fedConfig.server.cssDir %>',
          ext: '.css'
        }]
      }
    },

    // for CoffeeScript
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= fedConfig.source.jsDir %>',
          src: '{,*/}*.coffee',
          ignore: '<%= fedConfig.source.vendorDir %>/**/*.coffee',
          dest: '<%= fedConfig.server.jsDir %>',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: '<%= fedConfig.test.dir %>',
          src: '{,*/}*.coffee',
          dest: '<%= fedConfig.test.dir %>',
          ext: '.js'
        }]
      }
    },

    // ***** Concurrent - run certain tasks concurrently for performance *****
    concurrent: {
      lint: [
        'jshint',
        'csslint',
        'htmllint'
      ],
      compileServer: [
        'jade',
        'compass:server',
        'less',
        'stylus',
        'coffee:dist'
      ],
      compileTest: [
        'jade',
        'compass:server',
        'less',
        'stylus',
        'coffee:test'
      ],
      compileDist: [
        'jade',
        'compass:dist',
        'less',
        'stylus',
        'coffee:dist'
      ]
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: true,
        browsers: ['PhantomJS']
      },
      server: {
        configFile: 'karma.conf.js',
        runnerPort: 9999,
        singleRun: false
      }
    },

    // ********* Local server and Livereload setup **********
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              require('connect-livereload')(),
              mountFolder(connect, './.tmp/'),
              mountFolder(connect, './source/')
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function(connect) {
            return [
                mountFolder(connect, '<%= fedConfig.server.dir %>'),
                mountFolder(connect, '<%= fedConfig.test.dir %>')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function(connect) {
            return [
                mountFolder(connect, '<%= fedConfig.dist.dir %>')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    }
  });

  // Load the plugins being used by grunt
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-karma');


  //grunt.renameTask('regarde', 'watch');


  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:lint',
    'copy:server',
    'jade:compile',
    'compass:dist',
    'less',
    'stylus',
    'coffee:dist',
    'karma:unit',
    'copy:dist',
    'concat',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('server', [
    'clean:server',
    'concurrent:lint',
    'concurrent:compileServer',
    'connect:livereload',
    'open:server',
    'watch'
  ]);

  // set up any custom tasks.
  grunt.registerTask('default', [
    'clean',
    'concurrent:lint',
    'concurrent:compileServer',
    'connect:livereload',
    'open:server'
  ]);


  // custom tasks for testing
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test:ci', ['karma:server']);
};
