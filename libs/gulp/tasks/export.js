var gulp = require("gulp"),
	config = require("../config/config"),
	merge = require('merge-stream'),
	requireDir = require( "require-dir" );

requireDir( "../tasks", { recursive : true } );

gulp.task('tocss', ['clean'], function() {
	$base_path = config.paths.base + config.paths.css;

	return gulp
	.src( $base_path )
	.pipe( gulp.dest( config.paths.src + config.paths.pcss_dir ) );
});

gulp.task('tohtml', function() {
	$base_path = config.paths.base + config.paths.html;

	return gulp
	.src( $base_path )
	.pipe( gulp.dest( config.paths.src + config.paths.html_dir ) );
});

gulp.task('release', function() {
	var htdocs_src = gulp.src( [ config.paths.base + '/**/*' ] )
	.pipe( gulp.dest( config.paths.release + '/htdocs' ) );

	var src_src = gulp.src( [ config.paths.src + config.paths.pcss_dir + config.paths.pcss ] )
	.pipe( gulp.dest( config.paths.release + '/src' + config.paths.pcss_dir ) );

	return merge(htdocs_src, src_src);
});
