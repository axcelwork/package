var gulp = require("gulp"),
    gulpif = require("gulp-if"),
    plumber = require("gulp-plumber"),
    stylus = require("gulp-stylus"),
    cache = require('gulp-cached'),
    autoprefixer = require("gulp-autoprefixer"),
    minify = require("gulp-clean-css"),
    browserSync = require('browser-sync'),

    config = require("../config/config");


gulp.task('stylus', function() {
  return gulp
  .src([
      config.paths.src + config.paths.stylus_dir + config.paths.stylus,
      '!' + config.paths.src + config.paths.stylus_dir + '/_modules/*'
  ])
  .pipe(cache( 'stylus' ))
  .pipe(plumber())
  .pipe(stylus())
  .pipe(autoprefixer(config.autoprefixer))
  .pipe(gulpif(config.minify, minify()))
  .pipe(gulp.dest(config.paths.base));
});
