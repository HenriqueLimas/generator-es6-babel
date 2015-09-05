'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();

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
    }, {
      type: 'list',
      name: 'modules',
      message: 'What type of modules do you want to use?',
      choices: ['system', 'amd'],
      default: 'system'
    }];

    this.prompt(prompts, function(props) {
      this.props = props;

      done();
    }.bind(this));
  },

  writing: {
    app: function() {
      var modulePath = this.props.modules;

      this.fs.copyTpl(
        this.templatePath(modulePath + '/_index.html'),
        this.destinationPath('index.html'),
        this.props
      );

      this.fs.copyTpl(
        this.templatePath(modulePath + '/_package.json'),
        this.destinationPath('package.json'),
        this.props
      );

      if (modulePath === 'system') {
        this.fs.copyTpl(
          this.templatePath('system/_config.js'),
          this.destinationPath('config.js'),
          this.props
        );
      } else if (modulePath === 'amd') {
        this.fs.copyTpl(
          this.templatePath('amd/_bower.json'),
          this.destinationPath('bower.json'),
          this.props
        );
      }

      this.fs.copyTpl(
        this.templatePath(modulePath + '/src/_main.js'),
        this.destinationPath('src/main.js'),
        this.props
      );

      this.fs.copy(
        this.templatePath(modulePath + '/src/user/_user.js'),
        this.destinationPath('src/user/user.js')
      );

      this.fs.copy(
        this.templatePath(modulePath + '/src/user/_user-table.js'),
        this.destinationPath('src/user/user-table.js')
      );

      this.fs.copy(
        this.templatePath('styles/_style.css'),
        this.destinationPath('styles/style.css')
      );

      this.fs.copyTpl(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        this.props
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
    if (true || this.options['skip-install']) {
      return;
    }

    this.npmInstall(null, null, function() {
      function startGulp() {
        this.spawnCommand('gulp', ['build'])
          .on('exit', function() {
            this.spawnCommand('gulp', ['serve']);
          }.bind(this));
      }

      if (this.props.modules === 'system') {
        this.spawnCommand('jspm', ['install'])
          .on('exit', startGulp.bind(this));
      } else {
        this.bowerInstall(null, null, startGulp.bind(this));
      }
    }.bind(this));
  }
});
