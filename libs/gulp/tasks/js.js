var gulp = require("gulp"),
    gulpif = require("gulp-if"),
    plumber = require("gulp-plumber"),
    cache = require('gulp-cached'),
    changed = require('gulp-changed'),
    babel = require("gulp-babel"),
    uglify = require('gulp-uglify'),

    config = require("../config/config");



gulp.task('babel', function() {
    return gulp
    .src([
        config.paths.dev + config.paths.js_dir + config.paths.assets_dir + config.paths.js,
        config.paths.dev + config.paths.js_dir + config.paths.assets_dir + config.paths.ts
    ])
    .pipe( cache( 'babel' ) )
    .pipe( plumber() )
    .pipe( babel() )
    .pipe( gulpif( config.minify, uglify() ) )
    .pipe( gulp.dest( config.paths.base ) );
});
