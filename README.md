# package
Web制作用に必要なアイコンフォント、Webフォント、ディレクトリ構成をひとつのパッケージにしたものです。

# gulp
## インストールしたパッケージ
- [browser-sync](https://www.npmjs.com/package/browser-sync "browser-sync")
- [gulp-webserver](https://www.npmjs.com/package/gulp-webserver "gulp-webserver")
- [gulp-cached](https://www.npmjs.com/package/gulp-cached "gulp-cached")
- [gulp-if](https://www.npmjs.com/package/gulp-if "gulp-if")
- [gulp-plumber](https://www.npmjs.com/package/gulp-plumber "gulp-plumber")
- [gulp-stylus](https://www.npmjs.com/package/gulp-stylus "gulp-stylus")
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer "gulp-autoprefixer")
- [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css "gulp-minify-css")
- [gulp-zip](https://www.npmjs.com/package/gulp-zip "gulp-zip")
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify "gulp-uglify")
- [gulp-convert-encoding](https://www.npmjs.com/package/gulp-convert-encoding "gulp-convert-encoding")
- [require-dir](https://www.npmjs.com/package/require-dir "require-dir")
- [minimist](https://www.npmjs.com/package/minimist "minimist")
- [del](https://www.npmjs.com/package/del "del")

## ディレクトリ構成
```
htdocs
├ cmn
│ ├css
│ ├fonts
│ └js
├ css
└ js

libs
├ gulpfile.js
├ package.json
└ gulp
  ├ config.js
  └ tasks
    ├ connect-sync.js
    ├ stylus.js
    └ watch.js

src - [開発用]
```

## Usage
任意のディレクトリに、`clone` して `nmp install`

## Config
```
module.exports = {
  port : xxxx,
  proxy : 'xxxxxx',
  stylus_minify : false,
  autoprefixer : {
    browsers : ["last 2 versions", "ie 10", "ios 10", "android 4.2"]
  },
  zip_name : 'xxxxx.zip',
  encoding : "utf-8",

  paths : {
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
  }
};
```

## Task
```
gulp.task('default', ['watch','connect-sync']);
```

### watch
```
gulp.watch( config.paths.stylus,['reload', 'stylus'] );
gulp.watch( config.paths.html,['reload'] );
gulp.watch( config.paths.php,['reload'] );
gulp.watch( config.paths.inc,['reload'] );
gulp.watch( config.paths.xml,['reload'] );
gulp.watch( config.paths.js,['reload'] );
gulp.watch( config.paths.image,['reload'] );
```
### connect-sync
ローカルサーバとの接続を行います。
```
gulp.task('connect-sync', function(cb ) {
	browserSync({
		port: config.port,
		proxy: config.proxy
	});
});
```

### Stylusのコンパイル
```
gulp.task('stylus', function() {
  return gulp
  .src([config.paths.stylus,'!../src/_modules/*'])
  .pipe(cache( 'stylus' ))
  .pipe(plumber())
  .pipe(stylus())
  .pipe(autoprefixer(config.autoprefixer))
  .pipe(gulpif(config.stylus_minify, minify()))
  .pipe(gulp.dest(config.paths.base));
});
```

### ZIP
```
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
```

### BackUp
```
gulp.task('bk', function() {
	var date = new Date();
	var name = date.getFullYear().toString() + toDoubleDigits((date.getMonth() + 1)).toString() + toDoubleDigits(date.getDate()).toString();

	return gulp
	.src( config.paths.base + '/**/*' )
  .pipe(plumber())
  .pipe(gulp.dest( config.paths.branches + '/' + name));
});
```
