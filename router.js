function route(handlers, pathname) {
  console.log("About to route a request for " + pathname);

  if (typeof handlers[pathname] === "function") {
    handlers[pathname]();
  } else {
    console.log("No handler found for " + pathname);
  }
}

exports.route = route;
