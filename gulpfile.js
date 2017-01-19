'use strict';

const 
  gulp        = require('gulp'),
  browserify  = require('browserify'),
  source      = require('vinyl-source-stream'),
  gutil       = require('gulp-util'),
  babelify    = require('babelify'),
  clean       = require('gulp-clean');

const dependencies = [
  'react',
  'react-dom'
];

gulp.task('clean', () => {
  gulp.src(['bundle', 'dest', 'web'])
    .pipe(clean());
});

// should be run to tranform jsx files
gulp.task('bundle', () => {
  let appBundler = browserify({
    entries: ['src/index3.jsx'],
    debug: true
  });

  dependencies.forEach((dep) => {
    appBundler.external(dep);
  });

  appBundler
    .transform(babelify)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./web/js/'));
});

// based on http://jpsierens.com/tutorial-gulp-javascript-2015-react/
// run at least once to bundle vendors content
gulp.task('vendors', () => {
 		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./web/js/'));
});