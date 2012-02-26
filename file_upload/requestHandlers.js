var querystring = require('querystring'),
    fs = require('fs'), 
    formidable = require('formidable')

function start(response, request) {
  console.log("request handler 'start' was called");

  var body = 
    '<html>' +
    '<head>' +
    '<meta http-euiv="Content-Type" content="text/html; charset=UTF-8" />' +
    '</head>'+
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" method="post">' +
    '<input type="file" name="upload" multiple="multiple" />'+
    '<input type="submit" value="Upload file" />'+
    '</form></body></html>';

  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end(); }

function upload(response, request) {
  console.log("request handler 'upload' was called");

  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    console.log(fields);
    console.log(files);
    fs.rename(files.upload.path, "/tmp/test.jpg", function(err) {
      if (err) {
        fs.unlink("/tmp/test.jpg");
        fs.rename(files.upload.path, "/tmp/test.jpg");
      }
    });

    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write("recieved image: <br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.jpg", "binary", function(error, file) {
    if (error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/jpg"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start   = start;
exports.upload  = upload;
exports.show    = show;

