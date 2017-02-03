var gulp = require("gulp"),
	browserSync = require('browser-sync'),
    config = require("../config"),
    requireDir = require( "require-dir" );

requireDir( "../tasks", { recursive : true } );

gulp.task('watch', function() {
	gulp.watch( config.paths.stylus,['reload', 'stylus'] );
	gulp.watch( config.paths.html,['reload'] );
	gulp.watch( config.paths.php,['reload'] );
	gulp.watch( config.paths.inc,['reload'] );
	gulp.watch( config.paths.xml,['reload'] );
	gulp.watch( config.paths.js,['reload'] );
	gulp.watch( config.paths.image,['reload'] );
});

gulp.task('reload', function() {
	browserSync.reload();
});