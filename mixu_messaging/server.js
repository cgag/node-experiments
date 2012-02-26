var http = require('http'),
    url = require('url'),
    fs = require('fs');

var messages = ["testing"];
var clients = [];

http.createServer(function (request, response) {
  var url_parts = url.parse(request.url);
  console.log(url_parts);

  if (url_parts.pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      response.end(data)
    });
  } else if (url_parts.pathname.substr(0, 5) === '/poll') {
    // do polling stuff
    var count = url_parts.pathname.replace(/[^0-9]*/, '');
    console.log(count);
    if (messages.length > count) {
      response.end(JSON.stringify({
        count: messages.length,
        append: messages.slice(count).join("\n") + "\n"
      }));
    } else {
      clients.push(response);
    }
  } else if (url_parts.pathname.substr(0, 5) == '/msg/') {
    // receiving message
    console.log('processing new message');
    var msg = unescape(url_parts.pathname.substr(5));
    console.log(msg);
    messages.push(msg);
    while (clients.length > 0) {
      console.log('should be sending something to a client');
      var client = clients.pop();
      console.log(client);
      client.end(JSON.stringify({
        count: messages.length,
        append: msg+"\n"
      }));
    }
    response.end();
  }
}).listen(8080);

console.log('server running');
