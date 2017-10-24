/*
In order to run, first install Node, NPM and PostgreSQL

Next install the required node packages:
$ npm install pg
$ npm install pg-format
$ npm install express --save

Once dependencies are installed, use the following command to run:
$ node node_proof_of_concept.js <db_username> <company_name>

You may want to use the database/seeds.sql file to insert some test data.
*/

const express = require('express')
const app = express()
var pg = require('pg')
var format = require('pg-format')
var PGUSER = process.argv[2]
var PGPASSWORD = process.argv[3] == '%' ? null : process.argv[3];
var PGDATABASE = 'csr_lookup'
var companyName = process.argv[4]

if (PGUSER == undefined || companyName == undefined) {
  console.log("Error: arguments must not be blank")
  console.log("Usage: node_proof_of_concept.js <db_username> <company_name>")
} else {
  var config = {
    user: PGUSER,            // name of the user account
    password: PGPASSWORD,	 // password of the user account
    database: PGDATABASE,    // name of the database
    max: 10,                 // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }

  var pool = new pg.Pool(config)
  var myClient

  pool.connect(function (err, client, done) {
    if (err) console.log(err)

    app.listen(3000, function () {
      console.log('listening on 3000')
    })

    myClient = client
    var companyQuery = format('SELECT * FROM companies WHERE name = %L', companyName)
	

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