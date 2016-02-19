var thinkjs = require('thinkjs');
var path = require('path');

var rootPath = path.dirname(__dirname);

var instance = new thinkjs({
  APP_PATH: rootPath + path.sep + 'app',
  RUNTIME_PATH: rootPath + path.sep + 'runtime',
  ROOT_PATH: rootPath,
  RESOURCE_PATH: __dirname,
  UPLOAD_PATH: __dirname + "/upload",
  env: 'development'
});
//compile src/ to app/
instance.compile({
  retainLines: true, 
  log: true
});

instance.run();