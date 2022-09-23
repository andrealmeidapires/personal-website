'use strict';

let resetDatabase = function (connection, callback) {

  let collection = connection.collection("experience");
  collection.remove({});
  callback();

};

module.exports = resetDatabase;
