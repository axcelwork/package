var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    cache = require('gulp-cached'),

    fs = require('fs'),
    ejs = require("gulp-ejs"),

    config = require("../config/config");

gulp.task('ejs', function() {
    var json = JSON.parse( fs.readFileSync( config.paths.dev + config.paths.html_dir + '/_config/config.json' ) );

    return gulp
    .src( config.paths.dev + config.paths.html_dir + config.paths.assets_dir + config.paths.ejs )
    .pipe(cache( 'ejs' ))
    .pipe(plumber())
    .pipe(ejs({config: json},{ root: config.dev_root },{ext: '.html'}))
    .pipe(gulp.dest(config.paths.base));
});

gulp.task('ejs-layout', function() {
    var json = JSON.parse( fs.readFileSync( config.paths.dev + config.paths.html_dir + '/_config/config.json' ) );

    return gulp
    .src( config.paths.dev + config.paths.html_dir + config.paths.assets_dir + config.paths.ejs )
    .pipe(plumber())
    .pipe(ejs({config: json},{ root: config.dev_root },{ext: '.html'}))
    .pipe(gulp.dest(config.paths.base));
});
