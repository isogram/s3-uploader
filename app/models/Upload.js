var mongoose = require("mongoose");
var Schema   = mongoose.Schema;

var UploadSchema = new Schema({
  name: String,
  size: String,
  mime: String,
  extension: String,
  file: String,
  url: String,
  path_rel: String,
  bucket: String
});

mongoose.model('Upload', UploadSchema);