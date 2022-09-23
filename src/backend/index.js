let server = require("./server");
let requestHandlers = require("./requestHandlers");
let port = 8080;
let hostname = "0.0.0.0";

let handle = {};
handle["/"] = requestHandlers.start;
handle["/message"] = requestHandlers.message;
handle["/getFile"] = requestHandlers.getFile;
handle["/experience"] = requestHandlers.getExperience;

server.start(port, hostname, handle);
