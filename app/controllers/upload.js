var mongoose = require('mongoose')
    , h = require(process.cwd() + '/app/utils/helper')
    , r = require(process.cwd() + '/app/utils/response')
    , response = new r()
    , fs = require('fs')
    , Upload = mongoose.model('Upload')
    , AWS = require('aws-sdk')
    , chalk = require('chalk')
    , log = console.log;

// load aws credentials
AWS.config.update(___config___.aws.config)

var s3 = new AWS.S3()

function sendToS3(uploaded, typeOfFile, cb) {
  if (uploaded.size < 1) {
    console.error('Please provide a file!');
    cb(false, 'No such file to upload');
  }

  var d = new Date();
  var file = fs.readFileSync(uploaded.path);
  var ext = h.getExtension(uploaded.name);
  var fileName = Date.now() + '_' + uploaded.hash + '.' + (ext == undefined ? '' : ext);
  var path = typeOfFile + "/" + [ d.getFullYear() , ('0' + (d.getMonth()+1)).slice(-2) , ('0' + d.getDate()).slice(-2) ].join("/") + "/";
  var contentType = uploaded.type;

  var photoKey = path + fileName;
  s3.upload({
    Bucket: ___config___.aws.bucket,
    Key: photoKey,
    Body: file,
    ACL: 'public-read',
    ContentType: contentType
  }, function(err, data) {

    if (err) {
        log('There was an error to sending your photo to s3: ', err.message)
        return cb(false, err.message)
    }

    log('Successfully uploaded photo to s3')

    var resp = Object.assign({}, data, {
      name: uploaded.name,
      size: uploaded.size,
      contentType: contentType,
      file: fileName,
      extension: ext,
      path: path
    })

    return cb(true, resp)
  });
}

exports.fileUpload = function(req, res, next) {

    /* ----------------------------
     * CATEGORIES
     * ----------------------------
     * - KTP            ==> idcrd
     * - SLIP GAJI      ==> pyslp
     * - FOTO           ==> photo
     * - SURVEY         ==> sydoc
     * - KARTU KELUARGA ==> idfam
     * - SIGN AGREEMENT ==> siagr
     * - NPWP           ==> idtax
     * - UPLOADS        ==> uplod
     * ----------------------------
     **/

    if (req.files && req.files.file) {

        log("File uploaded to server")

        log('Sending to s3')

        var allowedType = ['idcrd', 'pyslp', 'photo', 'sydoc', 'idfam', 'siagr', 'idtax', 'uplod']
            , type = req.body.type || 'uplod'
            , typeIndex = allowedType.indexOf(type.trim().toLowerCase())
            , typeOfFile = typeIndex == -1 ? 'uplod' : allowedType[typeIndex]

        sendToS3(req.files.file, typeOfFile, function(status, s3Data){

            setTimeout(function(){

                fs.unlink(req.files.file.path, function(){

                    log('File deleted on server');

                });

            }, 5 * 1000)

            log('File in the server will be deleted in 5 sec!')

            if (status) {

              var dataFile = {
                name: s3Data.name,
                size: s3Data.size,
                mime: s3Data.contentType,
                extension: s3Data.extension == '' ? 'unknown' : s3Data.extension,
                file: s3Data.file,
                url: s3Data.Location,
                path_rel: s3Data.key,
                bucket: s3Data.Bucket
              }

              var uploadModel = new Upload(dataFile);

              uploadModel.save(function(err, data) {
                if (err) {

                  var error = [
                    {
                      key: 'database',
                      value: err
                    }
                  ];

                  res.json(response.error('Failed to save data to DB', 500, error))
                  return next()

                } else {

                  res.json(response.ok('Success to upload file', dataFile))
                  return next()

                }
              })


            } else {

              res.json({code: 400, message: dataFile})
              return next()

            }


        });

    } else {

      var uploadedFiles = Object.keys(req.files);

      if (uploadedFiles.length > 0) {

        log(uploadedFiles.length + ' Unknown files uploaded will be deleted soon!')

        for (var i = 0; i < uploadedFiles.length; i++) {
          fs.unlink(req.files[uploadedFiles[i]].path, function(){

              log('Unknown file deleted on server');

          });
        }
      }

      res.json(402, {code: 402, message: 'File is needed!'})
      return next()
    }

}