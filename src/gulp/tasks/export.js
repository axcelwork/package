var gulp = require("gulp"),
	config = require("../config/config"),
	requireDir = require( "require-dir" );

requireDir( "../tasks", { recursive : true } );

gulp.task('tocss', ['clean'], function() {
	$base_path = config.paths.base + config.paths.css;

	return gulp
	.src( $base_path )
	.pipe( gulp.dest( config.paths.src + config.paths.pcss_dir ) );
});
