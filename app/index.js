'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('ES6 Babel') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'someOption',
      message: 'Would you like to intro to Ecmascript 6?',
      default: true
    }, {
      type: 'confirm',
      name: 'hasBootstrap',
      message: 'Do you want to use bootstrap?',
      default: true
    }];

    this.prompt(prompts, function(props) {
      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('_config.js'),
        this.destinationPath('config.js'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath('src/_main.js'),
        this.destinationPath('src/main.js'),
        this.props
      );

      this.fs.copy(
        this.templatePath('src/user/_user.js'),
        this.destinationPath('src/user/user.js')
      );

      this.fs.copy(
        this.templatePath('src/user/_user-table.js'),
        this.destinationPath('src/user/user-table.js')
      );

      this.fs.copy(
        this.templatePath('styles/_style.css'),
        this.destinationPath('styles/style.css')
      );

      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    projectfiles: function() {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    gitfiles: function() {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function() {
    if (this.options['skip-install']) {
      return;
    }

    this.npmInstall(null, null, function() {

      this.spawnCommand('jspm', ['install'])
        .on('exit', function() {

          this.spawnCommand('gulp', ['build'])
            .on('exit', function() {
              this.spawnCommand('gulp', ['serve']);
            }.bind(this))

        }.bind(this));

    }.bind(this));
  }
});
