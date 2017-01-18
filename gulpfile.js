const babelify    = require('babelify'),
      browserify  = require('browserify'),
      gulp        = require('gulp'),
      babel       = require('gulp-babel');


gulp.task('bundle', () => {
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dest'));
});

gulp.task('jsx', () => {
  browserify({
    entries: 'src/index3.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .on('error', err => {
    util.log("Browserify Error", util.colors.red(err.message))
  })
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./dest'));
});