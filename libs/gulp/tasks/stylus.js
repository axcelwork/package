var gulp = require("gulp"),
    gulpif = require("gulp-if"),
    plumber = require("gulp-plumber"),
    stylus = require("gulp-stylus"),
    cache = require('gulp-cached'),
    autoprefixer = require("gulp-autoprefixer"),
    minify = require("gulp-minify-css"),
    browserSync = require('browser-sync'),

    config = require("../config");


gulp.task('stylus', function() {
  return gulp
  .src([config.paths.stylus,'!./src/**/_*.styl'])
  .pipe(cache( 'stylus' ))
  .pipe(plumber())
  .pipe(stylus())
  .pipe(autoprefixer(config.autoprefixer))
  .pipe(gulpif(config.stylus_minify, minify()))
  .pipe(gulp.dest(config.paths.base));
});