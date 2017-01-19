'use strict';

const babelify    = require('babelify'),
      browserify  = require('browserify'),
      gulp        = require('gulp'),
      reactify    = require('reactify'),
      source      = require('vinyl-source-stream'),
      babel       = require('gulp-babel');


gulp.task('bundle', () => {
  gulp.src('./src/**/*.js*')
    .pipe(babel())
    .pipe(gulp.dest('./dest'));
});

gulp.task('_jsx', () => {
  var b = browserify({
    entries: 'src/index3.jsx',
    extensions: ['.jsx'],
    debug: true,
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('./src'))
    .pipe(bundle())
    .pipe(gulp.dest('./dest'));
});

gulp.task('jsx', () => {
  var b = browserify({
    entries: 'dest/index3.js',
    extensions: ['.js'],
    debug: true,
    transform: [reactify]
  });

  return b.bundle()
    .pipe(source('./dest/index3.js'))
    .pipe(gulp.dest('./bundle'));
});