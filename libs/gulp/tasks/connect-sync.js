var gulp = require( "gulp" ),
	browserSync = require('browser-sync'),
	config = require( "../config" );

gulp.task('connect-sync', function(cb ) {
	browserSync({
		port: config.port,
		proxy: config.proxy
	});
});