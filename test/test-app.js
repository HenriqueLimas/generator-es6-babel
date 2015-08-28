'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('es6-babel:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      '.jshintrc'
    ]);
  });
});
