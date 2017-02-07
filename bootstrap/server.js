var restify = require('restify')
    , Logger = require('bunyan')
    , fs = require('fs')
    , os = require('os')
    , chalk = require('chalk')
    , log = console.log

// SETUP SERVER
var server = restify.createServer({
  name: ___config___.default.name
});

server
  .use(restify.CORS())
  .use(restify.fullResponse())
  .use(restify.bodyParser({
    maxBodySize: 1024 * 1024,
    mapParams: true,
    mapFiles: true,
    overrideParams: false,
    keepExtensions: true,
    uploadDir: 'uploaded',
    hash: 'sha1'
  }))

// events
require(process.cwd() + '/bootstrap/events')(server)
// routing
require(process.cwd() + '/app/routes')(server)

server.listen(___config___.default.port, function (err) {
    if (err){
      log(chalk.red(err))
    } else { 
      log(chalk.yellow("\nRUNNING IN ENVIRONMENT ==> ") , chalk.green.bold(___config___.default.env));
      log('%s listening at %s', server.name, server.url);
    }
})

if (___config___.default.env == 'production') {
    process.on('uncaughtException', function (err) {
        log(chalk.red(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2))))
    })
}