# package
Web制作に必要なアイコンフォント、Webフォント、ディレクトリ構成をひとつのパッケージにしたものです。

# ディレクトリ構成
ディレクトリ構成を大きく変更しました。

```
htdocs
├ cmn
│ ├ css
│ │ └ reset.css
│ ├ fonts
│ └ js
├ css
└ js

src
├ babel
├ gulp
| ├ gulpfile.js
| ├ package.json
| ├ config
| | └ config.js
| └ tasks
|   ├ connect-sync.js
|   ├ stylus.js
|   ├ postcss.js
|   ├ zip.js
|   ├ backup.js
|   └ watch.js
└ pcss
| ├ _modules
| │ └ mixin.css
| ├ cmn
| │ └ css
| │   └ reset.css
| └ css
└ stylus
 ├ _modules
 │ └ _common_func.styl
 ├ cmn
 │ └ css
 │   └ reset.styl
 └ css
```

# Gulp
タスクランナーとして `gulp` を使用しています。

## Config
`gulp` で各タスク・ファイルを操作するための設定ファイルです。

```
module.exports = {
    port : 9999,
    proxy : 'xxxxxx',
    minify : false,
    autoprefixer : {
        browsers : ["last 2 versions", "ie 10", "ios 10", "android 4.2"],
    },
    zip_name : 'xxxxx.zip',
    encoding : "utf-8",

    paths : {
        base : '../../htdocs',
        dev : '../dev',
        branches: '../../branches',
        dist : '../../dist',
        src : '../../src',
        stylus_dir : '/stylus',
        pcss_dir : '/pcss',
        pcss : '/**/*.css',
        stylus : '/**/*.styl',
        js : '/**/*.js',
        css : '/**/*.css',
        html : '/**/*.html',
        inc : '/**/*.inc',
        xml : '/**/*.xml',
        php : '/**/*.php',
        json : '/**/*.json',
        jpg : '/**/*.jpg',
        gif : '/**/*.gif',
        png : '/**/*.png',
        svg : '/**/*.svg',
        woff : '/**/*.woff',
        woff2 : '/**/*.woff2',
        image : '/**/image/*'
    }
};
```

```
port : xxxx,
proxy : 'xxxxxx'
```
MAMP等ローカルサーバとの連携を行う設定です。

`port` ... gulp を実行上のポート番号を指定。（0〜65536）

`proxy` ... ローカルサーバのホストを指定。（localhost:8888 etc）


```
stylus_minify : boolean
```
stylus を圧縮するかの指定です。
圧縮する場合は `true` 、そうでない場合は `false` を指定。


```
autoprefixer : {
  browsers : ["last 2 versions", "ie 10", "ios 10", "android 4.2"]
},
```
ブラウザベンダーのプレフィックスをどこまで適用するかの設定です。


```
zip_name : 'xxxxx.zip'
```
`zip` ファイルを作成する時の名前の設定です。


```
encoding : "utf-8"
```
`CSS` ファイルのエンコード設定です。


## Task
```
gulp.task('default', ['watch','connect-sync']);
```

### watch
ファイルが変更されたことを監視するタスクです。

```
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
```
### connect-sync
ローカルサーバとの接続を行うタスクです。

```
gulp.task('connect-sync', function(cb ) {
	browserSync({
		port: config.port,
		proxy: config.proxy
	});
});
```

### stylusのコンパイル
`stylus` のコンパイルを行うタスクです。

```
gulp.task('stylus', function() {
  return gulp
  .src([
      config.paths.src + config.paths.stylus_dir + config.paths.stylus,
      '!' + config.paths.src + config.paths.stylus_dir + '/_modules/*'
  ])
  .pipe(cache( 'stylus' ))
  .pipe(plumber())
  .pipe(stylus())
  .pipe(autoprefixer(config.autoprefixer))
  .pipe(gulpif(config.minify, minify()))
  .pipe(gulp.dest(config.paths.base));
});


```

### PostCSSのコンパイル
`stylus` のコンパイルを行うタスクです。

```
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

```

### ZIP
`htdocs` 内の指定したディレクトリをzipファイルにして `dist` ディレクトリへ出力するタスクです。
同時にzipファイルにする前のディレクトリもzipファイルと同じ階層に出力されます。

#### 使い方
```
gulp zip --path 対象ディレクトリ名
```

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
	rimraf( config.paths.dist , cb);
});
```

### BackUp
`htdocs` 内の全ファイルを `branches` ディレクトリに日付を付与しコピーをとるタスクです。

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

### Export
`htdocs` 内の `css` を `src/pcss` ディレクトリにコピーをとるタスクです。

```
gulp.task('tocss', ['clean'], function() {
	$base_path = config.paths.base + config.paths.css;

	return gulp
	.src( $base_path )
	.pipe( gulp.dest( config.paths.src + config.paths.pcss_dir ) );
});
```
