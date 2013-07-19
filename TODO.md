#Minimum Product

Current TODO:
+ create base gruntfile
+ create base bowerrc file
+ create base bower file
+ create fed.config.json file to hold grunt settings
+ create .tmp folder for server/copying of source files and server.
+ create build.config.json which holds concat options and minify options
+ create destination folder for copy/concat/uglify process in grunt
+ finish copy:dest task
+ server task
+ do final build based on build.config.json manifest
+ task to kick off connect server & launch the browser
+ improve performance with grunt-concurrent
+ task to set up the live-reload
- test task
- test:ci task(?)
- build task - including single run karma test

##Build requirements

Build Support
+ JS Linting
+ CSS Linting
+ File contatenation
+ Minification
+ Copy to dist folder

Development Sugar
- Scaffolding:
  - component creation
  - page creation

Preprocessor Support:
+ SASS/SCSS/Compass
+ LESS
+ Stylus
+ CoffeeScript
- TypeScript
+ Jade

Documentation Support:
- NaturalDocs

Testing Support:
- Integrated Karma/Jasmine
- PhantomJS

Server Support:
+ LiveReload
+ Static page serving?

Folder Structure:
- / (root) - configuration files/scripts
- /test - Spec folder
- /test/helpers
- /test/fixtures
- /source/
- /source/css
- /source/js
- /source/js/vendor
- /source/assets
- /source/assets/images

Bower Packages:
- jQuery 1.10.x
- jasmine-jquery (testing)
- modernizr
- normalize-css
- hammerjs

Node Packages:
- grunt-cli (-g)
- bower (-g)



