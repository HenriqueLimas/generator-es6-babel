var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');

var babel = require('gulp-babel');

var vinylPaths = require('vinyl-paths');

var changed = require('gulp-changed');
var plumber = require('gulp-plumber');

var assign = Object.assign || require('object.assign');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var browserSync = require('browser-sync');

var path = {
	source: 'src/**/*.js',
	html: 'src/**/*.html',
	style: 'styles/**/*.css',
	output: 'dist'
};

var compilerOptions = {
	filename: '',
	filenameRelative: '',
	blacklist: [],
	whitelist: [],
	modules: '',
	sourceMap: true,
	sourceMapName: '',
	sourceFileName: '',
	sourceRoot: '',
	moduleRoot: '',
	moduleIds: false,
	experimental: false,
	format: {
		comments: false,
		compact: false,
		indent: {
			parentheses: true,
			adjustMultilineComment: true,
			style: '  ',
			base: 0
		}
	}
};

var jshintConfig = {
	esnext: true
};

gulp.task('clean', function() {
	return gulp.src([path.output])
		.pipe(vinylPaths(del));
});

gulp.task('build-system', function() {
	return gulp.src(path.source)
		.pipe(plumber())
		.pipe(changed(path.output, {
			extension: '.js'
		}))
		.pipe(babel(assign({}, compilerOptions, {
			modules: 'system'
		})))
		.pipe(gulp.dest(path.output))
});

gulp.task('build-html', function() {
	return gulp.src(path.html)
		.pipe(changed(path.output), {
			extension: '.html'
		})
		.pipe(gulp.dest(path.output));
});

gulp.task('lint', function() {
	return gulp.src(path.source)
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter(stylish));
});

gulp.task('build', function(callback) {
	return runSequence(
		'clean', ['build-system', 'build-html'],
		callback
	);
});


gulp.task('serve', ['build'], function(done) {
	browserSync({
		open: false,
		port: 9000,
		server: {
			baseDir: ['.'],
			middleware: function(req, res, next) {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}
		}
	}, done);
});

function reportChange(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function() {
	gulp.watch(path.source, ['build-system', browserSync.reload]).on('change', reportChange);
	gulp.watch(path.html, ['build-html', browserSync.reload]).on('change', reportChange);
	gulp.watch(path.style, browserSync.reload).on('change', reportChange);
});