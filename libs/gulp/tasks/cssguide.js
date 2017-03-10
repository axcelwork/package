var gulp = require("gulp"),
    aigis = require("gulp-aigis"),

    config = require("../config");


gulp.task('cssguide', function() {
  return gulp
  .src("./aigis/aigis_config.yml")
  .pipe(aigis());
});