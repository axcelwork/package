var gulp = require("gulp"),
	zip = require('gulp-zip'),
	del = require('del'),
	plumber = require("gulp-plumber"),
	rimraf = require('rimraf'),
	minimist = require('minimist'),
	config = require("../config"),
	requireDir = require( "require-dir" );

requireDir( "../tasks", { recursive : true } );

var argv = minimist(process.argv.slice(2));

gulp.task('source', ['clean'], function(cb) {

	if( argv.path ){
	 	$local = config.paths.base + argv.path + '/**/*';
	}
	else {
		$local = config.paths.base;
	}

	return gulp
	.src( $local )
	.pipe( gulp.dest( config.paths.dist + argv.path ) );
});


gulp.task('zip', ['source'], function(cb ) {
	return gulp
	.src( config.paths.dist + '/**/*' )
	.pipe( zip( config.zip_name ) )
	.pipe(gulp.dest( config.paths.dist ) );
});

gulp.task('clean', function(cb) {
	rimraf('../dist', cb);
});