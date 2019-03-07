const glob = require("glob");
const entries = glob.sync("./resources/js/src/**/*.js");

module.exports = {
  entry: entries,
  output: {
    path: __dirname + '/htdocs/js',
    filename: 'app.js'
  }
};
