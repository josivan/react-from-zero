'use strict';

const 
  gulp        = require('gulp'),
  browserify  = require('browserify'),
  source      = require('vinyl-source-stream'),
  gutil       = require('gulp-util'),
  babelify    = require('babelify'),
  clean       = require('gulp-clean'),
  webpack     = require('webpack-stream'),
  WebpackDevServer = require("webpack-dev-server");

const dependencies = [
  'react',
  'react-dom'
];

const wpConfig = {
  entry: "./src/index3.jsx",
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    contentBase: './public',
    port: 3333
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  }
};

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

gulp.task('webpack', (callback) => {
  webpack(wpConfig, 
  (err, status) => {
    if (err) {
      console.error('Error webpack', err);
      throw new gutil.PluginError("webpack", err);
    }
    gutil.log("[webpack]", stats.toString({
        // output options
    }));
    callback();
  });
});