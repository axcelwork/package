var gulp = require('gulp'),
	mamp = require('gulp-mamp'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	stylus = require('gulp-stylus'),
	plumber = require("gulp-plumber"),
	minify = require("gulp-minify-css"),
	minimist = require('minimist'),
	gifsicle = require('imagemin-gifsicle'),
	jpegtran = require('imagemin-jpegtran'),
	optipng = require('imagemin-optipng'),
	cache = require('gulp-cached'),
	del = require('del');

var paths = {
	base: '../htdocs',
	master: '../master',
	branches: '../branches',
	dist : '../dist',
	src : '../src',
	stylus: '../src/**/*.styl',
	js : '../htdocs/**/*.js',
	css : '../htdocs/**/*.css',
	html : '../htdocs/**/*.html',
	inc : '../htdocs/**/*.inc',
	xml : '../htdocs/**/*.xml',
	php : '../htdocs/**/*.php',
	json : '../htdocs/**/*.json',
	jpg : '../htdocs/**/*.jpg',
	gif : '../htdocs/**/*.gif',
	png : '../htdocs/**/*.png',
	svg : '../htdocs/**/*.svg',
	otf : '../htdocs/**/*.otf',
	ttf : '../htdocs/**/*.ttf',
	woff : '../htdocs/**/*.woff',
	woff2 : '../htdocs/**/*.woff2',
	eot : '../htdocs/**/*.eot',
	image : '../htdocs/**/image/*'
};

// htdocs で変更があったファイルを master にすべてコピー
gulp.task('branches', function() {
	$date = new Date();

	return gulp
	.src( [ paths.html, paths.js, paths.css, paths.scss, paths.stylus, paths.jade, paths.inc, paths.php, paths.json, paths.xml, paths.jpg, paths.gif, paths.png, paths.svg, paths.otf, paths.ttf, paths.woff, paths.woff2, paths.eot
		] )
	.pipe( plumber() )
	.pipe( gulp.dest( paths.branches ) );
});

gulp.task('connect-sync', function(cb ) {
	browserSync({
		port: 5011,
		proxy: 'fb-yamaji.local:2011'
	});
});


gulp.task('image', function() {
	return gulp
	.src(paths.image)
	.pipe(plumber())
	.pipe(changed(paths.master))
	.pipe(gifsicle())
	.pipe(jpegtran())
	.pipe(optipng())
	.pipe(gulp.dest(paths.dist));
});


gulp.task('stylus', function() {
	return gulp
	.src([paths.stylus,'!./src/**/_*.styl'])
	.pipe(cache( 'stylus' ))
	.pipe(plumber())
	.pipe(stylus())
	.pipe(autoprefixer({
		browsers: ['last 2 versions']
	}))
	.pipe(minify())
	.pipe(gulp.dest(paths.base))
	.pipe(browserSync.reload({stream: true}));
});


gulp.task('watch', function() {
	gulp.watch(paths.scss,['reload', 'sass']);
	gulp.watch(paths.stylus,['stylus']);

	gulp.watch(paths.html,['reload']);
	gulp.watch(paths.php,['reload']);
	gulp.watch(paths.css,['reload']);
	gulp.watch(paths.inc,['reload']);
	gulp.watch(paths.xml,['reload']);
	gulp.watch(paths.js,['reload']);
	gulp.watch(paths.image,['reload']);
});

gulp.task('clean', function(cb) {
	del(paths.dist, cb);
});

gulp.task('reload', function() {
	browserSync.reload();
});

gulp.task('build', ['clean'], function(){
	gulp.start('create');
});

gulp.task('default', ['build','watch','connect-sync']);

