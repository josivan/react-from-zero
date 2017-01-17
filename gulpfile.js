const gulp    = require('gulp'),
      rollup  = require('gulp-rollup');


gulp.task('bundle', () => {
  gulp.src('./src/**/*.js')
    .pipe(rollup({
      entry: './src/index3.js',
      format: "iife",
      plugins: [
        require("rollup-plugin-babel")({
          "plugins": ["external-helpers"]
        })
      ]
    }))
    .pipe(gulp.dest('./dest'));
});