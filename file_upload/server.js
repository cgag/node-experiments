var http = require('http');
var url = require('url');

function start(route, handlers) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("request for " + pathname + " recieved.");
    route(handlers, pathname, response, request); 
  }
    
  http.createServer(onRequest).listen(8000);
  console.log("server started");
}

exports.start = start;
