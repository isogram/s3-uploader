var getExtension = function (str) {
  var re = /(?:\.([^.]+))?$/;
  return re.exec(str)[1];
}

module.exports = {
  getExtension : getExtension
} 