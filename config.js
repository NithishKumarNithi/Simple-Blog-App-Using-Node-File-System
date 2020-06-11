var path = require("path");

var appConfig = {};

// root directory
appConfig.rootDir = __dirname;

// user directory
appConfig.userDir = path.join(__dirname,"userdata");


module.exports = appConfig;