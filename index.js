// LOAD CONFIG
var config = require('./config');

// set config as global
global.___config___ = config; 

// BOOT SERVICES
require('./bootstrap/mongoose')
require('./bootstrap/server')