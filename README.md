#My Front End grunt workflow

Here's my basic build script/environment for developing front end code.
My focus here isn't necessarily single page apps, but more like
generalized front end coding.

Features include
----------------

- Linting:
  - CSS
  - JavaScript
  - HTML Validation
- Preprocessor Support:
  - Jade
  - Compass/SASS/SCSS
  - LESS
  - Stylus
  - CoffeeScript
- Concatenation & Minification
- Karma for unit and continuous integration testing
- Documentation generation (based on Docco) __coming soon__


Coming soon
-----------
- TypeScript support
- Slim support (I sense a theme)
- Better dependency support (via require?)


Installation
------------
This workflow requires both ruby and node.js/npm to be installed.

Installing ruby gems:

    gem install sass compass

Global node modules:

    npm install -g grunt-cli bower

Once the above is installed, cd into your cloned director and execute:

    npm install && bower install


## Have fun!
