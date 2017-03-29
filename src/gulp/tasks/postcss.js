var gulp = require("gulp"),
    gulpif = require("gulp-if"),
    plumber = require("gulp-plumber"),
    cache = require('gulp-cached'),
    browserSync = require('browser-sync'),

    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),

    config = require("../config/config");


gulp.task('pcss', function() {
  var processors = [ cssnext(config.autoprefixer) ];

  return gulp
  .src([config.paths.pcss])
  .pipe(cache( 'pcss' ))
  .pipe(plumber())
  .pipe(postcss(processors))
  .pipe(gulp.dest(config.paths.base));
});
