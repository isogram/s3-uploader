var r = require(process.cwd() + '/app/utils/response')
    , response = new r()

function getError(err){
  return [
      {
        key: 'name',
        value: err.name
      },
      {
        key: 'message',
        value: err.message
      },
    ]
}

module.exports = function (server) {

  // see http://restify.com/#node-server-api

  server.pre(function (req, res, next) {
    req.log;
    next();
  });

  server.on('after', function (req, res, route, err) {

  });

  server.on('uncaughtException', function (req, res, route, err) {

    res.json(response.error('Internal server error', 500, getError(err)))

  });

  server.on('NotFound', function (req, res, err, cb) {

    res.json(response.error('Not Found', 404, getError(err)))

  });

  server.on('MethodNotAllowed', function (req, res, err, cb) {

    res.json(response.error('Method Not Allowed', 405, getError(err)))

  });

  server.on('VersionNotAllowed', function (req, res, err, cb) {

    res.json(response.error('Version Not Allowed', 400, getError(err)))

  });

  server.on('UnsupportedMediaType', function (req, res, err, cb) {

    res.json(response.error('Unsupported Media Type', 415, getError(err)))

  });

}