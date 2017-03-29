var gulp = require("gulp"),
		plumber = require("gulp-plumber"),
    config = require("../config/config"),
    requireDir = require( "require-dir" );

requireDir( "../tasks", { recursive : true } );

var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;
};

gulp.task('bk', function() {
	var date = new Date();
	var name = date.getFullYear().toString() + toDoubleDigits((date.getMonth() + 1)).toString() + toDoubleDigits(date.getDate()).toString();

	return gulp
	.src( config.paths.base + '/**/*' )
  .pipe(plumber())
  .pipe(gulp.dest( config.paths.branches + '/' + name));
});
