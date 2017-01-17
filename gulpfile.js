const gulp      = require('gulp'),
      babel     = require('gulp-babel'),
      polyfill  = require('babel-polyfill');


gulp.task('bundle', () => {
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dest'));
});