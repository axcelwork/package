var gulp = require("gulp"),
	browserSync = require('browser-sync'),
    config = require("../config/config"),
    requireDir = require( "require-dir" );

requireDir( "../tasks", { recursive : true } );



gulp.task('watch', function() {
	// gulp.watch( config.paths.src + config.paths.pcss,['pcss'] );
	// gulp.watch( config.paths.src + config.paths.stylus,['stylus'] );

	gulp.watch( [
		config.paths.dev + config.paths.pcss_dir + config.paths.assets_dir + config.paths.pcss,
		'!' + config.paths.dev + config.paths.pcss_dir + '/**/_c/*'
	], ['pcss'] );
	gulp.watch( config.paths.dev + config.paths.pcss_dir + config.paths.assets_dir + config.paths.pcss_c, ['pcss-layout'] );

	// gulp.watch( config.paths.src + config.paths.pcss_dir + '/**/_c' + config.paths.pcss,['pcss-layout'] );
	// gulp.watch( config.paths.src + config.paths.pcss_dir + config.paths.pcss,['pcss'] );

	// gulp.watch( config.paths.src + config.paths.stylus,['stylus'] );

	gulp.watch( config.paths.dev + config.paths.html_dir + config.paths.assets_dir + config.paths.ejs,['ejs'] );
	gulp.watch( config.paths.dev + config.paths.html_dir + '/_layout' + config.paths.ejs,['ejs-layout'] );
	gulp.watch( config.paths.dev + config.paths.json,['ejs-layout'] );

	gulp.watch( config.paths.dev + config.paths.js_dir + config.paths.assets_dir + config.paths.js,['babel'] );
	gulp.watch( config.paths.dev + config.paths.js_dir + config.paths.assets_dir + config.paths.ts,['babel'] );


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
