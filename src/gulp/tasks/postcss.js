var gulp = require("gulp"),
    gulpif = require("gulp-if"),
    plumber = require("gulp-plumber"),
    cache = require('gulp-cached'),
    changed = require('gulp-changed'),
    browserSync = require('browser-sync'),

    postcss = require('gulp-postcss'),
    cssnext = require('postcss-cssnext'),
    precss = require('precss'),
    css_import = require("postcss-import"),
    css_calc = require("postcss-calc"),
    cssnano = require("cssnano"),

    config = require("../config/config");


gulp.task('pcss', function() {
    var processors = [
        css_import(),
        precss(),
        css_calc(),
        cssnext({
            'autoprefixer': {
                'browsers': config.autoprefixer.browsers
            }
        })
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
    .pipe( changed( config.paths.release + '/src' + config.paths.pcss_dir ), {hasChanged: changed.compareLastModifiedTime} )
    .pipe( cache( 'pcss' ) )
    .pipe( plumber() )
    .pipe( postcss( processors ) )
    .pipe( gulp.dest( config.paths.base ) );
});
