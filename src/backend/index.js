var server = require("./server");
var requestHandlers = require("./requestHandlers");
var port = 8080;
var hostname = "localhost";

var handle = {};
handle["/"] = requestHandlers.start;
handle["/show"] = requestHandlers.show;
handle["/getImage"] = requestHandlers.getImage;
handle["/getCSS"] = requestHandlers.getCSS;
handle["/experience"] = requestHandlers.getExperience;

server.start(port, hostname, handle);
