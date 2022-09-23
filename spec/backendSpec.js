'use strict';

let port = 8080;
let request = require("request");
let start = require("../src/backend/requestHandlers").start;
let dbSession = require("../src/backend/dbSession");
let resetDatabase = require("./resetDatabase");
let async = require("async");

describe("The API", function() {

  it("should work", function() {
    expect(true).toBe(true);
  });

  it("should send the main html page when asked for /", function(done) {
    request.get(
      {
        "url": "http://localhost:" + port + "/",
        "json": true
      },
      function (err, res, body) {
        expect(res.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should responde to a GET request at /experience", function(done) {

    let expected = [
       {"startDate": new Date("2016-12-01"), "endDate": new Date("2017-01-25"), "employer":"", "client": "", "projects": "Personal website, Node.js & MongoDB learning", "tasks": "Web apps architecture, RESTful webservice API using Percolator, test-driven development, object-oriented JS, synchronous and asynchronous operations, flow control"}
      ,{"startDate": new Date("2015-11-14"), "endDate": new Date("2016-11-11"), "employer":"Dell", "client": "Allied Irish Banks", "projects": "Business Account Opening, Criminal Justice Act, Generic Work Queue", "tasks": "Workflow, Business rules, UI, Data persistence, Web-Services integrations, deployments and support"}
      ,{"startDate": new Date("2014-10-01"), "endDate": new Date("2015-04-01"), "employer":"Novabase", "client": "Banco de Poupança e Crédito", "projects": "Audit & Inspection Processes, Administrative Processes", "tasks": "Workflow, Business rules, UI, Data persistence, documentation, deployments and support"}
      ,{"startDate": new Date("2013-02-01"), "endDate": new Date("2015-11-11"), "employer":"Novabase", "client": "Açoreana Seguros", "projects": "Policy Management Integrated System, Risk Quoting Platform", "tasks": "Big CRUD component, UI, Web-Services integrations, user filtering"}

    ];
    /*
    async.series(
      [
        function(callback) {
          resetDatabase(dbSession, callback);
        },

        function(callback) {
          dbSession()
        }

      ]

    );*/

    request.get(
      {
        "url": "http://localhost:" + port + "/experience",
        "json": true
      },
      function (err, res, body) {
        expect(res.statusCode).toBe(200);
        /* transform returned date formats */
        for(let i=0; i<body.length; i++){
          body[i].startDate = new Date(body[i].startDate);
          body[i].endDate = new Date(body[i].endDate);
        }
        /* compare whole object */
        expect(body).toEqual(expected);
        done();
      }
    );
  });

});
