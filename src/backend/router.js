function route(request, response, handle, pathname, postData, hostname){

  if (typeof handle[pathname] === "function") {
    handle[pathname](request, response, postData, hostname);

  } else if(/\.(js|css|jpe?g|png|gif|bmp)$/i.test(pathname)) {
    handle["/getFile"](request, response, postData, hostname);

  } else {
    /*
    console.error("No request handler found for", pathname);
    response.writeHead("404", {"ContentType": "text/plain"});
    response.write("404 Not found");
    response.end();
    */
    handle["/"](request, response, postData, hostname);
  }
};

exports.route = route;
