'use strict';

var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var MongoClient = require("mongodb").MongoClient;

function sendResponse(response, contentType, message) {
  response.writeHead(200, {"Content-Type": contentType});
  response.write(message);
  response.end();
}

function start(request, response, postData) {
  fs.readFile("src/frontend/index.html", function(err, fd) {
    if(err){
      console.log(err);
      throw err;
    } else {
      sendResponse(response, "text/html", fd);
    }
  });

}
/* POST data in forms */
function message(request, response, postData){
  console.log("New message");
  console.log("Name: " + querystring.parse(postData).name);
  console.log("Email: " + querystring.parse(postData).email);
  console.log("Message: " + querystring.parse(postData).message);

  start(request, response, postData);
}

function getFile(request, response, name) {
  var pathname = url.parse(request.url).pathname;
  var filenameExtensionArray = pathname.split(".");

  if(!(filenameExtensionArray && filenameExtensionArray.length > 0)){
    console.log("Invalid filename");

  } else {
    var extension = filenameExtensionArray[1];
    var location;
    var contentType;

    switch(extension){
      case "js":
        location = "./";
        contentType = "application/javascript";
        break;
      case "css":
        location = "./";
        contentType = "text/css";
        break;
      default:
        location = "src/frontend/images/";
        contentType = "image/jpeg";
    }

    fs.readFile(location + pathname, function (err, fd) {
      if (err) {
        console.log(err);
        response.end();
      } else {
        sendResponse(response, contentType, fd);
        if(extension === "css")
          console.log("extension", extension, "contentType", contentType, "fd", fd);
      }
    });

  }

}

function getExperience(request, response, postData, hostname){
  MongoClient.connect(
    "mongodb://" + hostname + ":27017/career",
    function(err, connection) {

      var collection = connection.collection("experience");

      var stream = collection.find({}, {"_id": 0}).sort({"startDate": -1}).stream();
      var documents = [];

      stream.on("data", function(document) {
        documents.push(document);
      });

      stream.on("end", function() {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(documents));
        response.end();
        connection.close();
      });

      stream.on("error", function(err) {
        console.log(err);
      });

    }
  );
};

exports.start = start;
exports.message = message;
exports.getFile = getFile;
exports.getExperience = getExperience;
