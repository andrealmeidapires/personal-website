'use strict';

let MongoClient = require("mongodb").MongoClient;

let dbSession = function () {

  MongoClient.connect("mongodb://localhost:27017/career", function(err, connection) {
    return connection;
  });

}

module.exports = dbSession;
