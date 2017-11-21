/*
In order to run, first install Node, NPM and PostgreSQL

Next install the required node packages:
$ npm install pg
$ npm install pg-format
$ npm install express --save

Once dependencies are installed, use the following command to run:
$ node node_app.js <db_username> <company_name>

You may want to use the database/seeds.sql file to insert some test data.
*/

const express = require('express')
const app = express()

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  next();
});

var pg = require('pg')
var format = require('pg-format')
// var PGUSER = process.argv[2]
// var PGPASSWORD = process.argv[3] == '%' ? null : process.argv[3];
// var PGDATABASE = 'csr_lookup'
var companyName = process.argv[2]

if (false) {
  console.log("Error: arguments must not be blank")
  console.log("Usage: node_app.js <db_username> <company_name>")
} else {
  var config = {
    user: 'postgres',        // name of the user account
    password: 123456,        // password of the user account
    database: 'csr_lookup',  // name of the database
    max: 10,                 // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }

  var pool = new pg.Pool(config)
  var myClient

  pool.connect(function (err, client, done) {
    if (err) console.log(err)

    // Define our main route, HTTP "GET /" which will print "hello"
    app.get('/', function (req, res) {
      res.send('Hello world!');
    });

    // Company route handler
    app.get('/companies/:companyName', function (req, res) {
      var companyName = req.params.companyName;
      var companyQuery = format("SELECT * FROM vw_companies_information WHERE name like '%" + companyName + "%'")

      myClient.query(companyQuery, function (err, result) {
        if (err) console.log(err)
        var result_rows = result.rows

        if (result_rows.length == 0) {
          res.send(`No companies in our database have the name "${companyName}".`)
        } else {
          res.send(JSON.stringify(result.rows));
        }
      })
    });

    app.listen(3000, function () {
      console.log('listening on 3000')
    })

    myClient = client
    var companyQuery = format("SELECT * FROM vw_companies_information WHERE name like '%" + companyName + "%'")

    myClient.query(companyQuery, function (err, result) {
      if (err) console.log(err)
      var result_rows = result.rows

      if (result_rows.length == 0) {
        console.log(`No companies in our database have the name "${companyName}".`)
      } else {
        var companyIndustry = result.rows[0]['industry']
        console.log(`${companyName} is a company in the ${companyIndustry} industry.`)
      }
    })
  })
}
