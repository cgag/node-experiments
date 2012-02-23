function route(handlers, pathname, response) {
  console.log("About to route a request for " + pathname);

  if (typeof handlers[pathname] === "function") {
    handlers[pathname](response);
  } else {
    console.log("No handler found for " + pathname);
    response.writeHead(404, {
        "content-type":"text/plain"
    });
    response.write("404 not found");
    response.end();
  }
}

exports.route = route;
