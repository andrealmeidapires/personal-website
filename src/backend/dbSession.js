'use strict';

var MongoClient = require("mongodb").MongoClient;

var dbSession = function () {

  MongoClient.connect("mongodb://localhost:27017/career", function(err, connection) {
    return connection;
  });

}

module.exports = dbSession;
