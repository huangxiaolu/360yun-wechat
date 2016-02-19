var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  // UPLOAD_PATH: __dirname + "/www/static/upload",
  env: 'production'
});
console.log(1, __dirname);
//preload packages before start server.
instance.run(true);