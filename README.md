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
### port, proxy
```
port : xxxx,
proxy : 'xxxxxx'
```
MAMP等ローカルサーバとの連携を行う設定です。

`port` ... gulp を実行上のポート番号を指定。（0〜65536）

`proxy` ... ローカルサーバのホストを指定。（localhost:8888 etc）


### minify
```
minify : boolean
```
stylus を圧縮するかの指定です。
圧縮する場合は `true` 、そうでない場合は `false` を指定。

### autoprefixer
```
autoprefixer : {
    browsers : ["last 2 versions", "ie 10", "ios 10", "android 4.2"],
}
```
ブラウザベンダーのプレフィックスをどこまで適用するかの設定です。


### zip_name
```
zip_name : 'xxxxx.zip'
```
`zip` ファイルを作成する時の名前の設定です。

### encoding
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
	gulp.watch( config.paths.src + config.paths.pcss,['pcss'] );
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
`PostCSS` のコンパイルを行うタスクです。

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

# PostCSS mixins
mixins を幾つかご用意しました

## Position系
```
@define-mixin psr {
	position: relative;
	top: 0;
	left: 0;
}

@define-mixin psa {
	position: absolute;
	margin: auto;
}
```

## アイコンフォント初期設定
```
@define-mixin iconinit {
	display: inline-block;
	content: '';
	width: 1em;
	height: 1em;

	font-family: 'icomoon';
	line-height: 1;
	letter-spacing: 0;
}
```

## :last-child の margin-bottom を0に
```
@define-mixin lastchild {
	&:last-child {
		margin-bottom: 0;
	}
}
```

## 数値を半分に
```
@define-mixin calc_half $prop, $value {
	$(prop): calc($value / 2)px;
}

// Usage
@mixin calc_half width,400;
↓
width: 200px;
```

## 数値を半分に
```
@define-mixin calc_percent $prop, $value, $max {
	$(prop): calc( ($value / $max) * 100 )%;
}

// Usage
@mixin calc_percent width,560,960;
↓
width: 58.33333%;
```

## イージング系
```
@define-mixin anime $target, $time, $value {
	@if $value ==  'ease-in-sine' {
		transition: $target $time cubic-bezier(0.47, 0, 0.745, 0.715);
	}
	@if $value ==  'ease-out-sine' {
		transition: $target $time cubic-bezier(0.39, 0.575, 0.565, 1);
	}
	@if $value ==  'ease-in-out-sine' {
		transition: $target $time cubic-bezier(0.445, 0.05, 0.55, 0.95 );
	}

	@if $value ==  'ease-in-quad' {
		transition: $target $time cubic-bezier(0.55, 0.085, 0.68, 0.53 );
	}
	@if $value ==  'ease-out-quad' {
		transition: $target $time cubic-bezier(0.25, 0.46, 0.45, 0.94 );
	}
	@if $value ==  'ease-in-out-quad' {
		transition: $target $time cubic-bezier(0.455, 0.03, 0.515, 0.955);
	}

	@if $value ==  'ease-in-cubic' {
		transition: $target $time cubic-bezier(0.55, 0.055, 0.675, 0.19 );
	}
	@if $value ==  'ease-out-cubic' {
		transition: $target $time cubic-bezier(0.215, 0.61, 0.355, 1);
	}
	@if $value ==  'ease-in-out-cubic' {
		transition: $target $time cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	@if $value ==  'ease-in-quart' {
		transition: $target $time cubic-bezier(0.895, 0.03, 0.685, 0.22 );
	}
	@if $value ==  'ease-out-quart' {
		transition: $target $time cubic-bezier(0.165, 0.84, 0.44, 1);
	}
	@if $value ==  'ease-in-out-quart' {
		transition: $target $time cubic-bezier(0.77, 0, 0.175, 1);
	}

	@if $value ==  'ease-in-quint' {
		transition: $target $time cubic-bezier(0.755, 0.05, 0.855, 0.06 );
	}
	@if $value ==  'ease-out-quint' {
		transition: $target $time cubic-bezier(0.23, 1, 0.32, 1);
	}
	@if $value ==  'ease-in-out-quint' {
		transition: $target $time cubic-bezier(0.86, 0, 0.07, 1);
	}

	@if $value ==  'ease-in-expo' {
		transition: $target $time cubic-bezier(0.95, 0.05, 0.795, 0.035);
	}
	@if $value ==  'ease-out-expo' {
		transition: $target $time cubic-bezier(0.19, 1, 0.22, 1);
	}
	@if $value ==  'ease-in-out-expo' {
		transition: $target $time cubic-bezier(1, 0, 0, 1);
	}

	@if $value ==  'ease-in-circ' {
		transition: $target $time cubic-bezier(0.6, 0.04, 0.98, 0.335);
	}
	@if $value ==  'ease-out-circ' {
		transition: $target $time cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	@if $value ==  'ease-in-out-circ' {
		transition: $target $time cubic-bezier(0.785, 0.135, 0.15, 0.86 );
	}

	@if $value ==  'ease-in-back' {
		transition: $target $time cubic-bezier(0.6, -0.28, 0.735, 0.045);
	}
	@if $value ==  'ease-out-back' {
		transition: $target $time cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	@if $value ==  'ease-in-out-back' {
		transition: $target $time cubic-bezier(0.68, -0.55, 0.265, 1.55 );
	}
}

// Usage
@mixin anime all, .45s, 'ease-out-cubic';
↓
transition: all .45s cubic-bezier(0.215, 0.61, 0.355, 1)
```
