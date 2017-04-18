var gulp = require("gulp"),
    gulpif = require("gulp-if"),
    plumber = require("gulp-plumber"),
    cache = require('gulp-cached'),
    browserSync = require('browser-sync'),

    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    precss = require('precss'),
    css_import = require("postcss-import"),
    cssnano = require("cssnano"),

    config = require("../config/config");


gulp.task('pcss', function() {
    var processors = [
        css_import(),
        cssnext({
            'autoprefixer': {
                'browsers': config.autoprefixer.browsers
            }
        }),
        precss()
    ];

    // minify
    if( config.minify ){
        processors.push( cssnano( {autoprefixer: false} ) );
    }

    return gulp
    .src([
        config.paths.src + config.paths.pcss_dir + config.paths.pcss,
        '!' + config.paths.src + config.paths.pcss_dir + '/_modules/*'
    ])
    .pipe( cache( 'pcss' ) )
    .pipe( plumber() )
    .pipe( postcss( processors ) )
    .pipe( gulp.dest( config.paths.base ) );
});
