var http = require("http");
var url = require("url");
var route = require("./router").route;

function start(port, hostname, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    var timestamp = new Date();
    var timestampString = timestamp.getFullYear()+"-"+(timestamp.getMonth()+1)+"-"+timestamp.getDate()+" "+timestamp.getHours()+":"+timestamp.getMinutes()+":"+timestamp.getSeconds()+"."+timestamp.getMilliseconds();
    console.log(timestampString+" new request on pathname: " + pathname);

    request.on("data", function (postDataChunk) {
      postData += postDataChunk;
      //console.log("Received postDataChunk: ", postDataChunk);
    });

    request.on("end", function() {
      route(request, response, handle, pathname, postData, hostname);
    });

  };

  http.createServer(onRequest).listen(port, hostname);
  console.log("Server has started on port",port);
}

exports.start = start;
