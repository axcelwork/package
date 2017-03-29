module.exports = {
  port : xxxx,
  proxy : 'xxxxxx',
  stylus_minify : true,
  autoprefixer : {
    browsers : ["last 2 versions", "ie 10", "ios 10", "android 4.2"]
  },
  zip_name : 'xxxxx.zip',
  encoding : "utf-8",

  paths     : {
    base : '../../htdocs',
    dev : '../dev',
    branches: '../../branches',
    dist : '../../dist',
    src : '../../src',
    pcss : '/**/*.css',
    stylus : '/stylus/**/*.styl',
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
