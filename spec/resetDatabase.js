'use strict';

var resetDatabase = function (connection, callback) {

  var collection = connection.collection("experience");
  collection.remove({});
  callback();

};

module.exports = resetDatabase;
