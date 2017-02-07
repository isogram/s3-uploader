var fs = require('fs')

var controllers = {}
    , controllers_path = process.cwd() + '/app/controllers'
fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})

module.exports = function(server){
  // START: ROUTING HERE

  // S: HOME
  function respond(req, res, next) {
    var response = {'message': 'Hi there!'};
    res.json(response);
    next();
  }

  server.get("/", respond)
  // E: HOME
   
  // S: Upload
  server.post("/uploads", controllers.upload.fileUpload)
  // E: Upload

  // END: ROUTING HERE

}