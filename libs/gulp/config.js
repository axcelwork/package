module.exports = {
  port : xxxxx,
  proxy : 'xxxxxxxx',
  stylus_minify : false,
  autoprefixer : {
    browsers : ["last 2 versions", "ie 10", "ios 10", "android 4.2"]
  },
  zip_name : 'xxxxx.zip',
  encoding : "shift_jis",

  paths : {
    base: '../htdocs',
    master: '../master',
    branches: '../branches',
    dist : '../dist',
    src : '../src',
    stylus: './src/**/*.styl',
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