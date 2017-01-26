'use strict';

var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var MongoClient = require("mongodb").MongoClient;

function answer(response, message) {
  response.writeHead(200, {"Content-Type":"text/html"});
  response.write(message);
  response.end();
}

function start(request, response, postData) {
  fs.readFile("src/frontend/index.html", function(err, fd) {
    if(err){
      console.log(err);
      throw err;
    } else {
      answer(response, fd);
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

function getImage(request, response, name) {
  var pathname = url.parse(request.url).pathname;

  fs.readFile("src/frontend/images/" + pathname, function (err, fd) {
    if (err) {
      console.log(err);
    } else {
      response.writeHead(200, {"Content-Type": "image/jpeg"});
      response.write(fd);
      response.end();
    }
  });

}

function getCSS(request, response, name) {
  var pathname = url.parse(request.url).pathname;

  fs.readFile("./" + pathname, function (err, fd) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      response.writeHead(200, {"Content-Type": "text/css"});
      response.write(fd);
      response.end();
    }
  });

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
exports.getImage = getImage;
exports.getCSS = getCSS;
exports.getExperience = getExperience;
