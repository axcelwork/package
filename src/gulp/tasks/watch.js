var gulp = require("gulp"),
	browserSync = require('browser-sync'),
    config = require("../config/config"),
    requireDir = require( "require-dir" );

requireDir( "../tasks", { recursive : true } );

gulp.task('watch', function() {
	gulp.watch( config.paths.src + config.paths.pcss,['reload', 'pcss'] );
	gulp.watch( config.paths.src + config.paths.stylus,['stylus'] );

	gulp.watch(
		[
			config.paths.base + config.paths.html,
			config.paths.base + config.paths.css,
			config.paths.base + config.paths.js,
			config.paths.base + config.paths.image,
			config.paths.base + config.paths.php,
			config.paths.base + config.paths.inc,
			config.paths.base + config.paths.xml
		],
		['reload']
	);
});

gulp.task('reload', function() {
	browserSync.reload();
});
